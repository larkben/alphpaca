import { getSigner } from "@alephium/web3-test"
import { Player, PlayerBase, PlayerBaseTypes, UpgradeCollectionCode, UpgradeCollectionFields } from "../artifacts/ts"
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

    // set fields
    const contractFields: PlayerBaseTypes.Fields = {
        collectionOwner: "",
        collectionUri: "",
        gameContract: "",
        totalSupply: 0n,
        baseuri: "",
        playerContractId: "",
        oldcollection: "",
        code: "",
        encodedImmutableFields: "",
        encodedMutableFields: ""
    }

    const encodedImmFields = encodePrimitiveValues([
        addressVal(deployer.account.address),
        byteVecVal(""),
        byteVecVal("68747470733a2f2f3434743536746776786f3578326a686d72613437636a7468673470796c6171617a746266656d71646a36686e6f647677376276612e617277656176652e6e65742f35796666544e57377533306b3749673538535a6e4e782d466767444d776c497941302d4f317736322d476f2f"),
        byteVecVal("8df4246365a155d3b3777b186abfdfa96603b6a83c67fcf84f001f12fe2a6a00"),
        byteVecVal("1136a8337e57e74b4b526e92b255593c2a5cdb5aef0093148a2c88f853c1de00"),
        // upgrade fields
        byteVecVal(Player.contract.bytecode),
        byteVecVal(""),
        byteVecVal(""),
        byteVecVal("414c50480002")
    ])
    
    const encodedMutFields = encodePrimitiveValues([
        byteVecVal("68747470733a2f2f617277656176652e6e65742f4a4c41764f4e5979396f43317a6e6f5361496a4458775370704c685f52384456583755754859354a746f732f636f6c6c656374696f6e2e6a736f6e"),
        u256Val(457n)
    ])
    
    await UpgradeCollectionFields.execute(signer, {
      initialFields: {
        collection: "69aa088239e6f6cbe376a98fff39a1cc1271c80003fa58b11b1d09edc86e9100",
        newCode: PlayerBase.contract.bytecode,
        newImmFieldsEncoded: binToHex(encodedImmFields),
        newMutFieldsEncoded: binToHex(encodedMutFields)
      }
    })
  }
  
  export default upgradeCollectionFields