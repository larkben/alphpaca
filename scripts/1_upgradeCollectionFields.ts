import { getSigner } from "@alephium/web3-test"
import { PlayerBase, UpgradeCollectionCode, UpgradeCollectionFields } from "../artifacts/ts"
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

const upgradeCollectionCode: DeployFunction<Settings> = async (
    deployer: Deployer,
    network: Network<Settings>
  ): Promise<void> => {
    const upgradeNetwork = getNetwork()
    
    await UpgradeCollectionFields.execute(signer, {
      initialFields: {
          collection: "69aa088239e6f6cbe376a98fff39a1cc1271c80003fa58b11b1d09edc86e9100",
          newCode: PlayerBase.contract.bytecode,
          newImmFieldsEncoded: "",
          newMutFieldsEncoded: ""
      }
    })
  }
  
  export default upgradeCollectionCode