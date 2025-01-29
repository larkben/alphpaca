'use client'

import { Navbar } from '../../components/navbar'
import { Footer } from '../../components/footer'
import LoanCard from '../../components/LoanCard'
import { useState } from 'react'
import CreateLoanModal from '../../components/CreateLoanModal'
import { motion } from 'framer-motion'

export default function LoanPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  
  const loans = [
    {
      value: 1400,
      currency: 'USDT',
      collateralAmount: 26615.169,
      collateralCurrency: 'WBNB',
      term: 12,
      interest: 35,
      lender: 'EXAMPLE',
      borrower: 'EXAMPLE',
      status: 'active'
    },
    {
      value: 1000,
      currency: 'ALPH',
      collateralAmount: 4000,
      collateralCurrency: 'ALPH',
      term: 18,
      interest: 70,
      lender: 'EXAMPLE',
      borrower: 'EXAMPLE',
      status: 'pending'
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black">
      <Navbar />
      
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12 flex-grow"
      >
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex justify-between items-center"
        >
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold text-white mb-4"
            >
              Loan Market
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-400 text-lg"
            >
              Browse available loans and lending opportunities
            </motion.p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="group relative px-8 py-3 rounded-xl bg-gradient-to-r from-green-500/10 via-green-500/20 to-green-400/10 
            hover:from-green-500/20 hover:via-green-500/30 hover:to-green-400/20 
            border border-green-500/20 hover:border-green-500/30 
            transition-all duration-300 ease-out
            text-green-400 hover:text-green-300 font-medium 
            shadow-lg shadow-green-900/20 hover:shadow-green-900/30
            flex items-center gap-3"
          >
            <span className="relative">
              <span className="block w-2 h-2 rounded-full bg-green-400 group-hover:animate-ping absolute -left-4 top-1/2 -translate-y-1/2"></span>
              <span className="block w-2 h-2 rounded-full bg-green-400 absolute -left-4 top-1/2 -translate-y-1/2"></span>
              Create Loan
            </span>
            <svg 
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4v16m8-8H4" 
              />
            </svg>
          </button>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            { label: 'Total Value Locked', value: '$4.2M' },
            { label: 'Active Loans', value: '156' },
            { label: 'Average APR', value: '12.5%' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800/50 rounded-xl p-6 text-center backdrop-blur-sm border border-gray-700/50"
            >
              <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          {['All Loans', 'Active', 'Pending', 'High APR', 'Low Risk'].map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.toLowerCase())}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all
                ${activeFilter === filter.toLowerCase()
                  ? 'bg-green-500/20 text-green-400 border border-green-500/20'
                  : 'bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:border-gray-600/50'
                }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {loans.map((loan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <LoanCard {...loan} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <nav className="flex gap-2">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 text-sm bg-gray-800/50 text-white rounded-full border border-gray-700/50 hover:border-gray-600/50 transition-all"
            >
              Previous
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 text-sm bg-gray-800/50 text-white rounded-full border border-gray-700/50 hover:border-gray-600/50 transition-all"
            >
              Next
            </motion.button>
          </nav>
        </motion.div>

        <CreateLoanModal 
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </motion.main>

      <Footer />
    </div>
  )
}
