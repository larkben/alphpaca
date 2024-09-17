import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { ONE_ALPH, ZERO_ADDRESS } from '@alephium/web3'
import { loadDeployments } from '../artifacts/ts/deployments'
import { getNetwork } from './network'
import { Player } from '../artifacts/ts'

const zero = BigInt(0)

const deployNFTTemplate: DeployFunction<Settings> = async (
  deployer: Deployer,
  network: Network<Settings>
): Promise<void> => {
  const upgradeNetwork = getNetwork()

  const result = await deployer.deployContract(Player, {
    initialFields: {
        nftIndex: BigInt(0),
        tokenUri: '',
        collectionId: '',
        gameContract: '',
        nickname: '',
        linkedAddress: ZERO_ADDRESS,
        level: [BigInt(1),BigInt(1),BigInt(1), BigInt(1)],
        stats: [BigInt(5), BigInt(5), BigInt(5), BigInt(0)],
        hay: '',
        moves: ["", "", "", ""]
    }
  })
  const contractId = result.contractInstance.contractId
  const contractAddress = result.contractInstance.address
  console.log(`NFT Template address: ${contractAddress}, contract id: ${contractId}`)
}

export default deployNFTTemplate