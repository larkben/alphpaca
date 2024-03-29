import { DevDashboard } from "../../components/devdashboard";
import { TokenCreate } from "../../services/utils";
import { AlephiumWalletProvider, AlephiumConnectButton } from "@alephium/web3-react";

export default function TokenCPage() {
  return (
    <main>
        <AlephiumWalletProvider network={"mainnet"}>
            <AlephiumConnectButton></AlephiumConnectButton>
          </AlephiumWalletProvider>
        <AlephiumWalletProvider network={"mainnet"}>
            <DevDashboard config={TokenCreate}/> {/* Token Create is Included */}
        </AlephiumWalletProvider>
    </main>
  );
}