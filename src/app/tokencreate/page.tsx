import Image from "next/image";
import { Navbar } from "../../components/navbar";
import { TokenCreate } from "../../services/utils";
import { TokenCreateAutomation } from "../../components/token-create";
import { AlephiumConnectButton, AlephiumWalletProvider } from '@alephium/web3-react'

export default function TokenCPage() {
  return (
    <main>
      <Navbar/>
      <AlephiumWalletProvider network={"mainnet"}>
        <TokenCreateAutomation config={TokenCreate}></TokenCreateAutomation>
      </AlephiumWalletProvider>
    </main>
  );
}