import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { addressFromContractId, NodeProvider, node, web3, hexToString, ContractState, number256ToBigint, prettifyNumber, prettifyNumberConfig, Number256 } from '@alephium/web3'
import axios from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const TOKEN_LIST_URL = 'https://raw.githubusercontent.com/alephium/token-list/master/tokens/mainnet.json';
interface Token {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  description: string;
  logoURI: string;
}

async function fetchTokenList(): Promise<Token[]> {
  try {
    const response = await axios.get(TOKEN_LIST_URL);
    return response.data.tokens;
  } catch (error) {
    console.error('Error fetching token list:', error);
    return [];
  }
}

export async function getTokenNameById(tokenId: string): Promise<string | null> {
  const tokens = await fetchTokenList();
  const token = tokens.find(t => t.id === tokenId);
  return token ? token.symbol : null;
}

export async function getTokenImageById(tokenId: string): Promise<string | null> {
  const tokens = await fetchTokenList();
  const token = tokens.find(t => t.id === tokenId);
  return token ? token.logoURI : null;
}

export function checkHexString(value: any, expected: string) {
  const result = hexToString(value);
  if (result !== expected) {
    throw new Error(`Expected ${expected}, but got ${result}`);
  }
}

export const alphBalanceOf = async (contractid: string): Promise<bigint> => {
  const balances = await web3.getCurrentNodeProvider().addresses.getAddressesAddressBalance(addressFromContractId(contractid))
  const balance = balances.balance
  return balance === undefined ? 0n : BigInt(balance)
}

export const balanceOf = async (tokenId: string, address: string): Promise<bigint> => {
  const balances = await web3.getCurrentNodeProvider().addresses.getAddressesAddressBalance(address)
  const balance = balances.tokenBalances?.find((t) => t.id === tokenId)
  return balance === undefined ? 0n : BigInt(balance.amount)
}

export const contractBalanceOf = (state: ContractState, tokenId: string): bigint => {
  const token = state.asset.tokens?.find((t) => t.id === tokenId)
  return token === undefined ? 0n : number256ToBigint(token.amount)
}

function isConfirmed(txStatus: node.TxStatus): txStatus is node.Confirmed {
  return txStatus.type === 'Confirmed'
}

export async function waitTxConfirmed(
  provider: NodeProvider,
  txId: string
): Promise<node.Confirmed> {
  const status = await provider.transactions.getTransactionsStatus({ txId: txId })
  if (isConfirmed(status)) {
    return status
  }
  await new Promise((r) => setTimeout(r, 5000))
  return waitTxConfirmed(provider, txId)
}

const prettifyConfig = {
  ...prettifyNumberConfig['ALPH'],
  maxDecimalPlaces: 2
}

export function formatNFTPrice(price: Number256) {
  const priceStr = price.toString()
  if (priceStr.length > 24) {
    return prettifyNumberWithUnit(price, 24, 'M')
  }
  if (priceStr.length > 21) {
    return prettifyNumberWithUnit(price, 21, 'K')
  }
  return prettifyNumberWithUnit(price, 18, '')
}

function prettifyNumberWithUnit(number: Number256, decimals: number, unit: String) {
  const prettifyAmount = prettifyNumber(number, decimals, prettifyConfig)
  if (prettifyAmount === undefined) return undefined
  return prettifyAmount + unit
}

export async function contractExists(contractId: string, provider: NodeProvider): Promise<boolean> {
  const address = addressFromContractId(contractId)
  return provider
    .addresses
    .getAddressesAddressGroup(address)
    .then(_ => true)
    .catch((e: any) => {
      if (e instanceof Error && e.message.indexOf("Group not found") !== -1) {
        return false
      }
      throw e
    })
}

