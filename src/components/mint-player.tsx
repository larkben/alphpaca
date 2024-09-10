'use client'
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import React, { FC, useState, useEffect } from 'react';

// Import Alephium Services
import { TokenCreate } from "../services/utils";
import { useWallet } from "@alephium/web3-react";
import { MintPlayerService } from "../services/nft.services";
import { addressFromContractId, contractIdFromAddress } from "@alephium/web3";

// Define types for the state
interface TokenBalance {
  id: string;
  amount: string;
}

interface ImmField {
  type: string;
  value: string;
}

interface ContractState {
  address: string;
  bytecode: string;
  codeHash: string;
  initialStateHash: string;
  immFields: ImmField[];
  mutFields: any[];
  asset: {
    attoAlphAmount: string;
    tokens: any[];
  };
}

interface Result {
  address: string;
  state: ContractState;
}

export const MintPlayerAutomation: FC<{ config: TokenCreate }> = ({ config }) => {
  const { signer, account } = useWallet();
  const [ongoingTxId, setOngoingTxId] = useState<string | undefined>();
  const [results, setResults] = useState<string[]>([]);
  const [mintingResults, setMintingResults] = useState<Map<string, string>>(new Map());
  const specificId = "1136a8337e57e74b4b526e92b255593c2a5cdb5aef0093148a2c88f853c1de00";
  const [id, setId] = useState<string>("");

  // Handle Token Create
  const handleMintPlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signer) {
      try {
        const result = await MintPlayerService(signer, id);
        setOngoingTxId(result.txId); // Update state with transaction ID
      } catch (err) {
        console.error("Error minting player:", err);
      }
    }
  };

  // Fetch connected user balance
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

  const fetchContractStates = async (tokenBalances: TokenBalance[]) => {
    const statePromises = tokenBalances.map(async (token) => {
      const address = addressFromContractId(token.id)
      const url = `https://node.alphaga.app/contracts/${address}/state`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return { address, state: data } as Result; // Explicitly casting to Result
      } catch (err) {
        console.error(`Failed to fetch contract state for ${address}:`, err);
        return null; // Return null in case of error
      }
    });

    // Filter out null values and match the specific ID
    const states = await Promise.all(statePromises);
    const matchingResults = states
      .filter((state): state is Result => state !== null && state.state.immFields.some(field => field.value === specificId))
      .map((result) => result.address); // Extract only addresses

    setResults(matchingResults);
  };

  // Handle minting for each matching ID
  const handleMintForId = async (contractId: string) => {
    if (signer) {
      const result = await MintPlayerService(signer, contractId);
    }
  };

  // Compute hexString for a given address
  const computeHexString = (address: string): string => {
    const u8int = contractIdFromAddress(address);
    return Array.from(u8int, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  useEffect(() => {
    // Fetch balance when component mounts or account changes
    if (account) {
      fetchBalance();
    }
  }, [account]);

  return (
    <main className="flex items-center justify-center min-h-screen py-20 bg-gray-900 sm:px-6 lg:px-8">
      <div className="w-full max-w-[800px] bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-blue-500">Migrate your ALPHpaca</h2>
          <p className="mt-2 text-sm text-gray-400">Migrate and watch your ALPHpaca reap GameFi updates coming shortly, plus enhanced utility over time.</p>
        </div>
        <form onSubmit={handleMintPlayer} className="space-y-6">
          <div className="space-y-4">
          <div>
              <label className="text-white" htmlFor="supply">V1 PACA ID</label>
              <Input
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-200 border-gray-700 placeholder-gray-500 text-blue-500 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:border-gray-800"
                id="id"
                name="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
                type="text"
              />
            </div>
          </div>
          <div>
            <Button
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-200 border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-800"
              type="submit"
            >
              Migrate
            </Button>
          </div>
        </form>
        {results.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-blue-500">Matching Contract IDs:</h3>
            <ul className="list-disc pl-5 mt-4 text-gray-300">
              {results.map((address, index) => (
                <li key={index} className="mb-4 flex items-center space-x-4">
                  <span>{address}</span>
                  <Button
                    onClick={() => handleMintForId(computeHexString(address))}
                    className="group relative w-full flex justify-center py-2 px-4 border border-gray-200 border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-800"
                    type="submit"
                  >
                    Migrate
                  </Button>
                  {mintingResults.get(address) && (
                    <span className="text-gray-300">{mintingResults.get(address)}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
};

