import { getSigner } from "@alephium/web3-test"
import { CreatePvp, FindBattle, ForceContractCancel, PlayerBase, UpgradeCollectionCode, UpgradeFindBattle } from "../artifacts/ts"
import { DUST_AMOUNT, NodeProvider, SignerProvider, addressVal, binToHex, byteVecVal, encodePrimitiveValues, stringToHex, u256Val } from "@alephium/web3";
import { PrivateKeyWallet } from "@alephium/web3-wallet";
import { DeployFunction, Deployer, Network } from "@alephium/cli";
import { Settings } from "../alephium.config";
import { loadDeployments } from "../artifacts/ts/deployments";
import { getNetwork } from "./network";

const dotenv = require('dotenv');
dotenv.config()

const nodeProvider = new NodeProvider('https://node.mainnet.alephium.org')                  //! Mainnet
const signer = new PrivateKeyWallet({ privateKey: String(process.env.key), nodeProvider })

const upgradeBattlePvpCode: DeployFunction<Settings> = async (
    deployer: Deployer,
    network: Network<Settings>
  ): Promise<void> => {
    const upgradeNetwork = getNetwork()
    
    await CreatePvp.execute(signer, {
      initialFields: {
          market: "35682a15f696b8cb105349ed3aed9e73e1d6a71b22acb24bf04ef6d2e7119b00",
          paca: "23e7b3f5b1be421fadc1ab8a44529219ab2eff21cd91262d617b3d3ee8194300"
      }
    })
  }
  
  export default upgradeBattlePvpCode