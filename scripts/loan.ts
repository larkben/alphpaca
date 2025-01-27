import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { NULL_CONTRACT_ADDRESS, ZERO_ADDRESS } from '@alephium/web3'
import { loadDeployments } from '../artifacts/ts/deployments'
import { Loan } from '../artifacts/ts';

const deployLoan: DeployFunction<Settings> = async (
  deployer: Deployer,
  network: Network<Settings>
): Promise<void> => {
  const result = await deployer.deployContract(Loan, {
    initialFields: {
      creator: deployer.account.address,
      loanee: NULL_CONTRACT_ADDRESS,
      tokenRequested: '',
      tokenAmount: 0n,
      collateralToken: '',
      collateralAmount: 0n,
      interest: 0n,
      rate: 0n,
      duration: 0n,
      startTime: 0n,
      active: false,
      parentContract: NULL_CONTRACT_ADDRESS
    }
  })
  const contractId = result.contractInstance.contractId
  const contractAddress = result.contractInstance.address
  console.log(`Offer Template: ${contractAddress}, contract id: ${contractId}`)
}

export default deployLoan