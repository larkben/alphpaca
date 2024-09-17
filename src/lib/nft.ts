import {
  addressFromTokenId,
  NFTMetaData,
  addressFromContractId,
  NodeProvider,
  ExplorerProvider,
} from "@alephium/web3"
import axios from "axios"

export interface NFT {
  name: string,
  description: string,
  image: string,
  tokenId: string,
  minted: boolean,
  nftIndex: number
  collectionId: string,
  price?: bigint,
  isOld?: boolean,
}

export async function fetchNFTListingByTokenId(tokenId: string): Promise<NFT | null> {
  try {
    const response = await axios.get(`https://backend-v002.alphaga.app/api/nft-listing-by-id/${tokenId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch NFT listing for token ID: ${tokenId}`, error);
    return null;
  }
}

export async function isOldNFT(
  collectionId: string
) {
  const nodeProvider = new NodeProvider('https://node.alphaga.app')
  const tokenAddress = addressFromContractId(collectionId)
  try {
    const state = await nodeProvider.contracts.getContractsAddressState(tokenAddress)
    let isOld: boolean
    if(state.codeHash === "6f4fa43ffea4e9f9a3d960b35d913adce653c501ebcac64d150092b2948c3a45"){
      isOld = false
    } else {
      isOld = true
    }
    return isOld;
  } catch (error) {
    console.error(error);
    return true;
  }
}

export async function fetchMintedNFTMetadata(
  tokenId: string
): Promise<NFTMetaData | undefined> {
  const nodeProvider = new NodeProvider('https://node.alphaga.app')
  const explorerProvider = new ExplorerProvider('https://backend.mainnet.alephium.org')
  if (!explorerProvider) return undefined

  try {
    const tokenType = await nodeProvider.guessStdTokenType(tokenId)
    if (tokenType !== 'non-fungible') return undefined
    return await nodeProvider.fetchNFTMetaData(tokenId)
  } catch (error) {
    console.error(`failed to fetch nft metadata, token id: ${tokenId}, error: ${error}`)
    return undefined
  }
}

export async function fetchMintedNFTByMetadata(
  tokenId: string,
  metadata: NFTMetaData
): Promise<NFT | undefined> {
  try {
    const { tokenUri, nftIndex, collectionId } = metadata
    if (tokenUri && collectionId) {
      const metadata = (await axios.get(tokenUri)).data
      const oldResult = await isOldNFT(collectionId)
      return {
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
        tokenId: tokenId,
        nftIndex: Number(nftIndex),
        collectionId: collectionId,
        minted: true,
        isOld: oldResult
      }
    }
  } catch (error) {
    console.error(`failed to fetch nft, token id: ${tokenId}, error: ${error}`)
  }
}

export async function fetchMintedNFT(
  tokenId: string
): Promise<NFT | undefined> {
  const nftMetadata = await fetchMintedNFTMetadata(tokenId)
  if (nftMetadata === undefined) return undefined
  return await fetchMintedNFTByMetadata(tokenId, nftMetadata)
}
