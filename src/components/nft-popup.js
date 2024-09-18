import React, { useRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { fetchNFTMetadata } from '../lib/nft';

const NFTPopup = ({ nft, onClose }) => {
  const popupRef = useRef(null);
  const [metadata, setMetadata] = useState(null);

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
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
      <div ref={popupRef} className="bg-slate-700 p-6 rounded-3xl w-11/12 max-w-lg text-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-xl font-bold">{metadata.name}</div>
          </div>
          <button
            className="bg-slate-600 p-2 rounded-full hover:bg-slate-500 transition-colors"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex mb-4">
          <img src={metadata.image} alt={metadata.name || "NFT sélectionné"} className="w-64 h-64 object-cover rounded-2xl mr-4" />
          <div className="bg-slate-600 px-8 py-2 rounded-full text-sm self-start hover:bg-slate-500 cursor-pointer transition-colors">Stats</div>
        </div>
        <div className="text-sm font-semibold mb-2">Description</div>
        <p className="mb-4">{metadata.description}</p>
        <div className="text-sm font-semibold mb-2">Attributs</div>
        <div className="grid grid-cols-2 gap-2">
          {metadata.attributes && metadata.attributes.map((attr, index) => (
            <div key={index} className="bg-slate-600 p-4 rounded-xl">
              <div className="font-bold">{attr.trait_type}</div>
              <div>{attr.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NFTPopup;