import { getSigner } from "@alephium/web3-test"
import { FindBattle, Player, PlayerBase, PlayerBaseTypes, UpgradeCollectionCode, UpgradeCollectionFields, UpgradeFindBattleWithFields } from "../artifacts/ts"
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

const upgradeCollectionFields: DeployFunction<Settings> = async (
    deployer: Deployer,
    network: Network<Settings>
  ): Promise<void> => {
    const upgradeNetwork = getNetwork()

    const encodedImmFields = encodePrimitiveValues([
        addressVal(deployer.account.address),
        byteVecVal("8880ab72ea74e49482180d3303e4bc97ded3bdc5a2618b77e9bec68d54bfe600"), // contract
        addressVal("285zrkZTPpUCpjKg9E3z238VmpUBQEAbESGsJT6yX7Rod") // oracle
    ])
    
    const encodedMutFields = encodePrimitiveValues([
    ])
    
    await UpgradeFindBattleWithFields.execute(signer, {
      initialFields: {
          market: "35682a15f696b8cb105349ed3aed9e73e1d6a71b22acb24bf04ef6d2e7119b00",
          newCode: FindBattle.contract.bytecode,
          immutable: binToHex(encodedImmFields),
          mutable: binToHex(encodedMutFields)
      }
    })
  }
  
  export default upgradeCollectionFields