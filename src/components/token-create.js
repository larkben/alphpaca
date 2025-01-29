"use client";
import { Input } from "./ui/input"
import { Button } from "./ui/button";
import React, { useState } from 'react'
import { useWallet } from "@alephium/web3-react"
import { BuildToken } from "../services/token.services"
import TokenList from "./createdtokens"
import { motion } from "framer-motion";

export const TokenCreateAutomation = ({ config }) => {
  const { signer } = useWallet()

  const [symbol, setSymbol] = useState("")
  const [name, setName] = useState("")
  const [decimals, setDecimals] = useState('')
  const [supply, setSupply] = useState('')

  const supplyWithDecimals = Number(`${supply}e-${decimals}`);

  const handleTokenCreate = async (e) => {
    e.preventDefault()
    if (signer) {
      const result = await BuildToken(signer, symbol, name, decimals, supply)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-20 bg-gradient-to-b from-gray-900 to-black">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl mx-auto px-4"
      >
        <div className="space-y-8 bg-gradient-to-b from-gray-800/90 to-gray-900/90 p-8 rounded-xl border border-gray-700/50 backdrop-blur-sm shadow-xl">
          <div>
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Create Your Token
            </h2>
            <p className="mt-4 text-center text-gray-400 text-sm">
              Please fill in the details of your token. All tokens are final and immutable.
              <br/>
              <span className="text-green-400 font-medium">10 ALPH</span> will be taken as deposit:
              <br/>
              9 ALPH for service and 1 ALPH for blockchain storage requirements.
            </p>

            <div className="mt-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
              <h3 className="text-lg font-medium text-white text-center mb-4">Token Preview</h3>
              <div className="space-y-2">
                <p className="text-gray-300 text-center">
                  Token: <span className="text-green-400 font-medium">{name || "---"}</span>
                  {symbol && <span className="text-gray-400 ml-2">({symbol})</span>}
                </p>
                <p className="text-gray-300 text-center">
                  Supply with Decimals: <span className="text-green-400 font-medium">{supplyWithDecimals || "0"}</span>
                </p>
                <p className="text-gray-300 text-center">
                  Supply without Decimals: <span className="text-green-400 font-medium">{supply || "0"}</span>
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleTokenCreate} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="symbol">
                  Symbol
                </label>
                <Input
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all"
                  id="symbol"
                  name="symbol"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  required
                  type="text"
                  placeholder="e.g. BTC"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="name">
                  Name
                </label>
                <Input
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  type="text"
                  placeholder="e.g. Bitcoin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="decimals">
                  Decimals
                </label>
                <Input
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all"
                  id="decimals"
                  max="18"
                  min="0"
                  name="decimals"
                  value={decimals}
                  onChange={(e) => setDecimals(e.target.value)}
                  required
                  type="number"
                  placeholder="e.g. 18"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="supply">
                  Supply
                </label>
                <Input
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all"
                  id="supply"
                  min="0"
                  name="supply"
                  value={supply}
                  onChange={(e) => setSupply(e.target.value)}
                  required
                  type="number"
                  placeholder="e.g. 21000000"
                />
              </div>
            </div>

            <Button
              className="w-full px-4 py-3 bg-gradient-to-r from-green-500/10 via-green-500/20 to-green-400/10 
                hover:from-green-500/20 hover:via-green-500/30 hover:to-green-400/20 
                border border-green-500/20 hover:border-green-500/30 
                transition-all duration-300 ease-out
                text-green-400 hover:text-green-300 rounded-xl font-medium"
              type="submit"
            >
              Create Token
            </Button>
          </form>

          <div className="pt-8 border-t border-gray-700/50">
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-6">
              Created Tokens
            </h2>
            <TokenList/>
          </div>
        </div>
      </motion.div>
    </main>
  )
}