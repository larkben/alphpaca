import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { CreateToken } from '../artifacts/ts'
import { TokenTemplate } from '@/services/utils'

//! TestNet Token $PACA
// 23ced1fcda7fb1f53641dc299cf49b12a89338c80d05534fc5b366d5b65acd02

//! Mainnet Token $PACA
// b2d71c116408ae47b931482a440f675dc9ea64453db24ee931dacd578cae9002

// This deploy function will be called by cli deployment tool automatically
//* Note that deployment scripts should prefixed with numbers (starting from 0)
const tokenCreate: DeployFunction<Settings> = async (
  deployer: Deployer,
): Promise<void> => {
  // Get settings
  const result = await deployer.deployContract(CreateToken, {
    // The initial states of the faucet contract
    initialFields: {
      owner: "16gAmGuCysLjGxHK8TUENkvhbqvwZRb6BabUbsxLYkSkd", //! Owner
      contract: "89955c2224f470c28d7a4585cfe0cebfacaf4719abfa4b790360f065f7564500"
    }
  })
  console.log('Token create contract id: ' + result.contractInstance.contractId)
  console.log('Token create contract address: ' + result.contractInstance.address)
}

export default tokenCreate
