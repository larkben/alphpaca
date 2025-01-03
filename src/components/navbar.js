"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AlephiumConnectButton, useBalance, useWallet } from '@alephium/web3-react';
import { AiOutlineCopy, AiOutlineUser } from "react-icons/ai";
import { PiWalletBold } from "react-icons/pi";
import { LiaSignOutAltSolid } from 'react-icons/lia';
import { ANS } from '@alph-name-service/ans-sdk';
import { balanceOf } from "../lib/utils";

export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
  const wallet = useWallet();
  const { balance } = useBalance();
  const [ansName, setAnsName] = useState('');
  const [ansUri, setAnsUri] = useState('');
  const [pacaBalance, setPacaBalance] = useState(0);

  useEffect(() => {
    if (wallet?.account?.address) {
        const getProfile = async () => {
          const ans = new ANS('mainnet');
          const testProfile = await ans.getProfile(wallet?.account?.address);
          if (testProfile?.name) {
              setAnsName(testProfile.name);
          }
          if (testProfile?.imgUri) {
              setAnsUri(testProfile.imgUri);
          }
        };
      getProfile();
      
      const fetchPacaBalance = async () => {
        const pacaTokenId = "b2d71c116408ae47b931482a440f675dc9ea64453db24ee931dacd578cae9002";
        const balance = await balanceOf(pacaTokenId, wallet.account?.address);
        setPacaBalance(balance);
      };
      fetchPacaBalance();
      }
}, [wallet?.account?.address]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleWalletDropdown = () => setIsWalletDropdownOpen(!isWalletDropdownOpen);

  const shortenHash = (address, charsAmount = 6) => {
    return `${address.substring(0, charsAmount)}...${address.substring(address.length - charsAmount)}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-gray-800">
      <header className="flex items-center justify-between bg-gray-800 px-6 py-4 text-white">
        <Link className="z-50 flex items-center space-x-2" href="/">
          <span className="text-lg font-semibold text-white">ALPHpaca</span>
        </Link>
        <nav className="z-50 hidden space-x-4 md:flex">
          <Link className="text-white hover:text-green-500" href="/">Home</Link>
          <Link className="text-white hover:text-green-500" href="/tokencreate">Token Creation</Link>
          <div className="relative">
            <button
              className="text-white hover:text-green-500 focus:outline-none"
              onClick={toggleDropdown}
            >
              ALPHpaca
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 rounded-lg shadow-lg z-50">
                <Link className="block px-4 py-2 text-white hover:text-green-500" href="/migrate">Migrate ALPHpaca</Link>
                <Link className="block px-4 py-2 text-white hover:text-green-500" href="/profile">Profile</Link>
                <Link className="block px-4 py-2 text-white hover:text-green-500" href="/battle">Coming Soon!</Link>
              </div>
            )}
          </div>
          <Link className="text-white hover:text-green-500" href="/warpper">Wrapped Tokens Protocol</Link>
        </nav>
        <div className="z-50 flex items-center space-x-2">
          <Link className="text-white hover:text-green-500" href="https://twitter.com/alphpacas">
            <TwitterIcon className="h-6 w-6" />
          </Link>
          <Link className="text-white hover:text-green-500" href="https://github.com/larkben/nonchalant">
            &lt;/&gt;
          </Link>
          <AlephiumConnectButton.Custom>
            {({ isConnected, disconnect, show, account }) => {
              const bal = balance?.balance ?? "0";
              return isConnected ? (
                <div className="relative">
                  <button onClick={toggleWalletDropdown} className="text-white hover:text-green-500 focus:outline-none p-2">
                  {ansUri ? (
                    <img src={ansUri}  width={38} height={38} className="rounded-full w-10 h-w-10 shadow dark:shadow-gray-700" alt=""  />
                  ) : (
                    <AiOutlineUser className="w-8 h-8" />
                  )}
                  </button>
                  {isWalletDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded overflow-hidden bg-slate-800/80 shadow shadow-gray-600">
                      <div className="relative">
                      <div className="py-8 bg-gradient-to-tr from-green-300 to-cyan-400"></div>
                        <div className="absolute px-4 -bottom-3 start-0">
                          <div className="flex items-end">
                            {ansUri ? (
                              <img src={ansUri}  width={38} height={38} className="rounded-full w-10 h-w-10 shadow dark:shadow-gray-700" alt=""  />
                            ) : (
                              <AiOutlineUser className="w-8 h-8" />
                            )}

                            <span className="font-semibold text-[15px] ms-1">{ansName || "No Name"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h5 className="font-semibold text-[15px]">Wallet:</h5>
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-slate-400">{shortenHash(wallet?.account?.address)}</span>
                          <button onClick={() => copyToClipboard(walletAddress)} className="text-green-500"><AiOutlineCopy/></button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h5 className="text-[15px]">Balance: <span className="text-green-500 font-semibold">{(parseFloat(bal) / 1e18).toFixed(2)} $ALPH</span></h5>
                        <h5 className="text-[15px]">PACA: <span className="text-green-500 font-semibold">{(parseFloat(pacaBalance) / 1e18).toFixed(2)} $PACA</span></h5>
                      </div>
                      <div className="border-t border-gray-100 dark:border-gray-800"></div>
                      <button onClick={disconnect} className="w-full text-left px-4 py-2 text-[14px] font-semibold hover:text-green-500">
                        <LiaSignOutAltSolid className="inline mr-1"/> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={show} id="connectWallet" className="text-white hover:text-green-500 focus:outline-none p-2">
                  <PiWalletBold className="w-8 h-8" />
                </button>
              )
            }}
          </AlephiumConnectButton.Custom>
        </div>
      </header>
    </div>
  );
}

function TwitterIcon(props) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}