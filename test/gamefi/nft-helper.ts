import {
    ALPH_TOKEN_ID,
    Address,
    DUST_AMOUNT,
    HexString,
    ONE_ALPH,
    SignerProvider,
    binToHex,
    groupOfAddress,
    hexToBinUnsafe,
    number256ToBigint,
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
import { CreatePublicSaleCollectionSequentialWithRoyalty, MintNextSequential, MutableNFT, MutableNFTInstance, NFTPublicSaleCollectionSequentialWithRoyalty, NFTPublicSaleCollectionSequentialWithRoyaltyInstance } from '../../artifacts/ts'
  
web3.setCurrentNodeProvider('http://127.0.0.1:22973', undefined, fetch)
export const ZERO_ADDRESS = 'tgx7VNFoP9DJiFMFgXXtafQZkUvyEdDHT9ryamHJYrjq'
export const defaultSigner = new PrivateKeyWallet({ privateKey: testPrivateKey })

// nft template
export async function deployNFT() {
    return await MutableNFT.deploy(defaultSigner, {
      initialFields: {
          tokenUri: '',
          collectionId: '',
          nftIndex: 0n
      }
    })
}

// collection sequential w/ royalty template
export async function deployCollection() {
    return await NFTPublicSaleCollectionSequentialWithRoyalty.deploy(defaultSigner, {
      initialFields: {
          nftMutableTemplateId: '',
          collectionUri: '',
          nftBaseUri: '',
          collectionOwner: defaultSigner.address,
          maxSupply: 0n,
          mintPrice: 0n,
          mintToken: '',
          maxBatchMintSize: 0n,
          royaltyRate: 0n,
          totalSupply: 0n,
          ownerOnly: false
      }
    })
}

// copy create collection sequential w/ royalty
export async function createCustomCollection(
    signer: SignerProvider,
    publicSaleTemplate: NFTPublicSaleCollectionSequentialWithRoyaltyInstance,
    mutableNFT: MutableNFTInstance,
    maxBatchMint: number,
    royaltyRate: number,
    maxSupply: number,
    mintPrice: number
    ) {
    return await CreatePublicSaleCollectionSequentialWithRoyalty.execute(signer, {
      initialFields: {
          publicSaleCollectionTemplateId: publicSaleTemplate.contractId,
          nftMutableTemplateId: mutableNFT.contractId,
          collectionUri: '',
          nftBaseUri: '',
          collectionOwner: (await signer.getSelectedAccount()).address,
          maxSupply: BigInt(maxSupply),
          mintPrice: BigInt(mintPrice),
          mintToken: ALPH_TOKEN_ID,
          maxBatchMintSize: BigInt(maxBatchMint),
          royaltyRate: BigInt(royaltyRate),
          totalSupply: 0n,
          ownerOnly: false
      },
      attoAlphAmount: DUST_AMOUNT,  // 0.1 alph
      tokens: [{id: ALPH_TOKEN_ID, amount: BigInt(100000000000000000)}]
    })
}

export async function createNFT(
    signer: SignerProvider,
    collectionId: string,
    mintPrice: number,
    currency: string,
    royalty: boolean,
    random: boolean
    ) {
    return await MintNextSequential.execute(signer, {
      initialFields: {
        nftCollectionId: collectionId,
        mintPrice: BigInt(mintPrice),
        royalty: royalty,
        token: currency
      },
      attoAlphAmount: 1000000000000000000n + DUST_AMOUNT,  // 0.1 alph
      tokens: [{id: currency, amount: BigInt(mintPrice)}]
    })
}

