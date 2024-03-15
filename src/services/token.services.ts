import { DUST_AMOUNT, ExecutableScript, ExecuteScriptResult, SignerProvider, contractIdFromAddress } from '@alephium/web3'
import { Topup, Sendout, Destroy, Buildtoken, Gettoken, Editfee, Burn, Destroycreator } from '../../artifacts/ts/scripts'
import { TokenCreate, TokenFaucetConfig, TokenTemplate } from './utils'
import { BurnToken, Faucet, Token } from '../../artifacts/ts'
import * as web3 from '@alephium/web3'

// Token Creation Tool
export const BuildToken = async (
  signerProvider: SignerProvider,
  symbol: string,
  name: string,
  decimals: string,
  supply: string
): Promise<ExecuteScriptResult> => {
  return await Buildtoken.execute(signerProvider, {
    initialFields: {
      contract: TokenCreate.contractId,
      symbol: web3.stringToHex(symbol),
      name: web3.stringToHex(name),
      decimals: BigInt(decimals),
      tokenTotal: BigInt(supply)
    },
    attoAlphAmount: DUST_AMOUNT + web3.ONE_ALPH                // Notice no Asset required here. Means the user doesn't require $PACA.
  })
}

// Destory Token Creation Tool
export const DestroyTokenCreator = async (
  signerProvider: SignerProvider,
  contract: string
): Promise<ExecuteScriptResult> => {
  return await Destroycreator.execute(signerProvider, {
    initialFields: {
      contract: "1db99e938897977a45a9467b63f3aa83515b28f0a49b2064935729b65a734400"
    },
    attoAlphAmount: DUST_AMOUNT
  })
}