"use client";
import React, { useState, useEffect } from 'react';
import { Copy, Wallet } from 'lucide-react';
import { useWallet } from '@alephium/web3-react';
import { ANS } from '@alph-name-service/ans-sdk';
import { balanceOf } from "../lib/utils";
import NFTGallery from './nft-profile';

const PacaDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('SEE PACAS');
  const wallet = useWallet();
  const [ansName, setAnsName] = useState('');
  const [ansUri, setAnsUri] = useState('');
  const [pacaBalance, setPacaBalance] = useState(0);

  const tabs = ['SEE PACAS', 'IN BATTLE', 'UPGRADE PACA', 'MOVES'];

  useEffect(() => {
    if (wallet?.account?.address) {
      const getProfile = async () => {
        const ans = new ANS('mainnet');
        const testProfile = await ans.getProfile(wallet?.account?.address);
        if (testProfile?.name) {
          setAnsName(testProfile.name);
        }
        if (testProfile?.imgUri) {
          setAnsUri(testProfile.imgUri);
        }
      };
      getProfile();
      
      const fetchPacaBalance = async () => {
        const pacaTokenId = "b2d71c116408ae47b931482a440f675dc9ea64453db24ee931dacd578cae9002";
        const balance = await balanceOf(pacaTokenId, wallet.account?.address);
        setPacaBalance(balance);
      };
      fetchPacaBalance();
    }
  }, [wallet?.account?.address]);

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'SEE PACAS':
        return (<NFTGallery />);
      case 'IN BATTLE':
        return (
          <div className="flex items-center justify-center h-64 text-gray-400">
            <div className="text-center">
              <div className="text-2xl mb-2">🎮 Coming Soon</div>
              <p className="text-sm">Battle feature is under development</p>
            </div>
          </div>
        );
      case 'UPGRADE PACA':
        return (
          <div className="flex items-center justify-center h-64 text-gray-400">
            <div className="text-center">
              <div className="text-2xl mb-2">⚡ Coming Soon</div>
              <p className="text-sm">Upgrade system is under development</p>
            </div>
          </div>
        );
      case 'MOVES':
        return (
          <div className="flex items-center justify-center h-64 text-gray-400">
            <div className="text-center">
              <div className="text-2xl mb-2">🎯 Coming Soon</div>
              <p className="text-sm">Moves feature is under development</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const shortenHash = (address, charsAmount = 6) => {
    return `${address?.substring(0, charsAmount)}...${address?.substring(address.length - charsAmount)}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden">
          <div className="relative bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-green-500/20 group-hover:border-green-500/40 transition-all duration-300">
                  {ansUri ? (
                    <img src={ansUri} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-4xl">
                      👤
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold text-center md:text-left bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  {ansName || "Unnamed Paca"}
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                  <div className="px-3 py-1 bg-gray-900/50 rounded-lg text-sm text-gray-300 flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    {shortenHash(wallet?.account?.address)}
                    <button 
                      onClick={() => copyToClipboard(wallet?.account?.address)}
                      className="text-gray-400 hover:text-green-400 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="px-3 py-1 bg-gray-900/50 rounded-lg text-sm text-green-400">
                    {(parseFloat(pacaBalance) / 1e18).toFixed(2)} PACA
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700/50">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-6 py-4 text-sm font-medium transition-all duration-300 whitespace-nowrap
                    ${selectedTab === tab 
                      ? 'text-green-400 border-b-2 border-green-400' 
                      : 'text-gray-400 hover:text-gray-300'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PacaDashboard;