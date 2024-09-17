"use client";
import React, { useState, useEffect } from 'react';
import { X, Copy } from 'lucide-react';
import { useWallet, useBalance } from '@alephium/web3-react';
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
        return <div className="text-center py-8 text-white">In Battle content goes here</div>;
      case 'UPGRADE PACA':
        return <div className="text-center py-8 text-white">Upgrade Paca content goes here</div>;
      case 'MOVES':
        return <div className="text-center py-8 text-white">Moves content goes here</div>;
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
    <div className="relative">
      <div className={`bg-slate-800`}>
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-slate-700 rounded-2xl overflow-hidden mb-4">
            {ansUri ? (
              <img src={ansUri} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl text-white">👤</div>
            )}
          </div>
          <div className="text-white text-center">
            <div className="text-lg font-bold">{ansName || "No Name"}</div>
            <div className="text-sm flex items-center justify-center">
              {shortenHash(wallet?.account?.address)}
              <button 
                onClick={() => copyToClipboard(wallet?.account?.address)} 
                className="ml-2 text-slate-400 hover:text-slate-300"
              >
                <Copy size={16} />
              </button>
            </div>
            <div className="text-sm">
              {(parseFloat(pacaBalance) / 1e18).toFixed(2)} PACA
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-6">
          <div className="bg-slate-700 p-1 rounded-full inline-flex">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-full transition-all duration-500 ${
                  selectedTab === tab ? 'bg-slate-900 text-white' : 'text-slate-300 hover:text-white'
                }`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default PacaDashboard;