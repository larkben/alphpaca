
import Image from "next/image";
import { Navbar } from "../../components/navbar";
import { TokenCreate } from "../../services/utils";
import { AlephiumConnectButton, AlephiumWalletProvider } from '@alephium/web3-react'
import { TokenCreateAutomation } from "../../components/token-create";
import React from "react";

export default function TokenCPage() {
  return (
    <main>
      <AlephiumWalletProvider network={"mainnet"}>
        <Navbar/>
        <TokenCreateAutomation config={TokenCreate}></TokenCreateAutomation>
      </AlephiumWalletProvider>
    </main>
  );
}