'use client'
import Image from "next/image";
import { Navbar } from "../../components/navbar";
import {
  AlephiumConnectButton,
  AlephiumWalletProvider,
} from "@alephium/web3-react";
import { TokenCreate } from "../../services/utils";
import { Marketplace } from "../../components/create-listing";

export default function Staking() {
  return (
    <main>
      <AlephiumWalletProvider network={"mainnet"}>
        <Navbar/>
        <Marketplace config={TokenCreate}/>
      </AlephiumWalletProvider>
    </main>
  );
}