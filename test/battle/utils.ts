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
import { MinimalContractDeposit } from '@alephium/web3/dist/src/codec'
import { Battle, FindBattle } from '../../artifacts/ts'
  
web3.setCurrentNodeProvider('http://127.0.0.1:22973', undefined, fetch)
export const ZERO_ADDRESS = 'tgx7VNFoP9DJiFMFgXXtafQZkUvyEdDHT9ryamHJYrjq'
export const defaultSigner = new PrivateKeyWallet({ privateKey: testPrivateKey })
  
const nodeProvider = new NodeProvider('http://127.0.0.1:22973') 
  
  // battle pvp contract (parent)
  export async function deployBattlePvp() {
    return await FindBattle.deploy(defaultSigner, {
      initialFields: {
          admin: '',
          pvp: '',
          oracle: ''
      }
    })
  }

  // battle template (child)
  export async function deployBattle() {
    return await Battle.deploy(defaultSigner, {
      initialFields: {
          playerOne: '',
          pacaOne: '',
          pacaOneHealth: 0n,
          playerTwo: '',
          pacaTwo: '',
          pacaTwoHealth: 0n,
          turn: false,
          oracle: ''
      }
    })
  }

  // contract functions
  
  export async function UnlistListing(
    signer: SignerProvider, 
    listingFactory: ListingFactoryInstance, 
    token: string,
    ) {
    return await CancelListingV2.execute(signer, {
      initialFields: {
        tokenId: token,
        listingFactory: listingFactory.contractId
      },
      attoAlphAmount: DUST_AMOUNT,  // 0.1 alph
    })
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
  
  