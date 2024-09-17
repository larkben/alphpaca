import {
  addressFromTokenId,
  NFTMetaData,
  addressFromContractId,
  NodeProvider,
  ExplorerProvider,
  hexToString,
} from "@alephium/web3"
import { Player, PlayerTypes } from "../../artifacts/ts"
import axios from "axios"

export interface NFT {
  name: string,
  description: string,
  image: string,
  tokenId: string,
  minted: boolean,
  nftIndex: number
  collectionId: string,
  attack?: bigint,
  defense?: bigint,
  health?: bigint,
  price?: bigint,
  level?: bigint,
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

function safeToString(value: any): string {
  if (typeof value === 'string') {
    return value;
  } else if (typeof value === 'boolean' || typeof value === 'number') {
    return value.toString();
  } else if (Array.isArray(value)) {
    return value.join(',');
  } else if (value && typeof value === 'object') {
    return JSON.stringify(value);
  }
  return '';
}

export async function fetchNFTMetadata(
  tokenId: string
): Promise<NFT | undefined> {
  const nodeProvider = new NodeProvider('https://node.alphaga.app')
  const collectionAddress = addressFromContractId(tokenId)

  try {
    const state = await nodeProvider.contracts.getContractsAddressState(collectionAddress)

    let contractState: any
    let metadataUri: string
    let metadata: any
    let contractBalance: { balance: string }
    let baseMetadata: NFT | undefined

    switch (state.codeHash) {
      case Player.contract.codeHash:
          try {
            contractState = Player.contract.fromApiContractState(state) as PlayerTypes.State
            console.log("Player Contract State:", contractState)
            metadataUri = hexToString(contractState.tokenUri)
            metadata = (await axios.get(metadataUri)).data
            console.log("Metadata:", metadata)
            contractBalance = await nodeProvider.addresses.getAddressesAddressBalance(collectionAddress)
            baseMetadata = {
              name: contractState.nickname,
              description: metadata.description,
              image: metadata.image,
              tokenId: tokenId,
              minted: true,
              nftIndex: Number(metadata.nftIndex),
              collectionId: contractState.collectionId,
              attack: contractState.stats[0],
              defense: contractState.stats[1],
              health: contractState.stats[2],
              level: contractState.level,
              isOld: false
            }
          } catch (error) {
            console.error(`Error processing metadata for Token ID: ${tokenId}`, error)
            throw new Error(`Failed to process metadata: ${error instanceof Error ? error.message : 'Unknown error'}`)
          }
        break
        default:
            metadataUri = hexToString(safeToString(state.mutFields[0].value))

            console.log("Non-Player Contract State:", state)
            try {
              metadata = (await axios.get(metadataUri)).data
              contractBalance = await nodeProvider.addresses.getAddressesAddressBalance(collectionAddress)
            
              baseMetadata = {
                name: metadata.name,
                description: metadata.description,
                image: metadata.image,
                tokenId: tokenId,
                minted: true,
                nftIndex: Number(metadata.nftIndex),
                collectionId: "collectionId",
                isOld: false
              }
            } catch (error) {
              console.error(`Error fetching metadata from URI: ${metadataUri}`, error)
              throw new Error(`Failed to fetch metadata: ${error instanceof Error ? error.message : 'Unknown error'}`)
            }
          break;
    }
    return baseMetadata
  } catch (error) {
    console.error(`Error fetching NFT metadata for Token ID ${tokenId}:`, error)
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data)
    }
    throw new Error(`Failed to fetch NFT collection metadata: ${error instanceof Error ? error.message : 'Unknown error'}`)
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
