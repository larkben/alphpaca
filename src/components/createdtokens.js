"use client";
import React, { useEffect, useState } from 'react';
import { NodeProvider, hexToString, addressFromContractId } from '@alephium/web3';
import { Copy, ExternalLink } from 'lucide-react';

const nodeProvider = new NodeProvider("https://node.alphaga.app");

const TokenComponent = () => {
  const [tokens, setTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const fetchTokens = async () => {
      console.log("Starting token fetch...");
  
      try {
        const result = await nodeProvider.events.getEventsContractContractaddress(
          "24nVqPHpFofyJrh4nFBeT3KVJDfG44mS6XWhGknbKWkFZ",
          { start: 0, limit: 100 }
        );
  
        console.log("Fetch successful, result:", result);
  
        const fetchedTokens = [];
  
        if (result && result.events) {
          for (let i = result.nextStart - 5; i < result.nextStart; i++) {
            const id = result.events[i].fields[1].value;
            const address = addressFromContractId(id);
  
            try {
              const response = await fetch(`https://node.alphaga.app/contracts/${address}/state`);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
  
              const hexsymbol = data.immFields[0].value;
              const hexname = data.immFields[1].value;
              const decimals = data.immFields[2].value;
              const supply = data.immFields[3].value;
              const name = hexToString(hexname);
              const symbol = hexToString(hexsymbol);
  
              console.log(`${symbol} (${name}), Total Supply: ${supply}, Decimals: ${decimals}`);
  
              fetchedTokens.push({ id, address, name, symbol, decimals, supply });
            } catch (error) {
              console.error('There was a problem with the fetch operation:', error);
            }
          }
  
          setTokens(fetchedTokens);
        } else {
          console.log("Unexpected response structure:", result);
          setError("Invalid response structure");
        }
      } catch (e) {
        console.error("Error during fetchTokens:", e);
        setError("Failed to fetch tokens");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchTokens();
  }, []);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedId(type);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatSupply = (supply, decimals) => {
    const value = parseFloat(supply) / Math.pow(10, decimals);
    return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-red-400">
        <div className="text-center">
          <div className="text-2xl mb-2">⚠️</div>
          <div>Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        {tokens.map((token, index) => (
          <div 
            key={index} 
            className="bg-gradient-to-b from-gray-800/90 to-gray-900/90 rounded-2xl border border-gray-700/50 backdrop-blur-sm overflow-hidden hover:border-green-400/50 transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  {token.name} ({token.symbol})
                </h3>
                <a 
                  href={`https://explorer.alephium.org/addresses/${token.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  <ExternalLink size={20} />
                </a>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <div className="text-sm text-gray-400">Token ID</div>
                  <div className="flex items-center gap-2 bg-gray-900/50 rounded-xl p-3 border border-gray-700/50">
                    <div className="text-sm text-gray-300 font-mono truncate">
                      {token.id}
                    </div>
                    <button
                      onClick={() => copyToClipboard(token.id, `id-${index}`)}
                      className="text-gray-400 hover:text-green-400 transition-colors ml-auto"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="text-sm text-gray-400">Contract Address</div>
                  <div className="flex items-center gap-2 bg-gray-900/50 rounded-xl p-3 border border-gray-700/50">
                    <div className="text-sm text-gray-300 font-mono truncate">
                      {token.address}
                    </div>
                    <button
                      onClick={() => copyToClipboard(token.address, `address-${index}`)}
                      className="text-gray-400 hover:text-green-400 transition-colors ml-auto"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-900/50 rounded-xl p-3 border border-gray-700/50">
                    <div className="text-sm text-gray-400 mb-1">Total Supply</div>
                    <div className="text-green-400 font-semibold">
                      {formatSupply(token.supply, token.decimals)}
                    </div>
                  </div>
                  <div className="bg-gray-900/50 rounded-xl p-3 border border-gray-700/50">
                    <div className="text-sm text-gray-400 mb-1">Decimals</div>
                    <div className="text-green-400 font-semibold">{token.decimals}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenComponent;