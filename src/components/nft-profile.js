"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@alephium/web3-react';
import { Cog  } from 'lucide-react';
import { fetchNFTsByAddress } from '../lib/nfts';
import { web3, NodeProvider, ExplorerProvider } from "@alephium/web3";
import { InfiniteScroll } from "../lib/InfiniteScroll";
import { MintPlayerService } from "../services/nft.services";
import NFTPopup from './nft-popup';

const NFTGallery = () => {
  const wallet = useWallet();
  const [nfts, setNFTs] = useState([]);
  const [displayedNFTs, setDisplayedNFTs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isNFTsLoading, setIsNFTsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [mintingResults, setMintingResults] = useState(new Map());
  const [selectedNFT, setSelectedNFT] = useState(null);

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
      console.log("Fetched NFTs:", fetchedNFTs);
      if (Array.isArray(fetchedNFTs)) {
        const filteredNFTs = fetchedNFTs.filter(nft => allowedCollectionIds.includes(nft.collectionId));
        console.log("Filtered NFTs:", filteredNFTs);
        setNFTs(filteredNFTs);
        setDisplayedNFTs(filteredNFTs.slice(0, pageSize));
        setHasMore(filteredNFTs.length > pageSize);
      } else {
        console.error('Unexpected response from fetchNFTsByAddress:', fetchedNFTs);
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading NFTs:', error);
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

  const handleNFTClick = (nft) => {
    setSelectedNFT(nft);
  };

  const closePopup = () => {
    setSelectedNFT(null);
  };

  if (!isWalletConnected) {
    return <p>You must be connected to your wallet</p>;
  }

  return (
    <div className="container">
      {isNFTsLoading && displayedNFTs.length === 0 ? (
        <div className="flex items-center justify-center mt-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-400"></div>
        </div>
      ) : displayedNFTs.length > 0 ? (
        <InfiniteScroll onNextPage={loadMoreNFTs} hasMore={hasMore} isLoading={isLoadingMore}>
          {({ bottomSentinelRef }) => (
            <>
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                {displayedNFTs.map((nft, index) => (
                  <div 
                    key={`${nft.tokenId}-${index}`} 
                    onClick={() => handleNFTClick(nft)}
                    className="group relative bg-gradient-to-b from-gray-800/90 to-gray-900/90 rounded-2xl border border-gray-700/50 backdrop-blur-sm overflow-hidden hover:border-green-400/50 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative p-3">
                      <div className="relative group-hover:transform group-hover:scale-105 transition-all duration-500">
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                        <img
                          src={nft.image}
                          alt={nft.name || 'NFT'}
                          className="relative rounded-2xl w-full aspect-square object-cover"
                        />
                      </div>
                      
                      {nft.isOld && (
                        <div 
                          className="absolute top-5 left-5 flex items-center bg-green-400/90 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMintForId(nft.tokenId);
                          }}
                        >
                          <Cog className="animate-spin mr-2" style={{ animationDuration: '3s' }} size={16} />
                          Upgrade Available
                        </div>
                      )}
                      
                      {mintingResults.get(nft.tokenId) && (
                        <div className="absolute top-5 right-5 bg-gray-900/90 text-green-400 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
                          {mintingResults.get(nft.tokenId)}
                        </div>
                      )}

                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">
                          {nft.name || 'Unnamed NFT'}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div ref={bottomSentinelRef} />
              
              {isLoadingMore && (
                <div className="mt-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-400 inline-block"></div>
                </div>
              )}
            </>
          )}
        </InfiniteScroll>
      ) : (
        <div className="mt-6 text-center">
          <h5 className="text-xl font-semibold text-gray-400">No NFTs owned</h5>
        </div>
      )}

      {selectedNFT && (
        <NFTPopup nft={selectedNFT} onClose={closePopup} />
      )}
    </div>
  );
};

export default NFTGallery;
