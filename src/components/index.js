"use client"

import Link from "next/link"
import React from "react"
import Map from "./Map"
import Terminal from "./terminal"
import { motion } from "framer-motion"
import { FaCoins, FaGamepad } from 'react-icons/fa'
import { PiHandCoins } from "react-icons/pi";


export function Hero() {
  const features = [
    {
      title: "Token Creation",
      description: "Create a token on the Alephium Blockchain.",
      icon: <FaCoins className="h-8 w-8 text-white" />,
      href: "/tokencreate",
      color: "from-orange-500/90 to-orange-600/90",
      hoverColor: "hover:from-orange-500 hover:to-orange-600",
      buttonColor: "bg-orange-300 hover:bg-orange-400"
    },
    {
      title: "On-Chain Gaming",
      description: "Coming Soon!",
      icon: <FaGamepad className="h-8 w-8 text-white" />,
      href: "#",
      color: "from-pink-500/90 to-pink-600/90",
      hoverColor: "hover:from-pink-500 hover:to-pink-600",
      buttonColor: "bg-pink-300 hover:bg-pink-400"
    },
    {
      title: "AlpacaFi",
      description: "An alpaca's worst nightmare come to life.",
      icon: <PiHandCoins className="h-8 w-8 text-white" />,
      href: "#",
      color: "from-blue-800/90 to-blue-900/90",
      hoverColor: "hover:from-blue-800 hover:to-blue-900",
      buttonColor: "bg-blue-300 hover:bg-blue-400"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pb-32"
      >
        <section className="py-20 text-center">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"
          >
            Welcome to ALPHpaca
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-xl text-gray-400"
          >
            A project built and developed on and for Alephium.
          </motion.p>
        </section>

        <section className="py-12">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Explore Decentralized Applications / Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl overflow-hidden shadow-lg bg-gradient-to-br ${feature.color} 
                  backdrop-blur-sm border border-gray-700/50 transition-all duration-300 
                  ${feature.hoverColor} hover:shadow-xl hover:-translate-y-1`}
              >
                <div className="p-6">
                  <div className="flex justify-center items-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-center text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-200 text-center mb-4">
                    {feature.description}
                  </p>
                  <div className="flex justify-center">
                    <Link
                      href={feature.href}
                      className={`px-6 py-2 rounded-xl text-black font-medium 
                        ${feature.buttonColor} transition-colors duration-300
                        hover:shadow-lg`}
                    >
                      {feature.title === "On-Chain Gaming" || feature.title === "AlpacaFi" 
                        ? "Coming Soon!" 
                        : "Get Started"}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-12">
          <Map/>
        </section>

        <section className="py-20 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm mb-8">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              A little about ALPHpaca ...
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="col-span-1"
              >
                <div className="bg-gray-900/50 rounded-xl p-6 h-full border border-gray-700/50">
                  <Terminal/>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="col-span-1"
              >
                <div className="bg-gray-900/50 rounded-xl p-6 h-full border border-gray-700/50">
                  <h3 className="text-2xl font-bold mb-4 text-green-400">So what is ALPHpaca</h3>
                  <p className="text-gray-300 leading-relaxed">
                    ALPHpaca is a project built to accompany the beginner or advanced user through the world of Alephium, 
                    through great tools and better dapps.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="col-span-1"
              >
                <div className="bg-gray-900/50 rounded-xl p-6 h-full border border-gray-700/50">
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Who am I?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    I am a first generation blockchain smart contract developer, my background is in CS, 
                    more specifically Software Development. I have a growing passion to make crypto easier and more fun.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </motion.main>
    </div>
  )
}