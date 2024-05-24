import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { Listing } from '../artifacts/ts'

//! TestNet Token $PACA
// 23ced1fcda7fb1f53641dc299cf49b12a89338c80d05534fc5b366d5b65acd02

//! Mainnet Token $PACA
// b2d71c116408ae47b931482a440f675dc9ea64453db24ee931dacd578cae9002

// This deploy function will be called by cli deployment tool automatically
//* Note that deployment scripts should prefixed with numbers (starting from 0)
const listingTemplate: DeployFunction<Settings> = async (
  deployer: Deployer,
): Promise<void> => {
  // Get settings
  const result = await deployer.deployContract(Listing, {
    // The initial states of the faucet contract
    initialFields: {
        owner: "16gAmGuCysLjGxHK8TUENkvhbqvwZRb6BabUbsxLYkSkd",
        marketplaceContract: "16gAmGuCysLjGxHK8TUENkvhbqvwZRb6BabUbsxLYkSkd",
        assetListed: "23ced1fcda7fb1f53641dc299cf49b12a89338c80d05534fc5b366d5b65acd02",
        assetAmount: 0n,
        priceToken: "23ced1fcda7fb1f53641dc299cf49b12a89338c80d05534fc5b366d5b65acd02",
        price: 0n,
        listedTime: 69n,
        expiration: 69n,
    }
  })
  console.log('Listing Contract id: ' + result.contractInstance.contractId)
  console.log('Listing Contract address: ' + result.contractInstance.address)
}

export default listingTemplate