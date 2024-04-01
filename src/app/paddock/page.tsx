import Image from "next/image";
import { Navbar } from "../../components/navbar";
import { AuctionDisplay } from "../../components/auction-display";
import { AlephiumConnectButton, AlephiumWalletProvider } from '@alephium/web3-react'

export default function AuctionPage() {
  return (
    <main>
      <AlephiumWalletProvider network={"mainnet"}>
        <Navbar/>
        <AuctionDisplay/>
      </AlephiumWalletProvider>
    </main>
  );
}