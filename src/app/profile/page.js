import { AlephiumConnectButton, AlephiumWalletProvider } from '@alephium/web3-react'
import { Navbar } from "../../components/navbar";
import NFTGallery from "../../components/nft-profile";

export default function TokenCPage() {
  return (
    <main>
      <AlephiumWalletProvider network={"mainnet"}>
        <Navbar/>
        <NFTGallery/>
      </AlephiumWalletProvider>
    </main>
  );
}