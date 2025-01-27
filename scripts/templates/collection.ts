import { Deployer, DeployFunction, Deployments, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { contractIdFromAddress, ONE_ALPH, stringToHex, ZERO_ADDRESS } from '@alephium/web3'
import { loadDeployments } from '../artifacts/ts/deployments'
import { getNetwork } from './network'
import { Player, PlayerBase } from '../artifacts/ts'

const zero = BigInt(0)

const deployPlayerBase: DeployFunction<Settings> = async (
  deployer: Deployer,
  network: Network<Settings>
): Promise<void> => {
  const upgradeNetwork = getNetwork()

  const result = await deployer.deployContract(PlayerBase, {
    initialFields: {
        collectionOwner: deployer.account.address,
        collectionUri: stringToHex('https://bmy6to62yllcqkltf6jenccnby7q4fhozcc5kvjxvbjycegyuyjq.arweave.net/CzHpu9rC1igpcy-SRohNDj8OFO7IhdVVN6hTgRDYphM/collection.json'),
        gameContract: '',
        totalSupply: BigInt(332),
        baseuri: stringToHex('https://44t56tgvxo5x2jhmra47cjthg4pylaqaztbfemqdj6hnodvw7bva.arweave.net/5yffTNW7u30k7Ig58SZnNx-FggDMwlIyA0-O1w62-Go/'),
        playerContractId: "8df4246365a155d3b3777b186abfdfa96603b6a83c67fcf84f001f12fe2a6a00",
        oldcollection: "1136a8337e57e74b4b526e92b255593c2a5cdb5aef0093148a2c88f853c1de00",
        code: '',
        encodedImmutableFields: '',
        encodedMutableFields: ''
    }
  })
  const contractId = result.contractInstance.contractId
  const contractAddress = result.contractInstance.address
  console.log(`Collection address: ${contractAddress}, contract id: ${contractId}`)
}

export default deployPlayerBase