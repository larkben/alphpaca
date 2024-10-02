import { AlephiumConnectButton, AlephiumWalletProvider } from '@alephium/web3-react'
import { Navbar } from "../../components/navbar";
import Dashboard from "../../components/profile";

export default function TokenCPage() {
  return (
    <main>
      <AlephiumWalletProvider network={"mainnet"}>
        <Navbar/>
        <Dashboard/>
      </AlephiumWalletProvider>
    </main>
  );
}