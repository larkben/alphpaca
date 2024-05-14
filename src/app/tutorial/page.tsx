import Image from "next/image";
import { Navbar } from "../../components/navbar";
import {
  AlephiumConnectButton,
  AlephiumWalletProvider,
} from "@alephium/web3-react";
import { FaucetDapp } from "../../components/faucet";
import { TokenCreate } from "../../services/utils";

export default function Faucet() {
  return (
    <main>
      <AlephiumWalletProvider network={"mainnet"}>
        <Navbar/>
        <FaucetDapp config={TokenCreate}/>
      </AlephiumWalletProvider>
    </main>
  );
}