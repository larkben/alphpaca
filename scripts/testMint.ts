import { getSigner } from "@alephium/web3-test"
import { MintPlayer } from "../artifacts/ts"
import { ALPH_TOKEN_ID, DUST_AMOUNT, NodeProvider, ONE_ALPH, SignerProvider, addressVal, binToHex, byteVecVal, encodePrimitiveValues, stringToHex, u256Val } from "@alephium/web3";
import { PrivateKeyWallet } from "@alephium/web3-wallet";
import { DeployFunction, Deployer, Network } from "@alephium/cli";
import { Settings } from "../alephium.config";
import { loadDeployments } from "../artifacts/ts/deployments";
import { getNetwork } from "./network";

const dotenv = require('dotenv');
dotenv.config()

const nodeProvider = new NodeProvider('https://node.mainnet.alephium.org')                  //! Testnet
const signer = new PrivateKeyWallet({ privateKey: String(process.env.key), nodeProvider })

const testMint: DeployFunction<Settings> = async (
    deployer: Deployer,
    network: Network<Settings>
  ): Promise<void> => {
    const nftToken = "39e76159249c8ebd98618632821596127d63ae471349834e51a7dfc8df7b9200"
    const upgradeNetwork = getNetwork()
    
    await MintPlayer.execute(signer, {
      initialFields: {
          collection: "69aa088239e6f6cbe376a98fff39a1cc1271c80003fa58b11b1d09edc86e9100",
          tokenSelected: nftToken
      },
      attoAlphAmount: DUST_AMOUNT,
      tokens: [{id: nftToken, amount: BigInt(1) }, {id: ALPH_TOKEN_ID, amount: BigInt(100000000000000000)}]
    })
  }
  
  export default testMint