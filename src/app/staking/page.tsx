import Image from "next/image";
import { Navbar } from "../../components/navbar";
import {
  AlephiumConnectButton,
  AlephiumWalletProvider,
} from "@alephium/web3-react";
import { StakingServices } from "../../components/stake-services";
import { TokenCreate } from "../../services/utils";

export default function Staking() {
  return (
    <main>
      <AlephiumWalletProvider network={"mainnet"}>
        <Navbar/>
        <StakingServices config={TokenCreate}></StakingServices>
      </AlephiumWalletProvider>
    </main>
  );
}