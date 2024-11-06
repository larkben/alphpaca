import { Navbar } from "../../components/navbar";
import { TokenCreate } from "../../services/utils";
import { WrappedTokens } from "../../components/WrappedTokens";
import { AlephiumWalletProvider } from '@alephium/web3-react'
import React from "react";

export default function TokenCPage() {
  return (
    <main>
      <AlephiumWalletProvider network={"mainnet"}>
        <Navbar/>
        <WrappedTokens config={TokenCreate}></WrappedTokens>
      </AlephiumWalletProvider>
    </main>
  );
}