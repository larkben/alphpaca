import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { CreateToken } from '../artifacts/ts'

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
      contract: "1b5d3f0f2c2db3f91cb1d32675854a1add4fa9a4397a252a4a855fb60ada5a00",
      alphfee: 5000000000000000000n,
      alphcollected: 0n
    }
  })
  console.log('Token create contract id: ' + result.contractInstance.contractId)
  console.log('Token create contract address: ' + result.contractInstance.address)
}

export default tokenCreate
