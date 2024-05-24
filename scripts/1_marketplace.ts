import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { Marketplace } from '../artifacts/ts'

//! TestNet Token $PACA
// 23ced1fcda7fb1f53641dc299cf49b12a89338c80d05534fc5b366d5b65acd02

//! Mainnet Token $PACA
// b2d71c116408ae47b931482a440f675dc9ea64453db24ee931dacd578cae9002

// This deploy function will be called by cli deployment tool automatically
//* Note that deployment scripts should prefixed with numbers (starting from 0)
const marketplaceTemplate: DeployFunction<Settings> = async (
  deployer: Deployer,
): Promise<void> => {
  // Get settings
  const result = await deployer.deployContract(Marketplace, {
    // The initial states of the faucet contract
    initialFields: {
        owner: "16gAmGuCysLjGxHK8TUENkvhbqvwZRb6BabUbsxLYkSkd",
        fee: 20n, // 2%
        listingTemplateId: "f730900540a8dccc4630543ab88e5d5921bee5146ecfeee9c537426e28fc5a00",
        storagefee: 1000000000000000000n
    }
  })
  console.log('Marketplace id: ' + result.contractInstance.contractId)
  console.log('Marketplace address: ' + result.contractInstance.address)
}

export default marketplaceTemplate