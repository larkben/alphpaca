import Image from "next/image";
import { Navbar } from "../../components/navbar";
import { TokenCreate } from "../../services/utils";
import { WrappedAlfDapp } from "../../components/walf";
import { AlephiumConnectButton, AlephiumWalletProvider } from '@alephium/web3-react'
import React from "react";

export default function TokenCPage() {
  return (
    <main>
      <AlephiumWalletProvider network={"mainnet"}>
        <Navbar/>
        <WrappedAlfDapp config={TokenCreate}></WrappedAlfDapp>
      </AlephiumWalletProvider>
    </main>
  );
}