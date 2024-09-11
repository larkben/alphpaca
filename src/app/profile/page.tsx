import Image from "next/image";
import { Navbar } from "../../components/navbar";
import { TokenCreate } from "../../services/utils";
import { AlephiumConnectButton, AlephiumWalletProvider } from '@alephium/web3-react'
import SimplifiedNftProfileViewer from "../../components/simplified-nft-profile-viewer"

export default function TokenCPage() {
  return (
    <main>
      <AlephiumWalletProvider network={"mainnet"}>
        <Navbar/>
        <SimplifiedNftProfileViewer/>
      </AlephiumWalletProvider>
    </main>
  );
}