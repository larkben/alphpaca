import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { byteVecVal, stringToHex, ZERO_ADDRESS } from '@alephium/web3'
import { loadDeployments } from '../artifacts/ts/deployments'
import { RandomnessFetcher } from '../artifacts/ts'

const deployScript: DeployFunction<Settings> = async (
  deployer: Deployer,
  network: Network<Settings>
): Promise<void> => {
  const result = await deployer.deployContract(RandomnessFetcher, {
    initialFields: {
        oracle: '29isyQoYSFKE4VMaGKHfyy7zRHeM2VCwAy5pXx2xUksBm',
        randomValue: { randomness: '', signature: '', round: 0n }
    }
  })
  const contractId = result.contractInstance.contractId
  const contractAddress = result.contractInstance.address
  console.log(`Random Template: ${contractAddress}, contract id: ${contractId}`)
}

export default deployScript