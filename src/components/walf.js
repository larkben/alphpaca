"use client";
import { Input } from "./ui/input"
import { Button } from "./ui/button";
import React, { useState, useEffect } from 'react'
import { useWallet } from "@alephium/web3-react"
import { ServiceMintWrappedAlf, ServiceMintOgAlf } from "../services/token.services"

export const Wrapped = ({ config }) => {
  const { signer, account } = useWallet()
  const addressGroup = config.groupIndex
  const [ongoingTxId, setOngoingTxId] = useState()

  const [amountOgAlf, setAmountOgAlf] = useState("")
  const [amountWrappedAlf, setWrappedAlf] = useState("")

  const [predictedWrappedAmount, setPredictedWrappedAmount] = useState(0);
  const [predictedOgAlfAmount, setPredictedOgAlfAmount] = useState(0);

  useEffect(() => {
    if (amountOgAlf) {
      setPredictedWrappedAmount(Number(amountOgAlf) * 1000000000000000000);
    } else {
      setPredictedWrappedAmount(0);
    }
  }, [amountOgAlf]);

  useEffect(() => {
    if (amountWrappedAlf) {
      setPredictedOgAlfAmount(Number(amountWrappedAlf) / 1000000000000000000);
    } else {
      setPredictedOgAlfAmount(0);
    }
  }, [amountWrappedAlf]);

  // Handle mint Wrapped Alf
  const handleMintWrappedOgAlf = async (e) => {
    e.preventDefault()
    if (signer) {
      const result = await ServiceMintWrappedAlf(signer, amountOgAlf)
    }
  }

  // Handle mint OgAlf
  const handleMintOgAlf = async (e) => {
    e.preventDefault()
    if (signer) {
      const result = await ServiceMintOgAlf(signer, amountWrappedAlf)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-20 bg-gray-900 sm:px-6 lg:px-8">
      <div className="min-w-30 space-y-8 bg-gray-800 p-6 rounded-lg shadow-md z-50">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-orange-500">Wrapped OG ALF Protocol NOW LIVE! </h2>
          <p className="mt-2 text-center text-sm text-gray-400"> This is a wrapper for your OG Alf. This contract protects your OG Alf and allows for redemptions. <br/> The ratio is: 1:1 <br/> Trading is accomplished with more decimal precision. </p>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-orange-500"> Mint OG Wrapped Alf </h2>
        <form onSubmit={handleMintWrappedOgAlf} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="text-white" htmlFor="symbol">OG Alf Amount</label>
              <Input
                className="appearance-none rounded relative block w-full px-3 py-2 border  border-gray-700 placeholder-gray-500 text-blue-500 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:border-gray-800"
                id="amountOgAlf"
                name="amountOgAlf"
                value={amountOgAlf}
                onChange={(e) => setAmountOgAlf(e.target.value)}
                required
                type="text"
              />
            </div>
          </div>
          <p className="mt-2 text-center text-sm text-gray-400"> Simulated Wrapped Alf Amount: {predictedWrappedAmount} </p>
          <div>
            <Button
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-200 border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-800"
              type="submit"
            >
              Mint Wrapped Alf
            </Button>
          </div>
        </form>
        <br/>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-orange-500">Mint Og Alf</h2>
        <form onSubmit={handleMintOgAlf} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="text-white" htmlFor="symbol">Wrapped OG ALF Amount</label>
              <Input
                className="appearance-none rounded relative block w-full px-3 py-2 border  border-gray-700 placeholder-gray-500 text-blue-500 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:border-gray-800"
                id="amountWrappedAlf"
                name="amountWrappedAlf"
                value={amountWrappedAlf}
                onChange={(e) => setWrappedAlf(e.target.value)}
                required
                type="text"
              />
            </div>
          </div>
          <p className="mt-2 text-center text-sm text-gray-400"> Simulated OG Alf Amount: {predictedOgAlfAmount} </p>
          <div>
            <Button
              className="group relative w-full flex justify-center py-2 px-4 border  border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-800"
              type="submit"
            >
              Mint OG Alf
            </Button>
          </div>
        </form>
        </div>
    </main>
  )
}