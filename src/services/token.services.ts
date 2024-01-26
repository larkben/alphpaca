import { DUST_AMOUNT, ExecutableScript, ExecuteScriptResult, SignerProvider, contractIdFromAddress } from '@alephium/web3'
import { Topup, Sendout, Destroy, Buildtoken, Gettoken, Editfee, Destroytoken, Burn } from '../../artifacts/ts/scripts'
import { TokenCreate, TokenFaucetConfig, TokenTemplate } from './utils'
import { BurnToken, Faucet, Token } from '../../artifacts/ts'
import * as web3 from '@alephium/web3'

// Token Creation Functions
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

// Destory Contract
export const DestroyToken = async (
    signerProvider: SignerProvider,
    contract: string
): Promise<ExecuteScriptResult> => {
    return await Destroytoken.execute(signerProvider, {
      initialFields: {
        contract: contract
      },
      attoAlphAmount: DUST_AMOUNT + web3.ONE_ALPH                // Notice no Asset required here. Means the user doesn't require $PACA.
    })
}