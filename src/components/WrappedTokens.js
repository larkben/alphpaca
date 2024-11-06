"use client";
import React, { useState, useEffect } from 'react'
import { useWallet } from "@alephium/web3-react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ServiceMintWrappedAlf, 
  ServiceMintOgAlf, 
  ServiceMintWrappedWang, 
  ServiceMintWang 
} from "../services/token.services"
import { waitTxConfirmed } from '../lib/utils'

export const WrappedTokens = ({ config }) => {
  const { signer } = useWallet()
  const [tokenType, setTokenType] = useState('alf')
  const [amountOgToken, setAmountOgToken] = useState("")
  const [amountWrappedToken, setAmountWrappedToken] = useState("")
  const [predictedWrappedAmount, setPredictedWrappedAmount] = useState(0)
  const [predictedOgAmount, setPredictedOgAmount] = useState(0)
  const [txStatus, setTxStatus] = useState("")

  useEffect(() => {
    if (amountOgToken) {
      const multiplier = tokenType === 'alf' ? 1000000000000000000 : 10000
      const amount = Number(amountOgToken) * multiplier
      setPredictedWrappedAmount(tokenType === 'alf' 
        ? amount.toLocaleString('fullwide', {useGrouping:false}) 
        : Number(amountOgToken))
    } else {
      setPredictedWrappedAmount(0)
    }
  }, [amountOgToken, tokenType])

  useEffect(() => {
    if (amountWrappedToken) {
      const divisor = tokenType === 'alf' ? 1000000000000000000 : 10000
      const amount = Number(amountWrappedToken) / divisor
      setPredictedOgAmount(tokenType === 'alf' 
        ? amount.toFixed(18)
        : Number(amountWrappedToken))
    } else {
      setPredictedOgAmount(0)
    }
  }, [amountWrappedToken, tokenType])

  const handleMintWrapped = async (e) => {
    e.preventDefault()
    if (signer) {
      try {
        setTxStatus("signing")
        const service = tokenType === 'alf' ? ServiceMintWrappedAlf : ServiceMintWrappedWang
        const result = await service(signer, amountOgToken)
        setTxStatus("processing")
        await waitTxConfirmed(result.txId)
        setTxStatus("completed")
        setTimeout(() => setTxStatus(""), 3000)
      } catch (error) {
        setTxStatus("error")
        setTimeout(() => setTxStatus(""), 3000)
        console.error('Error:', error)
      }
    }
  }

  const handleMintOriginal = async (e) => {
    e.preventDefault()
    if (signer) {
      try {
        setTxStatus("signing")
        const service = tokenType === 'alf' ? ServiceMintOgAlf : ServiceMintWang
        const result = await service(signer, amountWrappedToken)
        setTxStatus("processing")
        await waitTxConfirmed(result.txId)
        setTxStatus("completed")
        setTimeout(() => setTxStatus(""), 3000)
      } catch (error) {
        setTxStatus("error")
        setTimeout(() => setTxStatus(""), 3000)
        console.error('Error:', error)
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`fixed top-4 right-4 p-4 rounded-lg bg-gray-800 shadow-lg ${colors[txStatus]}`}
      >
        {messages[txStatus]}
      </motion.div>
    )
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const [[page, direction], setPage] = useState([0, 0]);

  const handleTokenTypeChange = (type) => {
    if (type !== tokenType) {
      const newDirection = type === 'alf' ? -1 : 1;
      const newPage = type === 'alf' ? 0 : 1;
      setPage([newPage, newDirection]);
      setTokenType(type);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-20 px-4">
      <AnimatePresence mode="wait">
        <StatusMessage />
      </AnimatePresence>
      
      <div className="max-w-md mx-auto rounded-2xl bg-gray-800 p-8 shadow-neumorphDark overflow-hidden">
        <div className="flex justify-center gap-4 mb-8">
          <button 
            onClick={() => handleTokenTypeChange('alf')}
            className={`px-6 py-3 rounded-xl transition-colors duration-200 ${
              tokenType === 'alf' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-700 text-gray-300 shadow-neumorphDark'
            }`}
          >
            Wrapped ALF
          </button>
          <button 
            onClick={() => handleTokenTypeChange('wang')}
            className={`px-6 py-3 rounded-xl transition-colors duration-200 ${
              tokenType === 'wang' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-700 text-gray-300 shadow-neumorphDark'
            }`}
          >
            Wrapped WANG
          </button>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tokenType}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={tokenType === 'wang' ? 1 : -1}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            <h1 className="text-3xl font-bold text-center mb-8 text-green-500">
              Wrapped {tokenType.toUpperCase()} Protocol
            </h1>

            <div className="space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-200">
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
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 text-gray-200 shadow-neumorphDark-inset focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter amount"
                    />
                    {predictedWrappedAmount > 0 && (
                      <p className="text-sm text-gray-400">
                        You will receive: {predictedWrappedAmount} Wrapped {tokenType.toUpperCase()}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-xl bg-gray-800 text-green-500 shadow-neumorphDark hover:shadow-neumorphDark-inset transition-all duration-300"
                  >
                    Mint Wrapped Token
                  </button>
                </form>
              </section>
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-200">
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
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 text-gray-200 shadow-neumorphDark-inset focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter amount"
                    />
                    {predictedOgAmount > 0 && (
                      <p className="text-sm text-gray-400">
                        You will receive: {predictedOgAmount} Original {tokenType.toUpperCase()}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-xl bg-gray-800 text-green-500 shadow-neumorphDark hover:shadow-neumorphDark-inset transition-all duration-300"
                  >
                    Mint Original Token
                  </button>
                </form>
              </section>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
} 