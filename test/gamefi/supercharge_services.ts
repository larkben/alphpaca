import {
    ALPH_TOKEN_ID,
    Address,
    DUST_AMOUNT,
    HexString,
    MAP_ENTRY_DEPOSIT,
    MINIMAL_CONTRACT_DEPOSIT,
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
import { Buildtoken, CollectFees, CreateToken, CreateTokenInstance, EditValidContract, GamifyProtocol, GamifyProtocolInstance, Supercharge, Token, TokenInstance, UpdateCreationFee } from '../../artifacts/ts'
  
  web3.setCurrentNodeProvider('http://127.0.0.1:22973', undefined, fetch)
  export const ZERO_ADDRESS = 'tgx7VNFoP9DJiFMFgXXtafQZkUvyEdDHT9ryamHJYrjq'
  export const defaultSigner = new PrivateKeyWallet({ privateKey: testPrivateKey })
  
  const nodeProvider = new NodeProvider('http://127.0.0.1:22973') 

  // gamefi template

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

  export async function SuperchargeNFT(
    signer: SignerProvider,
    gamefi: GamifyProtocolInstance,
    nft: string

  ) {
    return await Supercharge.execute(signer, {
      initialFields: {
        contract: gamefi.contractId,
        nft: nft
      },
      attoAlphAmount: DUST_AMOUNT + MINIMAL_CONTRACT_DEPOSIT, // 0.1 alph
      tokens: [{id: nft, amount: 1n}]
    });
  }

  export async function AddApprovedNFTCollection (
    signer: SignerProvider,
    gamefi: GamifyProtocolInstance,
    contract: string
  ) {
    return await EditValidContract.execute(signer, {
      initialFields: {
        gamefi: gamefi.contractId,
        contract: contract,
        remove: false
      },
      attoAlphAmount: DUST_AMOUNT, // 0.1 alph
      tokens: [{id: ALPH_TOKEN_ID, amount: ONE_ALPH}]
    });
  }
  