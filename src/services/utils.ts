import { NetworkId, ONE_ALPH } from "@alephium/web3"
import { loadDeployments } from "../../artifacts/ts/deployments"

//* Interfaces
export interface TokenFaucetConfig {
  network: NetworkId
  groupIndex: number
  faucetAddress: string               
  faucetID: string                  // ID of the contract
  tokenID: string
}

export interface TokenCreate {
  network: NetworkId
  groupIndex: number
  contractAddress: string
  contractId: string
  tokenContract: string
  pacaId: string                    // PACA fee
}

export interface TokenTemplate {
  network: NetworkId
  groupIndex: number
  contractAddress: string
  contractId: string
}

export interface BurnToken {
  network: NetworkId
  groupIndex: number
  contractAddress: string
  contractId: string
  tokenId: string
}

export interface PinBallLottery {
  network: NetworkId
  groupIndex: number
  contractAddress: string           // Contract Addy
  contractId: string                // Contract Collects Fees, Takes Player With Highest Score
  tokenId: string                   // Burns $PACA or uses PACA to upgrade skills
}

export function getNetwork(): NetworkId {
  const network = (process.env.NEXT_PUBLIC_NETWORK ?? 'testnet') as NetworkId
  return network
}

export function getDefaultNodeUrl(): string {
  const network = getNetwork()
  return network === 'devnet' ?
    'http://127.0.0.1:22973' : network === 'testnet' ?
      'https://wallet-v20.testnet.alephium.org' : 'https://wallet-v20.mainnet.alephium.org'
}

export function getDefaultExplorerUrl(): string {
  const network = getNetwork()
  return network === 'devnet' ?
    'http://localhost:9090' : network === 'testnet' ?
      'https://backend-v113.testnet.alephium.org' : 'https://backend-v113.mainnet.alephium.org'
}

export function getBackendUrl(): string {
  return process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://127.0.0.1:3019'
}

export function getMongoUrl(): string {
  return process.env.MONGO_URL ?? 'mongodb://localhost:27017'
}

function getPollingInterval(): number {
  const network = getNetwork()
  return network === 'testnet' ? 1000 : 100000
}

export function loadSettings(network: 'devnet' | 'testnet' | 'mainnet'): { commissionRate: number } {
  return {
    commissionRate: 200
  }
}

//* TokenCreate
function getTokenCreateConfig(): TokenCreate {
  const network = getNetwork()
  const createToken = loadDeployments(network).contracts.CreateToken.contractInstance    // This is not in the initial setup but is super important
  const tokenTemplate = loadDeployments(network).contracts.Token.contractInstance
  const groupIndex = createToken.groupIndex
  const contractAddress = createToken.address
  const contractId = createToken.contractId
  const tokenContract = tokenTemplate.contractId   
  const pacaId = "23ced1fcda7fb1f53641dc299cf49b12a89338c80d05534fc5b366d5b65acd02"      // $PACA ID
  return { network, groupIndex, contractAddress, contractId, tokenContract, pacaId}
}

//* TokenTemplate // For TokenCreation
function getTokenTemplateConfig(): TokenTemplate {
  const network = getNetwork()
  const TokenTemplate = loadDeployments(network).contracts.Token.contractInstance
  const groupIndex = TokenTemplate.groupIndex
  const contractAddress = TokenTemplate.address
  const contractId = TokenTemplate.contractId
  return {network, groupIndex, contractAddress, contractId}
}

export const TokenCreate = getTokenCreateConfig()
export const TokenTemplate = getTokenTemplateConfig()