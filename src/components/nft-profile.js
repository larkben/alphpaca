import React, { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@alephium/web3-react';
import Link from "next/link";
import { Grid, Cog  } from 'lucide-react';
import { fetchNFTsByAddress } from '../lib/nfts';
import { formatNFTPrice } from '../lib/utils';
import { web3, NodeProvider, ExplorerProvider } from "@alephium/web3";
import { InfiniteScroll } from "../lib/InfiniteScroll";
import { MintPlayerService } from "../services/nft.services";

const NFTGallery = () => {
  const wallet = useWallet();
  const [nfts, setNFTs] = useState([]);
  const [displayedNFTs, setDisplayedNFTs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isNFTsLoading, setIsNFTsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [mintingResults, setMintingResults] = useState(new Map());

  const userAddress = wallet?.account?.address ?? "";
  const isWalletConnected = wallet?.connectionStatus === 'connected' && wallet.account;

  const pageSize = 12;

  const allowedCollectionIds = [
    '69aa088239e6f6cbe376a98fff39a1cc1271c80003fa58b11b1d09edc86e9100',
    '1136a8337e57e74b4b526e92b255593c2a5cdb5aef0093148a2c88f853c1de00'
  ];

  const loadNFTs = useCallback(async () => {
    if (!userAddress || isNFTsLoading) return;

    setIsNFTsLoading(true);

    try {
      const nodeProvider = new NodeProvider('https://node.alphaga.app');
      const explorerProvider = new ExplorerProvider('https://backend.mainnet.alephium.org');
      web3.setCurrentNodeProvider(nodeProvider);
      web3.setCurrentExplorerProvider(explorerProvider);

      const fetchedNFTs = await fetchNFTsByAddress(userAddress);

      if (Array.isArray(fetchedNFTs)) {
        const filteredNFTs = fetchedNFTs.filter(nft => allowedCollectionIds.includes(nft.collectionId));
        setNFTs(filteredNFTs);
        setDisplayedNFTs(filteredNFTs.slice(0, pageSize));
        setHasMore(filteredNFTs.length > pageSize);
      } else {
        console.error('Unexpected response from fetchNFTsByAddress:', fetchedNFTs);
        setError('Failed to load NFTs. Please try again.');
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading NFTs:', error);
      setError('Failed to load NFTs. Please try again.');
      setHasMore(false);
    } finally {
      setIsNFTsLoading(false);
    }
  }, [userAddress, pageSize]);

  useEffect(() => {
    if (isWalletConnected) {
      loadNFTs();
    }
  }, [isWalletConnected, loadNFTs]);

  const loadMoreNFTs = useCallback(() => {
    if (!hasMore || isNFTsLoading) return;

    setIsLoadingMore(true);
    const nextPage = page + 1;
    const startIndex = nextPage * pageSize;
    const endIndex = startIndex + pageSize;
    const newNFTs = nfts.slice(startIndex, endIndex);

    setDisplayedNFTs(prevNFTs => [...prevNFTs, ...newNFTs]);
    setPage(nextPage);
    setHasMore(endIndex < nfts.length);
    setIsLoadingMore(false);
  }, [hasMore, isNFTsLoading, page, pageSize, nfts]);

  const handleMintForId = async (contractId) => {
    if (wallet.signer) {
      try {
        const result = await MintPlayerService(wallet.signer, contractId);
        setMintingResults(prev => new Map(prev).set(contractId, "Upgrade successful"));
      } catch (error) {
        console.error("Error during upgrade:", error);
        setMintingResults(prev => new Map(prev).set(contractId, "Upgrade failed"));
      }
    }
  };

  if (!isWalletConnected) {
    return <p>You must be connected to your wallet</p>;
  }

  return (
    <div className="container">
      {isNFTsLoading && displayedNFTs.length === 0 ? (
        <div className="flex items-center justify-center mt-6">Loading NFTs...</div>
      ) : displayedNFTs.length > 0 ? (
        <InfiniteScroll onNextPage={loadMoreNFTs} hasMore={hasMore} isLoading={isLoadingMore}>
          {({ bottomSentinelRef }) => (
            <>
              <div className="flex items-center justify-center mt-3">
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
                  {displayedNFTs.map((nft, index) => (
                    <div key={`${nft.tokenId}-${index}`} className="group relative p-4 rounded-2xl bg-slate-700 border border-gray-800 shadow-lg cursor-pointer hover:shadow-gray-700 transition-all duration-500 h-fit">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={nft.image}
                          alt={nft.name || 'NFT image'}
                          className="rounded-xl group-hover:scale-110 transition-all duration-500"
                        />
                      </div>
                      {nft.isOld && (
                          <div 
                            className="flex items-center mt-1 ml-1 absolute top-0 left-0 bg-green-400/80 text-white px-2 py-1 text-xl font-bold rounded-xl cursor-pointer"
                            onClick={() => handleMintForId(nft.tokenId)}
                          >
                            <Cog className="animate-spin mr-2" style={{ animationDuration: '3s' }} size={24} />
                            Upgrade Available
                          </div>
                        )}
                        {mintingResults.get(nft.tokenId) && (
                          <div className="mt-2 text-sm text-center">
                            {mintingResults.get(nft.tokenId)}
                          </div>
                        )}
                        <div className="p-4">
                        <Link href={`#`} className="text-lg font-semibold hover:text-cyan-300">
                          {nft.name || 'Unnamed NFT'}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div ref={bottomSentinelRef}></div>
              {isLoadingMore && (
                <div className="mt-6 text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                       role="status">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
        </InfiniteScroll>
      ) : (
        <div className="mt-6">
          <h5 className="text-xl font-semibold">No NFTs owned</h5>
        </div>
      )}
    </div>
  );
};

export default NFTGallery;
