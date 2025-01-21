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
import { Buildtoken, CollectFees, CreateToken, CreateTokenInstance, GamifyProtocol, Token, TokenInstance, UpdateCreationFee } from '../../artifacts/ts'
  
  web3.setCurrentNodeProvider('http://127.0.0.1:22973', undefined, fetch)
  export const ZERO_ADDRESS = 'tgx7VNFoP9DJiFMFgXXtafQZkUvyEdDHT9ryamHJYrjq'
  export const defaultSigner = new PrivateKeyWallet({ privateKey: testPrivateKey })
  
  const nodeProvider = new NodeProvider('http://127.0.0.1:22973') 

  // token contract

  export async function GamifyProtocoldeploy() {
    return await GamifyProtocol.deploy(defaultSigner, {
      initialFields: {
          admin: defaultSigner.account.address,
          supercharged: 0n,
          pacaToken: '',
          pacaAmount: 0n,                         // maybe test this just by amount
          xpRate: 10n
      },
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
  
  /*
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
*/
  