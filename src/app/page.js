import Image from "next/image";
import { Hero } from "../components";
import { Navbar } from "../components/navbar";
import { Dapps } from "../components/un_dapps";
import {
  AlephiumConnectButton,
  AlephiumWalletProvider,
} from "@alephium/web3-react";

export default function Home() {
  return (
    <div>
      <AlephiumWalletProvider network={"mainnet"}>
        <Navbar/>
        <Hero/>
      </AlephiumWalletProvider>
    </div>
  );
}