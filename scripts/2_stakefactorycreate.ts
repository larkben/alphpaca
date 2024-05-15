// This faucet takes advantage of the Rhone gasless transactions
import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { CreateStakeFactory, CreateToken } from '../artifacts/ts'

//! TestNet Token $PACA
// 23ced1fcda7fb1f53641dc299cf49b12a89338c80d05534fc5b366d5b65acd02

//! Mainnet Token $PACA
// b2d71c116408ae47b931482a440f675dc9ea64453db24ee931dacd578cae9002

// This deploy function will be called by cli deployment tool automatically
//* Note that deployment scripts should prefixed with numbers (starting from 0)
const tokenStakeFactoryCreator: DeployFunction<Settings> = async (
  deployer: Deployer,
): Promise<void> => {
  // Get settings
  const result = await deployer.deployContract(CreateStakeFactory, {
    // The initial states of the faucet contract
    initialFields: {
        owner: "16gAmGuCysLjGxHK8TUENkvhbqvwZRb6BabUbsxLYkSkd", //! Owner
        alphfee: 20000000000000000000n,
        collectedfees: 0n,
        stakefactory: "8c92d842f11ca6f480bbef542056eb3738b37be89637cfb4ec0ec700fc5fcf00",
        stakecontract: "02238a5e27f24a8305e01225ca731ac55ffc021bc613ffa9377385ffbb8f0600",
        path: 0n
    }
  })
  console.log('Stake Factory Creator id: ' + result.contractInstance.contractId)
  console.log('Stake Factory Creator address: ' + result.contractInstance.address)
}

export default tokenStakeFactoryCreator