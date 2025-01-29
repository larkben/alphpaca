"use client";
import React, { useState, useEffect } from 'react'
import { useWallet } from "@alephium/web3-react"
import { motion } from "framer-motion"
import { 
  ServiceMintWrappedAlf, 
  ServiceMintOgAlf, 
  ServiceMintWrappedWang, 
  ServiceMintWang 
} from "../services/token.services"
import { waitTxConfirmed } from '../lib/utils'
import { AiOutlineSwap } from 'react-icons/ai'
import { BsArrowDownUp } from 'react-icons/bs'

export const WrappedTokens = ({ config }) => {
  const { signer, account } = useWallet()
  const [tokenType, setTokenType] = useState('alf')
  const [amountOgToken, setAmountOgToken] = useState("")
  const [amountWrappedToken, setAmountWrappedToken] = useState("")
  const [predictedWrappedAmount, setPredictedWrappedAmount] = useState(0)
  const [predictedOgAmount, setPredictedOgAmount] = useState(0)
  const [txStatus, setTxStatus] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (amountOgToken) {
      setPredictedWrappedAmount(tokenType === 'alf' 
        ? amountOgToken * 1000000000000000000
        : Number(amountOgToken))
    } else {
      setPredictedWrappedAmount(0)
    }
  }, [amountOgToken, tokenType])

  useEffect(() => {
    if (amountWrappedToken) {
      setPredictedOgAmount(tokenType === 'alf' 
        ? amountWrappedToken / 1000000000000000000
        : Number(amountWrappedToken))
    } else {
      setPredictedOgAmount(0)
    }
  }, [amountWrappedToken, tokenType])

  const handleMintWrapped = async (e) => {
    e.preventDefault()
    if (signer && !isProcessing) {
      try {
        setIsProcessing(true)
        setTxStatus("signing")
        const service = tokenType === 'alf' ? ServiceMintWrappedAlf : ServiceMintWrappedWang
        const result = await service(signer, predictedWrappedAmount)
        setTxStatus("processing")
        await waitTxConfirmed(result.txId)
        setTxStatus("completed")
        setTimeout(() => setTxStatus(""), 3000)
      } catch (error) {
        setTxStatus("error")
        setTimeout(() => setTxStatus(""), 3000)
        console.error('Error:', error)
      } finally {
        setIsProcessing(false)
      }
    }
  }

  const handleMintOriginal = async (e) => {
    e.preventDefault()
    if (signer && !isProcessing) {
      try {
        setIsProcessing(true)
        setTxStatus("signing")
        const service = tokenType === 'alf' ? ServiceMintOgAlf : ServiceMintWang
        const result = await service(signer, predictedOgAmount)
        setTxStatus("processing")
        await waitTxConfirmed(result.txId)
        setTxStatus("completed")
        setTimeout(() => setTxStatus(""), 3000)
      } catch (error) {
        setTxStatus("error")
        setTimeout(() => setTxStatus(""), 3000)
        console.error('Error:', error)
      } finally {
        setIsProcessing(false)
      }
    }
  }

  const StatusMessage = () => {
    if (!txStatus) return null

    const messages = {
      signing: "Please sign the transaction...",
      processing: "Transaction is being processed...",
      completed: "Transaction completed successfully!",
      error: "Transaction failed. Please try again."
    }

    const colors = {
      signing: "text-yellow-500",
      processing: "text-blue-500",
      completed: "text-green-500",
      error: "text-red-500"
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`fixed bottom-4 right-4 p-4 rounded-lg bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 shadow-lg ${colors[txStatus]}`}
      >
        {messages[txStatus]}
      </motion.div>
    )
  }

  const canAccessModule = account?.group === 0 || 1

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 px-4">
      <StatusMessage />
      
      {canAccessModule ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto rounded-2xl bg-gradient-to-b from-gray-800/90 to-gray-900/90 p-8 border border-gray-700/50 backdrop-blur-sm shadow-xl"
        >
          <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={() => setTokenType('alf')}
              className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                tokenType === 'alf' 
                  ? 'bg-gradient-to-r from-green-500/20 to-green-400/20 border-green-500/30 text-green-400' 
                  : 'bg-gray-800/50 text-gray-400 border-gray-700/50'
              } border hover:border-green-500/30`}
            >
              Wrapped ALF
            </button>
            <button 
              onClick={() => setTokenType('wang')}
              className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                tokenType === 'wang' 
                  ? 'bg-gradient-to-r from-green-500/20 to-green-400/20 border-green-500/30 text-green-400' 
                  : 'bg-gray-800/50 text-gray-400 border-gray-700/50'
              } border hover:border-green-500/30`}
            >
              Wrapped WANG
            </button>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Wrapped {tokenType.toUpperCase()} Protocol
            </h1>

            <div className="space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-200 flex items-center gap-2">
                  <AiOutlineSwap className="text-green-400" />
                  Mint Wrapped {tokenType.toUpperCase()}
                </h2>
                <form onSubmit={handleMintWrapped} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Original {tokenType.toUpperCase()} Amount
                    </label>
                    <input
                      type="text"
                      value={amountOgToken}
                      onChange={(e) => setAmountOgToken(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800/50 text-gray-200 border border-gray-700/50 
                        focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent 
                        placeholder-gray-500 transition-all"
                      placeholder="Enter amount"
                    />
                    {predictedWrappedAmount > 0 && (
                      <p className="text-sm text-gray-400">
                        You will receive: {tokenType === 'alf' 
                          ? predictedWrappedAmount.toLocaleString('fullwide', {useGrouping: false})
                          : predictedWrappedAmount} Wrapped {tokenType.toUpperCase()}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full px-6 py-3 rounded-xl bg-gradient-to-r from-green-500/10 via-green-500/20 to-green-400/10 
                      hover:from-green-500/20 hover:via-green-500/30 hover:to-green-400/20 
                      border border-green-500/20 hover:border-green-500/30 
                      transition-all duration-300 ease-out
                      text-green-400 hover:text-green-300
                      flex items-center justify-center gap-2
                      ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <BsArrowDownUp className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
                    {isProcessing ? 'Processing...' : 'Mint Wrapped Token'}
                  </button>
                </form>
              </section>

              <div className="border-t border-gray-700/50"></div>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-200 flex items-center gap-2">
                  <AiOutlineSwap className="text-green-400" />
                  Mint Original {tokenType.toUpperCase()}
                </h2>
                <form onSubmit={handleMintOriginal} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Wrapped {tokenType.toUpperCase()} Amount
                    </label>
                    <input
                      type="text"
                      value={amountWrappedToken}
                      onChange={(e) => setAmountWrappedToken(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800/50 text-gray-200 border border-gray-700/50 
                        focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent 
                        placeholder-gray-500 transition-all"
                      placeholder="Enter amount"
                    />
                    {predictedOgAmount > 0 && (
                      <p className="text-sm text-gray-400">
                        You will receive: {tokenType === 'alf'
                          ? predictedOgAmount.toFixed(18)
                          : predictedOgAmount} Original {tokenType.toUpperCase()}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full px-6 py-3 rounded-xl bg-gradient-to-r from-green-500/10 via-green-500/20 to-green-400/10 
                      hover:from-green-500/20 hover:via-green-500/30 hover:to-green-400/20 
                      border border-green-500/20 hover:border-green-500/30 
                      transition-all duration-300 ease-out
                      text-green-400 hover:text-green-300
                      flex items-center justify-center gap-2
                      ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <BsArrowDownUp className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
                    {isProcessing ? 'Processing...' : 'Mint Original Token'}
                  </button>
                </form>
              </section>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-red-400 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Connect your wallet on a group 0 address
        </motion.div>
      )}
    </div>
  )
} 