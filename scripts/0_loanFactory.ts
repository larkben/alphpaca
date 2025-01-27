import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { NULL_CONTRACT_ADDRESS, ZERO_ADDRESS } from '@alephium/web3'
import { loadDeployments } from '../artifacts/ts/deployments'
import { Loan, LoanFactory } from '../artifacts/ts';

const deployLoanFactory: DeployFunction<Settings> = async (
  deployer: Deployer,
  network: Network<Settings>
): Promise<void> => {
  const result = await deployer.deployContract(LoanFactory, {
    initialFields: {
      admin: deployer.account.address,
      loanTemplate: '78f54e186e2a8d5eeb9a4c941860a390d4c6f33eaf18c60b1722b953dc6ef800',
      activeLoans: 0n,
      rate: 200n        // 2%
    }
  })
  const contractId = result.contractInstance.contractId
  const contractAddress = result.contractInstance.address
  console.log(`Offer Template: ${contractAddress}, contract id: ${contractId}`)
}

export default deployLoanFactory