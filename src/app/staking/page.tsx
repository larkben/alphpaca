import Image from "next/image";
import { Navbar } from "../../components/navbar";
import {
  AlephiumConnectButton,
  AlephiumWalletProvider,
} from "@alephium/web3-react";

export default function Staking() {
  return (
    <main>
      <AlephiumWalletProvider network={"mainnet"}>
        <Navbar/>
      </AlephiumWalletProvider>
    </main>
  );
}