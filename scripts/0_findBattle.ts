import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { ONE_ALPH, ZERO_ADDRESS } from '@alephium/web3'
import { loadDeployments } from '../artifacts/ts/deployments'
import { getNetwork } from './network'
import { FindBattle, Player } from '../artifacts/ts'

const zero = BigInt(0)

const deployNFTTemplate: DeployFunction<Settings> = async (
  deployer: Deployer,
  network: Network<Settings>
): Promise<void> => {
  const upgradeNetwork = getNetwork()

  const result = await deployer.deployContract(FindBattle, {
    initialFields: {
        admin: deployer.account.address,
        pvp: 'db667b755f6c486846f6f7436d4ac1214df9052051daa2361bec6556d3bfb000'
    }
  })
  const contractId = result.contractInstance.contractId
  const contractAddress = result.contractInstance.address
  console.log(`FindBattle address: ${contractAddress}, contract id: ${contractId}`)
}

export default deployNFTTemplate