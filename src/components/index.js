import Link from "next/link"
import { AlephiumConnectButton, AlephiumWalletProvider } from '@alephium/web3-react'
import { Terminal } from "./terminal"
import React from "react"
import { Map } from "./Map"

export function Hero() {
  return (
    <div className="bg-gray-800">
      <main className="flex flex-col items-center justify-center h-full py-20 bg-gray-800 text-white">
        <h1 className="text-6xl font-bold text-white animate-bounce">Welcome to ALPHpaca</h1>
        <p className="mt-4 text-lg text-gray-300">A project built and developed on and for Alephium.</p>
      </main>
      <h1 className="text-4xl font-bold text-center mb-8 text-white"> Explore Decentralized Applications / Tools </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-20 py-20">
        <div className="rounded-lg overflow-hidden shadow-lg bg-orange-500 z-50 p-4">
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <CoinsIcon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-white"> Token Creation </h2>
              <p className="text-white-400"> Create a token on the Alephium Blockchain. </p>
              <Link
                className="mt-2 inline-flex items-center justify-center px-3 py-1 border border-gray-200 border-transparent text-sm font-medium rounded-md text-black bg-orange-300 hover:bg-orange-400 dark:border-gray-800"
                href="/tokencreate"
              >
                Create Now
              </Link>
            </div>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg bg-pink-500 z-50 p-4">
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <ClockIcon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-white"> On-Chain Gaming </h2>
              <p className="text-white-400"> Coming Soon! </p>
              <Link
                className="mt-2 inline-flex items-center justify-center px-3 py-1 border border-gray-200 border-transparent text-sm font-medium rounded-md text-black bg-pink-300 hover:bg-pink-400 dark:border-gray-800"
                href="#"
              >
                Soon!
              </Link>
            </div>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg bg-blue-800 z-50 p-4">
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users2Icon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-white"> Blockchain Eagle </h2>
              <p className="text-white-400"> An alpacas worst nightmare come to life. Coming Soon! </p>
              <Link
                className="mt-2 inline-flex items-center justify-center px-3 py-1 border border-gray-200 border-transparent text-sm font-medium rounded-md text-black bg-blue-300 hover:bg-blue-400 dark:border-gray-800"
                href="#"
              >
                Soon!
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Map/>
      <section className="flex flex-col items-center justify-center py-20 bg-gray-700 text-white">
      <h1 className="text-4xl font-bold text-center mb-8 text-white"> A little about ALPHpaca ... </h1>
        <div className="w-1/2 md:w-1/3 lg:w-1/4 p-6 bg-gray-800 rounded-lg shadow-lg mb-6">
          <Terminal/>
        </div>
        <div className="w-3/4 md:w-1/2 lg:w-1/3 p-6 bg-gray-800 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-2">So what is ALPHpaca</h2>
          <p className="text-gray-300">
            ALPHpaca is a project built to accompany the beginner or advanced user through the world of Alephium, through great tools and better dapps.
          </p>
        </div>
        <div className="w-3/4 md:w-1/2 lg:w-1/3 p-6 bg-gray-800 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-2">Who am I?</h2>
          <p className="text-gray-300">
            I am a first generation blockchain smart contract developer, my background is in CS, more specifically Software Development. I have a growing passion to make crypto easier and more fun.
          </p>
        </div>
      </section>
    </div>
  )
}

function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

function CoinsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  )
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function Users2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 19a6 6 0 0 0-12 0" />
      <circle cx="8" cy="9" r="4" />
      <path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8" />
    </svg>
  )
}