import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { loadDeployments } from '../artifacts/ts/deployments'
import { Loan, LoanFactory } from '../artifacts/ts';
import { ZERO_ADDRESS } from '../test/create-token/utils';

const deployLoanFactory: DeployFunction<Settings> = async (
  deployer: Deployer,
  network: Network<Settings>
): Promise<void> => {
  const result = await deployer.deployContract(LoanFactory, {
    initialFields: {
      admin: deployer.account.address,
      loanTemplate: '',
      activeLoans: 0n,
      rate: 300n,                     // 3%
      liquidationBot: ZERO_ADDRESS,   // edit this!!!!!
      oracle: ZERO_ADDRESS            // edit this!!!!!
    }
  })
  const contractId = result.contractInstance.contractId
  const contractAddress = result.contractInstance.address
  console.log(`Offer Template: ${contractAddress}, contract id: ${contractId}`)
}

export default deployLoanFactory