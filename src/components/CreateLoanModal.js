'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CustomTokenSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative min-w-[140px]">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 bg-gray-900/50 border border-gray-700 rounded-xl 
        px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50"
      >
        <img 
          src={`/tokens/${value.toUpperCase()}.png`}
          alt={value}
          className="w-6 h-6 rounded-full"
        />
        <span>{value}</span>
        <svg 
          className="w-5 h-5 text-gray-400 ml-auto" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-gray-900 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
          {options.map(token => (
            <button
              key={token}
              type="button"
              onClick={() => {
                onChange({ target: { value: token } })
                setIsOpen(false)
              }}
              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-800 text-white text-left"
            >
              <img 
                src={`/tokens/${token.toUpperCase()}.png`}
                alt={token}
                className="w-6 h-6 rounded-full"
              />
              <span>{token}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const CreateLoanModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const [loanToken, setLoanToken] = useState('USDT')
  const [collateralToken, setCollateralToken] = useState('ALPH')
  const [loanAmount, setLoanAmount] = useState('')
  const [collateralAmount, setCollateralAmount] = useState('')
  const [enableLiquidation, setEnableLiquidation] = useState(false)
  
  const tokens = ['USDT', 'ALPH', 'WBNB']

  const calculateRiskRatio = () => {
    if (!loanAmount || !collateralAmount) return 0
    return (parseFloat(collateralAmount) / parseFloat(loanAmount)) * 100
  }

  const getRiskLevel = (ratio) => {
    if (ratio === 0) return 'none'
    if (ratio < 150) return 'liquidation'
    if (ratio < 200) return 'high'
    if (ratio < 300) return 'aggressive'
    if (ratio < 400) return 'moderate'
    return 'conservative'
  }

  const riskRatio = calculateRiskRatio()
  const riskLevel = getRiskLevel(riskRatio)

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={handleOverlayClick}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ 
              scale: 0.95, 
              opacity: 0, 
              y: -20,
              transition: { duration: 0.15 }
            }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl max-w-2xl w-full mx-4 overflow-hidden border border-gray-700/50"
          >
            <div className="border-b border-gray-700/50 p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-white">Create New Loan</h3>
                <button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700/30 p-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Loan Amount
                  </label>
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white 
                        focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50
                        placeholder-gray-500 transition-all duration-200
                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="0.00"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                    </div>
                    <CustomTokenSelect 
                      value={loanToken}
                      onChange={(e) => setLoanToken(e.target.value)}
                      options={tokens}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Collateral
                  </label>
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <input
                        type="number"
                        value={collateralAmount}
                        onChange={(e) => setCollateralAmount(e.target.value)}
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white 
                        focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50
                        placeholder-gray-500 transition-all duration-200
                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="0.00"
                      />
                    </div>
                    <CustomTokenSelect 
                      value={collateralToken}
                      onChange={(e) => setCollateralToken(e.target.value)}
                      options={tokens}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Term (months)
                    </label>
                    <input
                      type="number"
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white 
                      focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50
                      placeholder-gray-500 transition-all duration-200
                      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white 
                      focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50
                      placeholder-gray-500 transition-all duration-200
                      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="5"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <label className="relative flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="enableLiquidation"
                      checked={enableLiquidation}
                      onChange={(e) => setEnableLiquidation(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-800 border border-gray-700 rounded-full peer 
                      peer-checked:after:translate-x-full peer-checked:after:border-white 
                      after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                      after:bg-gray-400 after:border after:rounded-full after:h-5 after:w-5 
                      after:transition-all peer-checked:bg-green-500/20 peer-checked:border-green-500/50
                      peer-checked:after:bg-green-500"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-300">
                      Enable Liquidation
                    </span>
                  </label>

                  <AnimatePresence mode="wait">
                    {enableLiquidation && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: 1, 
                          height: 'auto',
                          transition: {
                            height: {
                              duration: 0.3
                            },
                            opacity: {
                              duration: 0.2,
                              delay: 0.1
                            }
                          }
                        }}
                        exit={{ 
                          opacity: 0,
                          height: 0,
                          transition: {
                            height: {
                              duration: 0.2
                            },
                            opacity: {
                              duration: 0.1
                            }
                          }
                        }}
                        className="space-y-3 p-4 bg-gray-900/50 rounded-xl border border-gray-800"
                      >
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Risk Level</span>
                          <motion.span 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`font-medium ${
                              riskLevel === 'conservative' ? 'text-green-500' :
                              riskLevel === 'moderate' ? 'text-yellow-500' :
                              riskLevel === 'aggressive' ? 'text-orange-500' :
                              riskLevel === 'high' ? 'text-red-500' :
                              riskLevel === 'liquidation' ? 'text-red-600' : 'text-gray-500'
                            }`}
                          >
                            {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
                          </motion.span>
                        </div>
                        
                        <div className="relative">
                          <div className="absolute inset-0 flex">
                            <div className="w-[30%] h-full border-r border-gray-700/50"></div>
                            <div className="w-[20%] h-full border-r border-gray-700/50"></div>
                            <div className="w-[20%] h-full border-r border-gray-700/50"></div>
                            <div className="w-[30%] h-full"></div>
                          </div>

                          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ 
                                width: `${Math.min(100, (riskRatio / 500) * 100)}%`,
                                transition: { duration: 0.5, ease: "easeOut" }
                              }}
                              className={`h-full transition-all duration-300 ${
                                riskLevel === 'conservative' ? 'bg-gradient-to-r from-green-500 to-green-400' :
                                riskLevel === 'moderate' ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                                riskLevel === 'aggressive' ? 'bg-gradient-to-r from-orange-500 to-orange-400' :
                                riskLevel === 'high' ? 'bg-gradient-to-r from-red-500 to-red-400' :
                                riskLevel === 'liquidation' ? 'bg-gradient-to-r from-red-700 to-red-600' : 'bg-gray-600'
                              }`}
                            />
                          </div>

                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex justify-between text-xs mt-1 px-1"
                          >
                            <span className="text-red-500">150%</span>
                            <span className="text-orange-500">200%</span>
                            <span className="text-yellow-500">300%</span>
                            <span className="text-green-500">400%+</span>
                          </motion.div>
                        </div>

                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="flex items-center space-x-2 mt-2"
                        >
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-xs text-gray-400">
                            Minimum collateral ratio: 150%. Lower ratios risk liquidation.
                          </span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-green-500/20 via-green-500/30 to-green-400/20 
                    hover:from-green-500/30 hover:via-green-500/40 hover:to-green-400/30
                    border border-green-500/20 hover:border-green-500/30 
                    transition-all duration-300 ease-out
                    text-green-400 hover:text-green-300 font-medium 
                    shadow-lg shadow-green-900/20 hover:shadow-green-900/30
                    flex items-center justify-center gap-2"
                  >
                    <span>Create Loan Request</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CreateLoanModal