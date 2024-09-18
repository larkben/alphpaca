import useSWR from "swr";
import { web3, NodeProvider, ExplorerProvider } from "@alephium/web3";
import { fetchMintedNFT, fetchMintedNFTByMetadata, fetchMintedNFTMetadata, NFT } from "./nft";


async function fetchNFTsFromUTXOs(address: string): Promise<NFT[]> {
  const nodeProvider = new NodeProvider('https://node.alphaga.app');
  const balances = await nodeProvider.addresses.getAddressesAddressBalance(address, { mempool: false });
  const tokenBalances = balances.tokenBalances || [];
  const tokenIds = tokenBalances
    .filter((token) => +token.amount === 1)
    .map((token) => token.id);

  const nftMetadatas = await Promise.all(tokenIds.map(fetchMintedNFTMetadata));
  
  const nfts = await Promise.all(
    tokenIds.map((tokenId, index) => {
      const metadata = nftMetadatas[index];
      return metadata ? fetchMintedNFTByMetadata(tokenId, metadata) : undefined;
    })
  );

  return nfts.filter((nft): nft is NFT => nft !== undefined);
}

export async function fetchNFTsByAddress(address: string): Promise<NFT[]> {
  return await fetchNFTsFromUTXOs(address);
}

export const useNFT = (
  tokenId: string,
  nodeProvider?: NodeProvider,
  explorerProvider?: ExplorerProvider
) => {
  const { data, error, ...rest } = useSWR(
    nodeProvider && explorerProvider && [tokenId, "nft"],
    async () => {
      if (!nodeProvider || !explorerProvider) {
        return undefined;
      }

      web3.setCurrentNodeProvider(nodeProvider);
      web3.setCurrentExplorerProvider(explorerProvider);

      return fetchMintedNFT(tokenId);
    },
    {
      refreshInterval: 60e3 /* 1 minute */,
      suspense: true
    },
  );

  return { nft: data, ...rest };
};