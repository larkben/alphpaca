import React, { useRef, useEffect, useState } from 'react';
import { X, Activity, Info } from 'lucide-react';
import { fetchNFTMetadata } from '../lib/nft';

const NFTPopup = ({ nft, onClose }) => {
  const popupRef = useRef(null);
  const [metadata, setMetadata] = useState(null);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const loadMetadata = async () => {
      const data = await fetchNFTMetadata(nft.tokenId);
      setMetadata(data);
    };
    loadMetadata();
    
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [nft.tokenId, onClose]);

  if (!metadata) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div 
        ref={popupRef} 
        className="bg-gradient-to-b from-gray-800/90 to-gray-900/90 p-6 rounded-3xl w-11/12 max-w-lg border border-gray-700/50 backdrop-blur-sm"
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            {metadata.name}
          </h2>
          <button
            className="p-2 rounded-full hover:bg-gray-700/50 transition-colors text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex gap-6 mb-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <img 
              src={metadata.image} 
              alt={metadata.name || "NFT"} 
              className="relative w-64 h-64 object-cover rounded-2xl border border-gray-700/50"
            />
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => setActiveTab('info')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors
                ${activeTab === 'info' 
                  ? 'bg-green-400/20 text-green-400' 
                  : 'hover:bg-gray-700/50 text-gray-400'}`}
            >
              <Info size={18} />
              Info
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors
                ${activeTab === 'stats' 
                  ? 'bg-green-400/20 text-green-400' 
                  : 'hover:bg-gray-700/50 text-gray-400'}`}
            >
              <Activity size={18} />
              Stats
            </button>
          </div>
        </div>

        {activeTab === 'info' ? (
          <>
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">Description</h3>
              <p className="text-gray-300">{metadata.description}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-2">Attributes</h3>
              <div className="grid grid-cols-2 gap-3">
                {metadata.attributes && metadata.attributes.map((attr, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 hover:border-green-400/50 transition-colors"
                  >
                    <div className="text-sm text-gray-400">{attr.trait_type}</div>
                    <div className="font-semibold text-green-400">{attr.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-48 text-gray-400">
            <div className="text-center">
              <Activity size={32} className="mx-auto mb-2" />
              <p>Stats coming soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTPopup;