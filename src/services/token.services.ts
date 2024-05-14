import { DUST_AMOUNT, ExecutableScript, ExecuteScriptResult, SignerProvider, addressFromContractId, contractIdFromAddress, hexToString } from '@alephium/web3'
import { Topup, Sendout, Destroy, Buildtoken, Gettoken, Editfee, Destroycreator, WithdrawAlph, DepositAlph, CollectFees, CreateStakeProject, CollectStakeFees, AddStake, WithdrawStake, EditRewards, Distribute } from '../../artifacts/ts/scripts'
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

// Rhone Gasless Transactions Tests
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

// ------------------------------------------------- //
//                                                   //
//                 Staking V1 - 5/14/24              //
//                                                   //
// ------------------------------------------------- //

// CreateStakeFactory Project Creation
export const CreateStakeFactory = async (
  signerProvider: SignerProvider,
  tokenid: string
): Promise<ExecuteScriptResult> => {
  return await CreateStakeProject.execute(signerProvider, {
    initialFields: {
      contract: "9600a4512bbe8747bfa6fcb6a85d4f7fc97f1c59281e5a87ff168d2305096900",
      token: tokenid
    },
    attoAlphAmount: DUST_AMOUNT
  })
}

// CreateStakeFactory Fee Collection
export const CollectFactoryFees = async (
  signerProvider: SignerProvider
): Promise<ExecuteScriptResult> => {
  return await CollectStakeFees.execute(signerProvider, {
    initialFields: {
      contract: "9600a4512bbe8747bfa6fcb6a85d4f7fc97f1c59281e5a87ff168d2305096900",
    },
    attoAlphAmount: DUST_AMOUNT
  })
}

// End of Factory

async function getProjectToken(contract: string) : Promise<string> {
  const address = addressFromContractId(contract)

  fetch(`https://wallet-v20.mainnet.alephium.org/contracts/${address}/state`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            return response.json();
            })
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

  return "Hello"
}

export const CreateStake = async (
  signerProvider: SignerProvider,
  contract: string,
  amount: string
): Promise<ExecuteScriptResult> => {
  return await AddStake.execute(signerProvider, {
    initialFields: {
      contract: contract,
      amount: BigInt(amount)
    },
    attoAlphAmount: DUST_AMOUNT,
    tokens: [{id: await getProjectToken(contract), amount: 5000000000000000000n}]
  })
}

export const RemoveStake = async (
  signerProvider: SignerProvider,
  contract: string,
  amount: string
): Promise<ExecuteScriptResult> => {
  return await WithdrawStake.execute(signerProvider, {
    initialFields: {
      contract: contract,
      amount: BigInt(amount)
    },
    attoAlphAmount: DUST_AMOUNT
  })
}

// we can fetch contract state here to get the staking value
export const EditStakeRewards = async (
  signerProvider: SignerProvider,
  contract: string,
  newreward: string
): Promise<ExecuteScriptResult> => {
  return await EditRewards.execute(signerProvider, {
    initialFields: {
      contract: contract,
      newreward: BigInt(newreward)
    },
    attoAlphAmount: DUST_AMOUNT
  })
}

async function calculateRewards(contract: string) : Promise<string> {
  const address = addressFromContractId(contract)

  fetch(`https://wallet-v20.mainnet.alephium.org/contracts/${address}/state`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            return response.json();
            })
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

  return "Hello"
}

// generate contract formula to fetch desired token expectations
export const DistributeRewards = async (
  signerProvider: SignerProvider,
  contract: string,
  newreward: string
): Promise<ExecuteScriptResult> => {
  return await Distribute.execute(signerProvider, {
    initialFields: {
      contract: contract
    },
    attoAlphAmount: DUST_AMOUNT,
    tokens: [{id: await getProjectToken(contract), amount: 5000000000000000000n}]
  })
}