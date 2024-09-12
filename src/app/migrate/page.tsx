import Image from "next/image";
import { Navbar } from "../../components/navbar";
import { TokenCreate } from "../../services/utils";
import { AlephiumConnectButton, AlephiumWalletProvider } from '@alephium/web3-react'
import { MintPlayerAutomation } from "../../components/mint-player";
import React from "react";

export default function TokenCPage() {
  return (
    <main>
      <AlephiumWalletProvider network={"mainnet"}>
        <Navbar/>
        <MintPlayerAutomation config={TokenCreate}></MintPlayerAutomation>
      </AlephiumWalletProvider>
    </main>
  );
}