import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { CreateStakeFactory, CreateToken, WrappedOgAlfProtocol } from '../artifacts/ts'

//! TestNet Token $PACA
// 23ced1fcda7fb1f53641dc299cf49b12a89338c80d05534fc5b366d5b65acd02

//! Mainnet Token $PACA
// b2d71c116408ae47b931482a440f675dc9ea64453db24ee931dacd578cae9002

// This deploy function will be called by cli deployment tool automatically
//* Note that deployment scripts should prefixed with numbers (starting from 0)
const wrappedAlfProtocol: DeployFunction<Settings> = async (
  deployer: Deployer,
): Promise<void> => {
  // Get settings
  const result = await deployer.deployContract(WrappedOgAlfProtocol, {
    // The initial states of the faucet contract
    initialFields: {
        symbol: Buffer.from('TEMP', 'utf8').toString('hex'),
        name: Buffer.from('Template', 'utf8').toString('hex'),
        decimals: 18n,
        supply: 1000n,
        owner: "16gAmGuCysLjGxHK8TUENkvhbqvwZRb6BabUbsxLYkSkd", //! Owner
        ogalf: "c0c0af7a481e3e50c50e418bf8ff6923dc4d878ac3744474e8c708a8adccfb00", // token id
        ogalfamount: 0n,
        fee: 5000000000000000000n,
        feescollected: 0n
    }
  })
  console.log('Wrapped Alf Protocol id: ' + result.contractInstance.contractId)
  console.log('Wrapped Alf Protocol address: ' + result.contractInstance.address)
}

export default wrappedAlfProtocol