import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { ONE_ALPH, ZERO_ADDRESS } from '@alephium/web3'
import { loadDeployments } from '../artifacts/ts/deployments'
import { getNetwork } from './network'
import { Battle, FindBattle, Player } from '../artifacts/ts'
import { NullContractAddress } from '@alephium/web3/dist/src/codec'

const zero = BigInt(0)

const deployNFTTemplate: DeployFunction<Settings> = async (
  deployer: Deployer,
  network: Network<Settings>
): Promise<void> => {
  const upgradeNetwork = getNetwork()

  const result = await deployer.deployContract(Battle, {
    initialFields: {
      playerOne: deployer.account.address,
      pacaOne: '',
      pacaOneHealth: 15n,
      playerTwo: deployer.account.address,
      pacaTwo: '',
      pacaTwoHealth: 15n,
      turn: false,
      oracle: '285zrkZTPpUCpjKg9E3z238VmpUBQEAbESGsJT6yX7Rod'
    }
  })
  const contractId = result.contractInstance.contractId
  const contractAddress = result.contractInstance.address
  console.log(`FindBattle address: ${contractAddress}, contract id: ${contractId}`)
}

export default deployNFTTemplate