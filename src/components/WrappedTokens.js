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
  const { signer, account } = useWallet()
  const [tokenType, setTokenType] = useState('alf')
  const [amountOgToken, setAmountOgToken] = useState("")
  const [amountWrappedToken, setAmountWrappedToken] = useState("")
  const [predictedWrappedAmount, setPredictedWrappedAmount] = useState(0)
  const [predictedOgAmount, setPredictedOgAmount] = useState(0)
  const [txStatus, setTxStatus] = useState("")

  useEffect(() => {
    if (amountOgToken) {
      const multiplier = tokenType === 'alf' ? 1000000000000000000 : 100000
      setPredictedWrappedAmount(Number(amountOgToken) * multiplier)
    } else {
      setPredictedWrappedAmount(0)
    }
  }, [amountOgToken, tokenType])

  useEffect(() => {
    if (amountWrappedToken) {
      const divisor = tokenType === 'alf' ? 1000000000000000000 : 10000
      setPredictedOgAmount(Number(amountWrappedToken) / divisor)
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

  const FormSection = ({ type, amount, setAmount, predictedAmount, handleSubmit }) => (
    <motion.section 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold text-gray-200">
        Mint {type} {tokenType.toUpperCase()}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            {type === 'Wrapped' ? 'Original' : 'Wrapped'} {tokenType.toUpperCase()} Amount
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-gray-200 shadow-neumorphDark-inset focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter amount"
          />
          {predictedAmount > 0 && (
            <motion.p 
              className="text-sm text-gray-400"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              You will receive: {predictedAmount} {type} {tokenType.toUpperCase()}
            </motion.p>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full px-6 py-3 rounded-xl bg-gray-800 text-green-500 shadow-neumorphDark hover:shadow-neumorphDark-inset transition-all duration-300"
        >
          Mint {type} Token
        </motion.button>
      </form>
    </motion.section>
  )

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
    const newDirection = type === 'alf' ? -1 : 1;
    const newPage = type === 'alf' ? 0 : 1;
    setPage([newPage, newDirection]);
    setTokenType(type);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-20 px-4">
      <AnimatePresence>
        <StatusMessage />
      </AnimatePresence>
      
      <motion.div 
        className="max-w-md mx-auto rounded-2xl bg-gray-800 p-8 shadow-neumorphDark overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center gap-4 mb-8">
          <motion.button 
            onClick={() => handleTokenTypeChange('alf')}
            whileHover={{ 
              backgroundColor: tokenType === 'alf' ? '#22c55e' : '#374151',
              transition: { duration: 0.2 }
            }}
            animate={{ 
              backgroundColor: tokenType === 'alf' ? '#22c55e' : '#1f2937',
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            className={`px-6 py-3 rounded-xl transition-colors duration-200 ${
              tokenType === 'alf' ? 'text-white' : 'text-gray-300 shadow-neumorphDark'
            }`}
          >
            Wrapped ALF
          </motion.button>
          <motion.button 
            onClick={() => handleTokenTypeChange('wang')}
            whileHover={{ 
              backgroundColor: tokenType === 'wang' ? '#22c55e' : '#374151',
              transition: { duration: 0.2 }
            }}
            animate={{ 
              backgroundColor: tokenType === 'wang' ? '#22c55e' : '#1f2937',
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            className={`px-6 py-3 rounded-xl transition-colors duration-200 ${
              tokenType === 'wang' ? 'text-white' : 'text-gray-300 shadow-neumorphDark'
            }`}
          >
            Wrapped WANG
          </motion.button>
        </div>

        <motion.h1 
          className="text-3xl font-bold text-center mb-8 text-green-500"
          layout
        >
          Wrapped {tokenType.toUpperCase()} Protocol
        </motion.h1>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={tokenType}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              enter: { duration: 0.2 },
              exit: { duration: 0.3 },
              x: { type: "spring", stiffness: 300, damping: 30 }
            }}
            className="space-y-8"
          >
            <FormSection 
              type="Wrapped"
              amount={amountOgToken}
              setAmount={setAmountOgToken}
              predictedAmount={predictedWrappedAmount}
              handleSubmit={handleMintWrapped}
            />

            <FormSection 
              type="Original"
              amount={amountWrappedToken}
              setAmount={setAmountWrappedToken}
              predictedAmount={predictedOgAmount}
              handleSubmit={handleMintOriginal}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
} 