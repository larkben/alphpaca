import Image from "next/image";
import { Navbar } from "../../components/navbar";
import {
  AlephiumConnectButton,
  AlephiumWalletProvider,
} from "@alephium/web3-react";
import { SaddleDisplay } from "../../components/saddle-display"

export default function Saddle() {
  return (
    <main>
      <AlephiumWalletProvider network={"mainnet"}>
        <Navbar/>
        <SaddleDisplay />
      </AlephiumWalletProvider>
    </main>
  );
}
