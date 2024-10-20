import { getSigner } from "@alephium/web3-test"
import { DeleteFindBattle, FindBattle, ForceContractCancel, PlayerBase, UpgradeCollectionCode, UpgradeFindBattle } from "../artifacts/ts"
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

const forceCancelBattle: DeployFunction<Settings> = async (
    deployer: Deployer,
    network: Network<Settings>
  ): Promise<void> => {
    const upgradeNetwork = getNetwork()
    
    await DeleteFindBattle.execute(signer, {
      initialFields: {
        market: "35682a15f696b8cb105349ed3aed9e73e1d6a71b22acb24bf04ef6d2e7119b00"
      }
    })
  }
  
  export default forceCancelBattle