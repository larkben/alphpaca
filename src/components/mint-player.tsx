'use client'
import { Input } from "./ui/input"
import { Button } from "./ui/button";
import React from 'react'
import { FC, useState, useEffect } from 'react'

// Import Alephium Services
import { TokenCreate } from "../services/utils"
import { useWallet } from "@alephium/web3-react"
import { AlephiumConnectButton } from '@alephium/web3-react'
import { contractIdFromAddress } from "@alephium/web3";
import { MintPlayerService } from "../services/nft.services";

export const MintPlayerAutomation: FC<{
  config: TokenCreate
}> = ({ config }) => {
  const { signer, account } = useWallet()
  const addressGroup = config.groupIndex
  const [ongoingTxId, setOngoingTxId] = useState<string>()

  const [id, setId] = useState<string>("")

  // Handle of Token Create
  const handleMintPlayer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (signer) {
      const result = await MintPlayerService(signer, id)
    }
  }

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
      <div className="min-w-30 space-y-8 bg-gray-800 p-6 rounded-lg shadow-md z-50">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500">Migrate your ALPHpaca</h2>
          <p className="mt-2 text-center text-sm text-gray-400"> Migrate and watch your ALPHpaca reap GameFi updates coming shortly, plus enhanced utility over time. </p>
        </div>
        <form  onSubmit={handleMintPlayer} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="text-white" htmlFor="symbol">V1 PACA ID:</label>
              <Input
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-200 border-gray-700 placeholder-gray-500 text-blue-500 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:border-gray-800"
                id="symbol"
                name="symbol"
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
        </div>
    </main>
  )
}
