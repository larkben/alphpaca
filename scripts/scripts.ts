import { getSigner } from "@alephium/web3-test"
import { DestroyWangProtocol, ForceContractCancel, PlayerBase, TopupWangProtocol, UpgradeCollectionCode } from "../artifacts/ts"
import { DUST_AMOUNT, NodeProvider, SignerProvider, addressVal, binToHex, byteVecVal, encodePrimitiveValues, stringToHex, u256Val } from "@alephium/web3";
import { PrivateKeyWallet } from "@alephium/web3-wallet";
import { DeployFunction, Deployer, Network } from "@alephium/cli";
import { Settings } from "../alephium.config";
import { loadDeployments } from "../artifacts/ts/deployments";
import { getNetwork } from "./network";

const dotenv = require('dotenv');
dotenv.config()

const nodeProvider = new NodeProvider('https://node.mainnet.alephium.org')                  //! Testnet
const signer = new PrivateKeyWallet({ privateKey: String(process.env.key), nodeProvider })

const topupWang: DeployFunction<Settings> = async (
    deployer: Deployer,
    network: Network<Settings>
  ): Promise<void> => {
    const upgradeNetwork = getNetwork()
    
   /*
    await DestroyWangProtocol.execute(signer, {
      initialFields: {
        contract: "4264d30873a297c93fbc0a2b0286f8df7a16991c2618f42c34e5fc075f252300"
      }
    })
    */
  }
  
  export default topupWang