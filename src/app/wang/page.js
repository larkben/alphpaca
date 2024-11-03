
import Image from "next/image";
import { Navbar } from "../../components/navbar";
import { TokenCreate } from "../../services/utils";
import { Wang } from "../../components/wang";
import { AlephiumConnectButton, AlephiumWalletProvider } from '@alephium/web3-react'
import React from "react";

export default function TokenCPage() {
  return (
    <main>
      <AlephiumWalletProvider network={"mainnet"}>
        <Navbar/>
        <Wang config={TokenCreate}></Wang>
      </AlephiumWalletProvider>
    </main>
  );
}