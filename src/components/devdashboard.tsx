'use client'
// React Modules
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import React from 'react'
import { FC, useState, useEffect } from 'react'

// Import Alephium Services
import { TokenCreate } from "../services/utils"
import { useWallet } from "@alephium/web3-react"
import { BuildToken, CollectCreatorFees, CollectFactoryFees, DestroyTokenCreator, EditCreatorFees, ServiceDestroyMarketplace, ServiceDestroyWrappedAlfProtocol, ServiceTopupWalf } from "../services/token.services"
import { NodeProvider } from "@alephium/web3"
import { DestroyOgAlfProtocol } from "../../artifacts/ts"

const Node = "https://wallet-v20.mainnet.alephium.org"

const nodeProvider = new NodeProvider("https://wallet-v20.mainnet.alephium.org")

export const DevDashboard: FC<{
  config: TokenCreate
}> = ({ config }) => {
  const { signer, account } = useWallet()
  const addressGroup = config.groupIndex
  const [ongoingTxId, setOngoingTxId] = useState<string>()

  const [amount, setAmount] = useState("")

  // Amount of Fees Accumulated / Ready to Collect
  const [fees, setFees] = useState("")

  // Handle of Contract Destruction

  const handleTokenCreationDestroy = async (e: React.FormEvent) => {
    e.preventDefault()
    if (signer) {
      const result = await DestroyTokenCreator(signer)
    }
  }

  const handleCreatorFeeCollection = async (e: React.FormEvent) => {
    e.preventDefault()
    if (signer) {
      const result = await CollectCreatorFees(signer)
    }
  }

  const handleUpdateCreationFee = async (e: React.FormEvent) => {
    e.preventDefault()
    if (signer) {
      const result = await EditCreatorFees(signer, amount)
    }
  }

  const handleCollectStakingFees = async (e: React.FormEvent) => {
    e.preventDefault()
    if (signer) {
      const result = await CollectFactoryFees(signer)
    }
  }

  const handleDestroyWalfProtocol = async (e: React.FormEvent) => {
    e.preventDefault()
    if (signer) {
      const result = await ServiceDestroyMarketplace(signer)
    }
  }

  const handleTopUpWalf = async (e: React.FormEvent) => {
    e.preventDefault()
    if (signer) {
      const result = await ServiceTopupWalf(signer)
    }
  }

  useEffect(() => {
    const fetchTokens = async () => {
      console.log("Starting token fetch...");
  
      try {
        // Make sure the endpoint is correct and the call works
        const result = await nodeProvider.addresses.getAddressesAddressBalance('24nVqPHpFofyJrh4nFBeT3KVJDfG44mS6XWhGknbKWkFZ')
        console.log("Fetch successful, result:", result);

        const alphamount = result.balanceHint
        console.log("FetchedAmount is " + alphamount + ".")

        setFees(alphamount);  // Update the fees state with the fetched amount

      } catch (e) {
        console.error("Error during fetchTokens:", e);
      }
    };
  
    fetchTokens(); // Fetch tokens when component is mounted
  }, []);

  // Form submit to insert values and receive input
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-900 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-6 rounded-lg shadow-md z-50">
      <form  onSubmit={handleTokenCreationDestroy} className="mt-8 space-y-6">
          <div>
            <Button
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-200 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-800"
              type="submit"
            >
              Destroy Token Creation Tool
            </Button>
          </div>
      </form>
      <form  onSubmit={handleCollectStakingFees} className="mt-8 space-y-6">
          <div>
            <Button
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-200 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-800"
              type="submit"
            >
              Destroy WALF Protocol
            </Button>
          </div>
      </form>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500"> Accumlated Fees: {fees}</h2>
      <form  onSubmit={handleCreatorFeeCollection} className="mt-8 space-y-6">
          <div>
            <Button
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-200 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-800"
              type="submit"
            >
              Collect Creator Fees
            </Button>
          </div>
      </form>
      <form  onSubmit={handleUpdateCreationFee} className="mt-8 space-y-6">
          <div>
            <label className="text-white" htmlFor="symbol">Edit Token Creation Fee</label>
            <Input
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-200 border-gray-700 placeholder-gray-500 text-blue-500 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:border-gray-800"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              type="text"
            />
          </div>
          <div>
            <Button
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-200 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-800"
              type="submit"
            >
              Edit Token Creation Fees
            </Button>
          </div>
      </form>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500"> Staking Services Fee Collection </h2>
      <form  onSubmit={handleCollectStakingFees} className="mt-8 space-y-6">
          <div>
            <Button
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-200 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-800"
              type="submit"
            >
              Staking Services Collect
            </Button>
          </div>
      </form>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500"> TopUp Walf </h2>
      <form  onSubmit={handleCollectStakingFees} className="mt-8 space-y-6">
          <div>
            <Button
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-200 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-800"
              type="submit"
            >
              Destroy WALF Protocol
            </Button>
          </div>
      </form>
      <form  onSubmit={handleTopUpWalf} className="mt-8 space-y-6">
          <div>
            <Button
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-200 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-800"
              type="submit"
            >
              TopUp WALF
            </Button>
          </div>
      </form>
      </div>
    </main>
  )
}
