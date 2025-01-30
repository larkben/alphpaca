import {
    ALPH_TOKEN_ID,
    Address,
    DUST_AMOUNT,
    HexString,
    NodeProvider,
    ONE_ALPH,
    SignerProvider,
    addressVal,
    binToHex,
    byteVecVal,
    encodePrimitiveValues,
    groupOfAddress,
    hexToBinUnsafe,
    prettifyAttoAlphAmount,
    stringToHex,
    u256Val,
    web3
  } from '@alephium/web3'
  import { randomBytes } from 'crypto'
  import * as base58 from 'bs58'
  import * as blake from 'blakejs'
  import { PrivateKeyWallet } from '@alephium/web3-wallet'
  import { testPrivateKey } from '@alephium/web3-test'
  import { off } from 'process'
  import { ValByteVec } from '@alephium/web3/dist/src/api/api-alephium'
  import { MinimalContractDeposit, token } from '@alephium/web3/dist/src/codec'
import { Buildtoken, CollectFees, CreateToken, CreateTokenInstance, Token, TokenInstance, UpdateCreationFee } from '../../artifacts/ts'
  
  web3.setCurrentNodeProvider('http://127.0.0.1:22973', undefined, fetch)
  export const ZERO_ADDRESS = 'tgx7VNFoP9DJiFMFgXXtafQZkUvyEdDHT9ryamHJYrjq'
  export const defaultSigner = new PrivateKeyWallet({ privateKey: testPrivateKey })
  
  const nodeProvider = new NodeProvider('http://127.0.0.1:22973') 

  // token contract

  export async function deployToken() {
    return await Token.deploy(defaultSigner, {
      initialFields: {
          symbol: stringToHex("NULL"),
          name: stringToHex("babynull"),
          decimals: 18n,
          supply: 1000n,
          owner: defaultSigner.account.address
      },
    });
  }

  // token creation contract
  export async function deployCreateToken(tokenContract: TokenInstance) {
    return await CreateToken.deploy(defaultSigner, {
      initialFields: {
          owner: defaultSigner.account.address,
          contract: tokenContract.contractId,
          alphfee: ONE_ALPH * 10n,              // 10 alph fee 
          alphcollected: 0n
      },
    });
  }
  
  // ipfs functions - needs alphaga token and alph token
  export async function CreateCoin(
    signer: SignerProvider,
    tokenCreator: CreateTokenInstance,
    symbol: string,
    name: string,
    decimals: number,
    tokenTotal: number
  ) {
    return await Buildtoken.execute(signer, {
      initialFields: {
          contract: tokenCreator.contractId,
          symbol: stringToHex(symbol),
          name: stringToHex(name),
          decimals: BigInt(decimals),
          tokenTotal: BigInt(tokenTotal)
      },
      attoAlphAmount: DUST_AMOUNT + ONE_ALPH, // 0.1 alph
      tokens: [{ id: ALPH_TOKEN_ID, amount: ONE_ALPH * 10n }],
    });
  }
  
  export async function CollectCreatorFees(
    signer: SignerProvider,
    tokenCreator: CreateTokenInstance
  ) {
    return await CollectFees.execute(signer, {
      initialFields: {
          contract: tokenCreator.contractId
      },
      attoAlphAmount: DUST_AMOUNT, // 0.1 alph
    });
  }

  export async function UpdateCreatorFees(
    signer: SignerProvider,
    tokenCreator: CreateTokenInstance,
    amount: number
  ) {
    return await UpdateCreationFee.execute(signer, {
      initialFields: {
          contract: tokenCreator.contractId,
          amount: BigInt(amount)
      },
      attoAlphAmount: DUST_AMOUNT, // 0.1 alph
    });
  }

// util

export function randomP2PKHAddress(groupIndex = 0): string {
    const prefix = Buffer.from([0x00])
    const bytes = Buffer.concat([prefix, randomBytes(32)])
    const address = base58.encode(bytes)
    if (groupOfAddress(address) === groupIndex) {
      return address
    }
    return randomP2PKHAddress(groupIndex)
}
  
export function alph(amount: bigint | number): bigint {
    return BigInt(amount) * ONE_ALPH
}
  
export async function getALPHBalance(address: Address): Promise<String> {
    const balances = await nodeProvider.addresses.getAddressesAddressBalance(address)
    return balances.balanceHint
}
  
export async function getPreciseALPHBalance(address: Address): Promise<String> {
    const balances = await nodeProvider.addresses.getAddressesAddressBalance(address)
    return balances.balance
}
  