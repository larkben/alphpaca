import { getSigner } from "@alephium/web3-test"
import { PlayerBase, RandomnessFetcherInstance, UpdateRandomnessFetcher, UpgradeCollectionCode } from "../artifacts/ts"
import { DUST_AMOUNT, NodeProvider, SignerProvider, addressVal, binToHex, byteVecVal, encodePrimitiveValues, stringToHex, u256Val, waitForTxConfirmation, web3 } from "@alephium/web3";
import { PrivateKeyWallet } from "@alephium/web3-wallet";
import { DeployFunction, Deployer, Network } from "@alephium/cli";
import { Settings } from "../alephium.config";
import { loadDeployments } from "../artifacts/ts/deployments";
import { getNetwork } from "./network";

const dotenv = require('dotenv');
dotenv.config()

const nodeProvider = new NodeProvider('https://node.testnet.alephium.org')                  //! Testnet
const signer = new PrivateKeyWallet({ privateKey: String(process.env.key), nodeProvider })

async function getRandomness(randomnessFetcher: RandomnessFetcherInstance): Promise<{randomness: string, signature: string, round: number}> {
  const state = await randomnessFetcher.fetchState()
  return {
    randomness: state.fields.randomValue.randomness,
    signature: state.fields.randomValue.signature,
    round: Number(state.fields.randomValue.round)
  }
}

const deployScript: DeployFunction<Settings> = async (
    deployer: Deployer,
    network: Network<Settings>
  ): Promise<void> => {
    const upgradeNetwork = getNetwork()

    web3.setCurrentNodeProvider('https://node.testnet.alephium.org')
    const randomnessFetcher = loadDeployments('testnet').contracts.RandomnessFetcher?.contractInstance

    console.log(randomnessFetcher)

    //console.log(await getRandomness(randomnessFetcher))
    
    //const tx = await randomnessFetcher.transact.update({ signer: signer })
    //await waitForTxConfirmation(tx.txId, 1, 4000)
    //console.log(tx.txId)
  }
  
  export default deployScript