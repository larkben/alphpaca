import {
    ALPH_TOKEN_ID,
    Address,
    DUST_AMOUNT,
    HexString,
    MAP_ENTRY_DEPOSIT,
    MINIMAL_CONTRACT_DEPOSIT,
    NodeProvider,
    ONE_ALPH,
    SignerProvider,
    addressVal,
    binToHex,
    byteVecVal,
    encodePrimitiveValues,
    groupOfAddress,
    hexToBinUnsafe,
    prettifyAttoAlphAmount,
    stringToHex,
    u256Val,
    web3
  } from '@alephium/web3'
  import { randomBytes } from 'crypto'
  import * as base58 from 'bs58'
  import * as blake from 'blakejs'
  import { PrivateKeyWallet } from '@alephium/web3-wallet'
  import { testPrivateKey } from '@alephium/web3-test'
  import { off } from 'process'
  import { ValByteVec } from '@alephium/web3/dist/src/api/api-alephium'
  import { MinimalContractDeposit, NullContractAddress, token } from '@alephium/web3/dist/src/codec'
import { AcceptLoan, AcceptLoanTest, AddFundsTest, BidLoanTest, Buildtoken, CancelLoan, CancelLoanTest, CollectFees, CreateLoan, CreateLoaneeMarketTest, CreateLoanTest, CreateToken, CreateTokenInstance, DestroyMarketTest, EditInterestTest, EditLiquidateTest, EditTimeTest, EditValidContract, ForfeitLoanTest, GamifyProtocol, GamifyProtocolInstance, Loan, LoaneeMarket, LoaneeMarketInstance, LoanFactory, LoanFactoryInstance, LoanFactoryTest, LoanFactoryTestInstance, LoanInstance, LoanTest, LoanTestInstance, PayLoan, PayLoanTest, RedeemLoanTest, Supercharge, TestOracleInstance, Token, TokenInstance, UpdateCreationFee, WithdrawFundsTest } from '../../artifacts/ts'
import { start } from 'repl'
  
  web3.setCurrentNodeProvider('http://127.0.0.1:22973', undefined, fetch)
  export const ZERO_ADDRESS = 'tgx7VNFoP9DJiFMFgXXtafQZkUvyEdDHT9ryamHJYrjq'
  export const defaultSigner = new PrivateKeyWallet({ privateKey: testPrivateKey })
  
  const nodeProvider = new NodeProvider('http://127.0.0.1:22973') 

export async function CreateLoaneeMarketService (
    signer: SignerProvider,
    loanFactory: LoanFactoryInstance,
    token: string,
    tokenAmount: number,
    minInterest: number,
    maxTime: number,
    liquidation: boolean
  ) {
    return await CreateLoaneeMarketTest.execute(signer, {
      initialFields: {
          loanFactory: loanFactory.contractId,
          token: token,
          tokenAmount: BigInt(tokenAmount),
          minInterest: BigInt(minInterest),
          maxTime: BigInt(maxTime),
          liquidation: liquidation
      },
      attoAlphAmount: DUST_AMOUNT, // 0.1 alph
      tokens: [{id: token, amount: BigInt(tokenAmount)}]
    });
  }

  export async function EditInterestService (
    signer: SignerProvider,
    loanFactory: LoanFactoryInstance,
    contractId: string,
    interest: number
  ) {
    return await EditInterestTest.execute(signer, {
      initialFields: {
          loanFactory: loanFactory.contractId,
          contractId: contractId,
          newInterest: BigInt(interest)
      },
      attoAlphAmount: DUST_AMOUNT, // 0.1 alph
    });
  }

  export async function EditMaxTimeService (
    signer: SignerProvider,
    loanFactory: LoanFactoryInstance,
    contractId: string,
    time: number
  ) {
    return await EditTimeTest.execute(signer, {
      initialFields: {
          loanFactory: loanFactory.contractId,
          contractId: contractId,
          newTime: BigInt(time)
      },
      attoAlphAmount: DUST_AMOUNT, // 0.1 alph
    });
  }

  export async function WithdrawFundsService (
    signer: SignerProvider,
    loanFactory: LoanFactoryInstance,
    contractId: string,
    token: string,
    amount: number
  ) {
    return await WithdrawFundsTest.execute(signer, {
      initialFields: {
          loanFactory: loanFactory.contractId,
          contractId: contractId,
          token: token,
          amount: BigInt(amount)
      },
      attoAlphAmount: DUST_AMOUNT, // 0.1 alph
    });
  }

  export async function EditLiquidateService (
    signer: SignerProvider,
    loanFactory: LoanFactoryInstance,
    contractId: string,
    liquid: boolean
  ) {
    return await EditLiquidateTest.execute(signer, {
      initialFields: {
          loanFactory: loanFactory.contractId,
          contractId: contractId,
          liquid: liquid
      },
      attoAlphAmount: DUST_AMOUNT, // 0.1 alph
    });
  }

  export async function AddFundsService (
    signer: SignerProvider,
    loanFactory: LoanFactoryInstance,
    contractId: string,
    token: string,
    amount: number,
    gas: boolean
  ) {
    return await AddFundsTest.execute(signer, {
      initialFields: {
          loanFactory: loanFactory.contractId,
          contractId: contractId,
          token: token,
          amount: BigInt(amount),
          gas: gas
      },
      attoAlphAmount: DUST_AMOUNT, // 0.1 alph
    });
  }

  export async function DestroyMarketService (
    signer: SignerProvider,
    loanFactory: LoanFactoryInstance,
    contractId: string
  ) {
    return await DestroyMarketTest.execute(signer, {
      initialFields: {
          loanFactory: loanFactory.contractId,
          contractId: contractId
      },
      attoAlphAmount: DUST_AMOUNT, // 0.1 alph
    });
  }