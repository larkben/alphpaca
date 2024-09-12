"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AlephiumConnectButton, useBalance, useWallet } from '@alephium/web3-react';
import { ANS } from '@alph-name-service/ans-sdk';
import { AiOutlineCopy, AiOutlineUser } from "react-icons/ai";
import { PiWalletBold } from "react-icons/pi";
import { LiaSignOutAltSolid } from 'react-icons/lia';
import { balanceOf } from "../lib/utils";

export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
  const wallet = useWallet();
  const { balance } = useBalance();
  const [ansName, setAnsName] = useState('');
  const [ansUri, setAnsUri] = useState('');
  const [pacaBalance, setPacaBalance] = useState<BigInt>();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const walletDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wallet?.account?.address) {
      const getProfile = async () => {
        const ans = new ANS('mainnet');
        const testProfile = await ans.getProfile(wallet.account?.address || "");
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
        const balance = await balanceOf(pacaTokenId, wallet.account?.address || "");
        setPacaBalance(balance);
      };
      fetchPacaBalance();
    }
  }, [wallet?.account?.address]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (walletDropdownRef.current && !walletDropdownRef.current.contains(event.target as Node)) {
        setIsWalletDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleWalletDropdown = () => {
    setIsWalletDropdownOpen(!isWalletDropdownOpen);
  };

  const shortenHash = (address: string, charsAmount: number = 6): string => {
    const firstPart = address.substring(0, charsAmount);
    const lastPart = address.substring(address.length - charsAmount, address.length);
    return `${firstPart}...${lastPart}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-gray-800">
      <header className="flex items-center justify-between bg-gray-800 px-6 py-4 text-white">
        <Link className="z-50 flex items-center space-x-2" href="#">
          <span className="text-lg font-semibold text-white">ALPHpaca</span>
        </Link>
        <nav className="z-50 hidden space-x-4 md:flex">
          <Link className="text-white hover:text-blue-500" href="/">
            Home
          </Link>
          <Link className="text-white hover:text-blue-500" href="/tokencreate">
            Token Creation
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button
              className="text-white hover:text-blue-500 focus:outline-none"
              onClick={toggleDropdown}
            >
              ALPHpaca
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg z-50">
                <Link
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  href="/migrate"
                >
                  Migrate ALPHpaca
                </Link>
                <Link
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  href="/profile"
                >
                  Profile
                </Link>
                <Link
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  href="/battle"
                >
                  Coming Soon!
                </Link>
              </div>
            )}
          </div>
          <Link className="text-white hover:text-blue-500" href="/walf">
            Wrapped Alf Protocol
          </Link>
        </nav>
        <div className="z-50 flex items-center space-x-2">
          <Link
            className="text-white hover:text-blue-500"
            href="https://twitter.com/alphpacas"
          >
            <TwitterIcon className="h-6 w-6" />
          </Link>
          <Link
            className="text-white hover:text-blue-500"
            href="https://github.com/larkben/nonchalant"
          >
            &lt;/&gt;
          </Link>
          <div ref={walletDropdownRef}>
            <AlephiumConnectButton.Custom>
              {({ isConnected, disconnect, show, account }) => {
                const bal = balance?.balance ?? "0";
                return isConnected ? (
                  <>
                    <button onClick={toggleWalletDropdown} className="text-white hover:text-blue-500 focus:outline-none p-2">
                      {ansUri ? (
                        <img src={ansUri} width={32} height={32} className="rounded-full" alt="Profile" />
                      ) : (
                        <AiOutlineUser className="w-8 h-8" />
                      )}
                    </button>
                    {isWalletDropdownOpen && (
                      <div className="absolute right-0 mt-1 w-48 rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow dark:shadow-gray-800">
                        <div className="relative">
                          <div className="py-8 bg-gradient-to-tr from-cyan-300 to-purple-400"></div>
                          <div className="absolute px-4 -bottom-7 start-0">
                            <div className="flex items-end">
                              {ansUri ? (
                                <img src={ansUri} width={38} height={38} className="rounded-full w-10 h-10 shadow dark:shadow-gray-700" alt="Profile" />
                              ) : (
                                <div className="rounded-full w-10 h-10 bg-gray-300 flex items-center justify-center shadow dark:shadow-gray-700">
                                  <AiOutlineUser className="w-6 h-6 text-gray-600" />
                                </div>
                              )}
                              <span className="font-semibold text-[15px] ms-1">{ansName || 'No Name'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-10 px-4">
                          <h5 className="font-semibold text-[15px]">Wallet:</h5>
                          <div className="flex items-center justify-between">
                            <span className="text-[13px] text-slate-400">{account?.address ? shortenHash(account.address) : '???'}</span>
                            <button onClick={() => account?.address && copyToClipboard(account.address)} className="text-cyan-300"><AiOutlineCopy/></button>
                          </div>
                        </div>
                        <div className="mt-4 px-4">
                          <h5 className="text-[15px]">Balance: <span className="text-cyan-300 font-semibold">{(parseFloat(bal) / 1000000000000000000).toFixed(2)} $ALPH</span></h5>
                          <h5 className="text-[15px]">PACA: <span className="text-cyan-300 font-semibold">{pacaBalance?.toString()} $PACA</span></h5>
                        </div>
                        <ul className="py-2 text-start">
                          <li className="border-t border-gray-100 dark:border-gray-800 my-2"></li>
                          <li>
                            <button onClick={disconnect} className="inline-flex items-center text-[14px] font-semibold py-1.5 px-4 hover:text-cyan-300"><LiaSignOutAltSolid className="text-[16px] align-middle me-1"/> Logout</button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <button onClick={show} id="connectWallet" className="text-white hover:text-blue-500 focus:outline-none p-2">
                    <PiWalletBold className="w-8 h-8" />
                  </button>
                )
              }}
            </AlephiumConnectButton.Custom>
          </div>
        </div>
      </header>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-y-0 right-0 flex items-center" />
      </div>
    </div>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
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