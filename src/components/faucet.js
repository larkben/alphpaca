"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import React, { useState, useEffect } from 'react';
import { useWallet } from "@alephium/web3-react";
import { AlephiumConnectButton } from '@alephium/web3-react';
import { contractIdFromAddress } from "@alephium/web3";

export const FaucetDapp = ({ config }) => {
  const { signer, account } = useWallet();
  const addressGroup = config.groupIndex;
  const [ongoingTxId, setOngoingTxId] = useState();

  const [alphAmount, setAlphAmount] = useState('');

  const [contract, setContract] = useState("");

  const [id, setId] = useState("");

  useEffect(() => {
    // Your client-side code here

    // Cleanup function if needed
    return () => {
      // Cleanup logic
    };
  }, []);

  // Form submit to insert values and receive input
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-20 bg-gray-900 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-6 rounded-lg shadow-md z-50">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500">ALPH Faucet</h2>
          <br/>
          <p className="text-1xl text-white text-center"> Withdraw is 0.02 alph. </p>
        </div>
        <form className="mt-8 space-y-6">
          <div>
            <Button
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-200 border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-800"
              type="submit"
            >
              Withdraw ALPH
            </Button>
          </div>
        </form>
        <br/>
        <br/>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="text-white" htmlFor="decimals">Amount to be Deposited into Faucet:</label>
              <Input
                className="text-blue-500 appearance-none rounded relative block w-full px-3 py-2 border border-gray-200 border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:border-gray-800"
                id="decimals"
                name="decimals"
                value={alphAmount}
                onChange={(e) => setAlphAmount(e.target.value)}
                required
                type="number"
              />
            </div>
          </div>
          <div>
            <Button
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-200 border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-800"
              type="submit"
            >
              Deposit ALPH
            </Button>
          </div>
        </form>
        </div>
    </main>
  );
};