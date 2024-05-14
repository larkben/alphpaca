import { DUST_AMOUNT, ExecutableScript, ExecuteScriptResult, SignerProvider, contractIdFromAddress } from '@alephium/web3'
import { Topup, Sendout, Destroy, Buildtoken, Gettoken, Editfee, Destroycreator, WithdrawAlph, DepositAlph, CollectFees } from '../../artifacts/ts/scripts'
import { TokenCreate, TokenFaucetConfig, TokenTemplate } from './utils'
import { Faucet, Token } from '../../artifacts/ts'
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
      contract: "9600a4512bbe8747bfa6fcb6a85d4f7fc97f1c59281e5a87ff168d2305096900",
      symbol: web3.stringToHex(symbol),
      name: web3.stringToHex(name),
      decimals: BigInt(decimals),
      tokenTotal: BigInt(supply)
    },
    attoAlphAmount: DUST_AMOUNT + web3.ONE_ALPH,
    tokens: [{id: web3.ALPH_TOKEN_ID, amount: 5000000000000000000n}]
    
  })
}

// Destory Token Creation Tool
export const DestroyTokenCreator = async (
  signerProvider: SignerProvider
): Promise<ExecuteScriptResult> => {
  return await Destroycreator.execute(signerProvider, {
    initialFields: {
      contract: "9600a4512bbe8747bfa6fcb6a85d4f7fc97f1c59281e5a87ff168d2305096900"
    },
    attoAlphAmount: DUST_AMOUNT
  })
}

// Collect Token Creator Fees
export const CollectCreatorFees = async (
  signerProvider: SignerProvider
): Promise<ExecuteScriptResult> => {
  return await CollectFees.execute(signerProvider, {
    initialFields: {
      contract: "9600a4512bbe8747bfa6fcb6a85d4f7fc97f1c59281e5a87ff168d2305096900"
    },
    attoAlphAmount: DUST_AMOUNT
  })
}

// ALPHFaucet
export const FaucetDeposit = async (
  signerProvider: SignerProvider,
  amount: string
): Promise<ExecuteScriptResult> => {
  return await WithdrawAlph.execute(signerProvider, {
    initialFields: {
      contract: "9600a4512bbe8747bfa6fcb6a85d4f7fc97f1c59281e5a87ff168d2305096900",
      amount: BigInt(amount)
    },
    attoAlphAmount: DUST_AMOUNT,
    tokens: [{id: web3.ALPH_TOKEN_ID, amount: BigInt(amount)}]
  })
}

// ALPHFaucet
export const FaucetWithdraw = async (
  signerProvider: SignerProvider,
  amount: string
): Promise<ExecuteScriptResult> => {
  return await DepositAlph.execute(signerProvider, {
    initialFields: {
      contract: "9600a4512bbe8747bfa6fcb6a85d4f7fc97f1c59281e5a87ff168d2305096900",
      amount: BigInt(amount)
    }
  })
}