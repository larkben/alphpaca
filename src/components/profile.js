"use client";
import React, { useState, useEffect } from 'react';
import { X, Copy } from 'lucide-react';
import { useWallet, useBalance } from '@alephium/web3-react';
import { ANS } from '@alph-name-service/ans-sdk';
import { balanceOf } from "../lib/utils";

const PacaDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('SEE PACAS');
  const [selectedPaca, setSelectedPaca] = useState(null);
  const wallet = useWallet();
  const { balance } = useBalance();
  const [ansName, setAnsName] = useState('');
  const [ansUri, setAnsUri] = useState('');
  const [pacaBalance, setPacaBalance] = useState(0);

  const pacas = [
    { id: 1, name: 'Paca #1', image: '/api/placeholder/150/150' },
    { id: 2, name: 'Paca #2', image: '/api/placeholder/150/150' },
    { id: 3, name: 'Paca #3', image: '/api/placeholder/150/150' },
    { id: 4, name: 'Paca #4', image: '/api/placeholder/150/150' },
  ];

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

  const handlePacaClick = (pacaId) => {
    setSelectedPaca(pacaId);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'SEE PACAS':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pacas.map((paca) => (
              <div
                key={paca.id}
                className="bg-slate-700 p-4 rounded-2xl cursor-pointer shadow-md hover:shadow-lg transition-shadow"
                onClick={() => handlePacaClick(paca.id)}
              >
                <img src={paca.image} alt={paca.name} className="w-full h-auto mb-2 rounded-xl" />
                <div className="text-center font-semibold text-white">{paca.name}</div>
              </div>
            ))}
          </div>
        );
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
      <div className={`bg-slate-800 p-6 ${selectedPaca ? 'opacity-50' : ''}`}>
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
              {(parseFloat(pacaBalance) / 1e18).toFixed(2)} $PACA
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-6">
          <div className="bg-slate-700 p-1 rounded-full inline-flex">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-full transition-colors ${
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
      
      {selectedPaca && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-slate-700 p-6 rounded-3xl w-11/12 max-w-lg text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-xl font-bold">#{selectedPaca}</div>
                <div className="text-sm text-slate-300">ALPHpaca {selectedPaca}</div>
              </div>
              <button
                className="bg-slate-600 p-2 rounded-full hover:bg-slate-500 transition-colors"
                onClick={() => setSelectedPaca(null)}
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex mb-4">
              <img src="/api/placeholder/150/150" alt="Selected Paca" className="w-32 h-32 object-cover rounded-2xl mr-4" />
              <div className="bg-slate-600 px-4 py-2 rounded-full text-sm self-start hover:bg-slate-500 cursor-pointer transition-colors">Stats</div>
            </div>
            <div className="text-sm font-semibold mb-2">Linked Moves</div>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((move) => (
                <div key={move} className="bg-slate-600 p-4 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PacaDashboard;