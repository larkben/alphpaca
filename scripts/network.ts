import { NetworkId, ONE_ALPH } from "@alephium/web3"

export function getNetwork(): NetworkId {
    const network = (process.env.NEXT_PUBLIC_NETWORK ?? 'testnet') as NetworkId
    return network
}