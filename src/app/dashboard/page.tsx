import Image from "next/image";
import { Navbar } from "../../components/navbar";
import {
  AlephiumConnectButton,
  AlephiumWalletProvider,
} from "@alephium/web3-react";
import { DevDashboard } from "../../components/devdashboard";
import { TokenCreate } from "../../services/utils";
import React from "react";

export default function Dashboard() {
  return (
    <main>
      <AlephiumWalletProvider network={"mainnet"}>
        <Navbar/>
        <DevDashboard config={TokenCreate}/>
      </AlephiumWalletProvider>
    </main>
  );
}