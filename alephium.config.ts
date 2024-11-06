import { Configuration } from '@alephium/cli'
import { Number256 } from '@alephium/web3'

const dotenv = require('dotenv');
dotenv.config()

// Settings are usually for configuring
export type Settings = {
  issueTokenAmount: Number256
}

const configuration: Configuration = {
  networks: {
    devnet: {
      nodeUrl: 'http://localhost:22973',
      privateKeys: [
        'a642942e67258589cd2b1822c631506632db5a12aabcf413604e785300d762a5' // group 0
      ],
      settings: null
    },

    testnet: {
      nodeUrl: (process.env.NODE_URL as string) ?? 'https://wallet-v20.testnet.alephium.org',
      privateKeys: process.env.key === undefined ? [] : process.env.key.split(','),
      settings: null
    },

    mainnet: {
      nodeUrl: (process.env.NODE_URL as string) ?? 'https://node.mainnet.alephium.org',
      privateKeys: process.env.prodkey === undefined ? [] : process.env.prodkey.split(','),
      settings: null
    }
  }
}

export default configuration
