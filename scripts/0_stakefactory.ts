// This faucet takes advantage of the Rhone gasless transactions
import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { CreateStakeFactory, CreateToken, StakeFactory } from '../artifacts/ts'

//! TestNet Token $PACA
// 23ced1fcda7fb1f53641dc299cf49b12a89338c80d05534fc5b366d5b65acd02

//! Mainnet Token $PACA
// b2d71c116408ae47b931482a440f675dc9ea64453db24ee931dacd578cae9002

// This deploy function will be called by cli deployment tool automatically
//* Note that deployment scripts should prefixed with numbers (starting from 0)
const stakeFactory: DeployFunction<Settings> = async (
  deployer: Deployer,
): Promise<void> => {
  // Get settings
  const result = await deployer.deployContract(StakeFactory, {
    // The initial states of the faucet contract
    initialFields: {
        owner: "16gAmGuCysLjGxHK8TUENkvhbqvwZRb6BabUbsxLYkSkd", //! Owner
        dev: "16gAmGuCysLjGxHK8TUENkvhbqvwZRb6BabUbsxLYkSkd",
        token: "b2d71c116408ae47b931482a440f675dc9ea64453db24ee931dacd578cae9002", //! $PACA
        total: 0n,
        users: 0n,
        path: 0n,
        monthlyrewards: 35n, // 3.5%
        stakecontract: "9600a4512bbe8747bfa6fcb6a85d4f7fc97f1c59281e5a87ff168d2305096900"
    }
  })
  console.log('Stake Factory id: ' + result.contractInstance.contractId)
  console.log('Stake Factory address: ' + result.contractInstance.address)
}

export default stakeFactory