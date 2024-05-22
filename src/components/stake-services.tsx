'use client'
import { Input } from "./ui/input"
import { Button } from "./ui/button";
import React from 'react'
import { FC, useState, useEffect } from 'react'

// Import Alephium Services
import { TokenCreate } from "../services/utils"
import { useWallet } from "@alephium/web3-react"
import { BuildToken, CreateStake, CreateStakeFactory, DistributeRewards, EditStakeRewards, RemoveStake } from "../services/token.services"
import { AlephiumConnectButton } from '@alephium/web3-react'
import { contractIdFromAddress } from "@alephium/web3";
import TokenList from "./createdtokens"

export const StakingServices: FC<{
  config: TokenCreate
}> = ({ config }) => {
  const { signer, account } = useWallet()
  const addressGroup = config.groupIndex
  const [ongoingTxId, setOngoingTxId] = useState<string>()

  const [token, setToken] = useState<string>("")
  const [amount, setAmount] = useState<string>("")

  const [contract, setContract] = useState<string>("")

  const [id, setId] = useState<string>("")

  // useful for calculating the number of tokens staked
  //const supplyWithDecimals = Number(`${supply}e-${decimals}`);

  // Handle of Creating Staking Factory + Contract Execution
  const handleCreateStakeFactory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (signer) {
      const result = await CreateStakeFactory(signer, token)
    }
  }

  function executeCreateStake(contract: string) {
    const handleCreateStakeFactory = async (e: React.FormEvent) => {
        e.preventDefault()
        if (signer) {
          const result = await CreateStake(signer, contract, amount)
        }
    }
  }

  function executeRemoveStake(contract: string) {
    const handleRemoveStakeFactory = async (e: React.FormEvent) => {
        e.preventDefault()
        if (signer) {
          const result = await RemoveStake(signer, contract, amount)
        }
    }
  }

  function executeRewardEdit(contract: string) {
    const handleRewardEdit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (signer) {
          const result = await EditStakeRewards(signer, contract, amount)
        }
    }
  }

  function executeDistributeRewards(contract: string) {
    const handleDistribution = async (e: React.FormEvent) => {
        e.preventDefault()
        if (signer) {
          const result = await DistributeRewards(signer, contract, amount)
        }
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
          <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500">Create Your Stake Pool *Coming Soon* </h2>
        </div>
        <form  onSubmit={handleCreateStakeFactory} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="text-white" htmlFor="token">Token</label>
              <Input
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-200 border-gray-700 placeholder-gray-500 text-blue-500 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:border-gray-800"
                id="token"
                name="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
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
              Create Stake Pool
            </Button>
          </div>
        </form>
        <br/>
        </div>
    </main>
  )
}
