"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import React, { useState, useEffect } from 'react';
import { useWallet } from "@alephium/web3-react";
import { MintPlayerService } from "../services/nft.services";
import { addressFromContractId, contractIdFromAddress } from "@alephium/web3";
import { motion } from "framer-motion";
import { FaExchangeAlt } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

export const MintPlayerAutomation = ({ config }) => {
  const { signer, account } = useWallet();
  const [results, setResults] = useState([]);
  const [mintingResults, setMintingResults] = useState(new Map());
  const specificId = "1136a8337e57e74b4b526e92b255593c2a5cdb5aef0093148a2c88f853c1de00";
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleMintPlayer = async (e) => {
    e.preventDefault();
    if (signer) {
      try {
        setIsLoading(true);
        const result = await MintPlayerService(signer, id);
      } catch (err) {
        console.error("Error minting player:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const fetchContractStates = async (tokenBalances) => {
    const statePromises = tokenBalances.map(async (token) => {
      const address = addressFromContractId(token.id)
      const url = `https://node.alphaga.app/contracts/${address}/state`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return { address, state: data };
      } catch (err) {
        console.error(`Failed to fetch contract state for ${address}:`, err);
        return null;
      }
    });

    const states = await Promise.all(statePromises);
    const matchingResults = states
      .filter((state) => state !== null && state.state.immFields.some(field => field.value === specificId))
      .map((result) => result.address);

    setResults(matchingResults);
  };

  const handleMintForId = async (contractId) => {
    if (signer) {
      setMintingResults(prev => new Map(prev.set(contractId, 'Processing...')));
      try {
        const result = await MintPlayerService(signer, contractId);
        setMintingResults(prev => new Map(prev.set(contractId, 'Success!')));
      } catch (error) {
        setMintingResults(prev => new Map(prev.set(contractId, 'Failed')));
      }
    }
  };

  const computeHexString = (address) => {
    const u8int = contractIdFromAddress(address);
    return Array.from(u8int, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  useEffect(() => {
    const fetchBalance = async () => {
      if (!account?.address) return;
      const url = `https://node.alphaga.app/addresses/${account.address}/balance`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        await fetchContractStates(data.tokenBalances);
      } catch (err) {
        console.log(err);
      }
    };

    if (account) {
      fetchBalance();
    }
  }, [account]);

  return (
    <main className="flex items-center justify-center min-h-screen py-20 bg-gradient-to-b from-gray-900 to-black">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl mx-auto px-4"
      >
        <div className="bg-gradient-to-b from-gray-800/90 to-gray-900/90 p-8 rounded-xl border border-gray-700/50 backdrop-blur-sm shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Migrate your ALPHpaca
            </h2>
            <p className="mt-4 text-gray-400">
              Migrate and watch your ALPHpaca reap GameFi updates coming shortly, plus enhanced utility over time.
            </p>
          </div>

          <div className="mb-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
            <div className="flex items-center gap-2 mb-3">
              <AiOutlineInfoCircle className="text-green-400 w-5 h-5" />
              <h3 className="text-white font-medium">Migration Benefits</h3>
            </div>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Enhanced GameFi compatibility</li>
              <li>• Improved smart contract features</li>
              <li>• Access to future exclusive content</li>
              <li>• Preserved rarity and attributes</li>
            </ul>
          </div>

          <form onSubmit={handleMintPlayer} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="id">
                V1 PACA ID
              </label>
              <Input
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all"
                id="id"
                name="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
                type="text"
                placeholder="Enter your V1 PACA ID"
              />
            </div>

            <Button
              className={`w-full px-4 py-3 bg-gradient-to-r from-green-500/10 via-green-500/20 to-green-400/10 
                hover:from-green-500/20 hover:via-green-500/30 hover:to-green-400/20 
                border border-green-500/20 hover:border-green-500/30 
                transition-all duration-300 ease-out
                text-green-400 hover:text-green-300 rounded-xl font-medium
                flex items-center justify-center gap-2
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={isLoading}
            >
              <FaExchangeAlt className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Migrating...' : 'Migrate'}
            </Button>
          </form>

          {results.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 border-t border-gray-700/50 pt-8"
            >
              <h3 className="text-xl font-semibold text-green-400 mb-4">Available for Migration</h3>
              <div className="space-y-4">
                {results.map((address, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/30 flex flex-col gap-4"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm font-medium">Contract ID:</span>
                      <span className="text-gray-400 text-sm">{address}</span>
                    </div>
                    <Button
                      onClick={() => handleMintForId(computeHexString(address))}
                      className="w-full px-4 py-2 bg-gradient-to-r from-green-500/10 to-green-400/10 
                        hover:from-green-500/20 hover:to-green-400/20 
                        border border-green-500/20 hover:border-green-500/30 
                        transition-all duration-300 ease-out
                        text-green-400 hover:text-green-300 rounded-xl text-sm"
                    >
                      {mintingResults.get(address) || 'Migrate'}
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </main>
  );
};