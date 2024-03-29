import Image from "next/image";
import { Navbar } from "../../components/navbar";
import { AlephiumConnectButton, AlephiumWalletProvider } from '@alephium/web3-react'

export default function AuctionPage() {
  return (
    <main>
      <Navbar/>
      <AlephiumWalletProvider network={"mainnet"}>
      </AlephiumWalletProvider>
    </main>
  );
}