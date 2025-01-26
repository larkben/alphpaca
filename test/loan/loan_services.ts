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
import { AcceptLoan, Buildtoken, CancelLoan, CollectFees, CreateLoan, CreateToken, CreateTokenInstance, EditValidContract, GamifyProtocol, GamifyProtocolInstance, Loan, LoanFactory, LoanFactoryInstance, LoanInstance, PayLoan, Supercharge, Token, TokenInstance, UpdateCreationFee } from '../../artifacts/ts'
  
  web3.setCurrentNodeProvider('http://127.0.0.1:22973', undefined, fetch)
  export const ZERO_ADDRESS = 'tgx7VNFoP9DJiFMFgXXtafQZkUvyEdDHT9ryamHJYrjq'
  export const defaultSigner = new PrivateKeyWallet({ privateKey: testPrivateKey })
  
  const nodeProvider = new NodeProvider('http://127.0.0.1:22973') 

  // loan templates

  export async function DeployLoan() {
    return await Loan.deploy(defaultSigner, {
      initialFields: {
          creator: defaultSigner.account.address,
          loanee: ZERO_ADDRESS,
          tokenRequested: '',
          tokenAmount: 0n,
          collateralToken: '',
          collateralAmount: 0n,
          interest: 0n,
          rate: 0n,
          duration: 0n,
          startTime: 0n,
          active: false,
          parentContract: ZERO_ADDRESS
      },
    });
  }

  export async function DeployLoanFactory(loan: LoanInstance) {
    return await LoanFactory.deploy(defaultSigner, {
      initialFields: {
          admin: defaultSigner.account.address,
          loanTemplate: loan.contractId,
          activeLoans: 0n,
          rate: 200n                            // 2%
      },
    });
  }

  export async function CreateLoanService(
    signer: SignerProvider,
    loanFactory: LoanFactoryInstance,
    tokenRequested: string,
    tokenAmount: number,
    collateralToken: string,
    collateralAmount: number,
    interest: number,
    duration: number
  ) {
    return await CreateLoan.execute(signer, {
      initialFields: {
          loanFactory: loanFactory.contractId,
          tokenRequested: tokenRequested,
          tokenAmount: BigInt(tokenAmount),
          collateralToken: collateralToken,
          collateralAmount: BigInt(collateralAmount),
          interest: BigInt(interest),
          duration: BigInt(duration)
      },
      attoAlphAmount: (DUST_AMOUNT * 2n) + MINIMAL_CONTRACT_DEPOSIT, // 0.1 alph
      tokens: [{id: collateralToken, amount: BigInt(collateralAmount) }]
    });
  }

  export async function AcceptLoanService (
    signer: SignerProvider,
    loanFactory: LoanFactoryInstance,
    contract: string,
    token: string,
    amount: number
  ) {
    return await AcceptLoan.execute(signer, {
      initialFields: {
        loanFactory: loanFactory.contractId,
        contract: contract
      },
      attoAlphAmount: DUST_AMOUNT, // 0.1 alph
      tokens: [{id: token, amount: BigInt(amount) }]
    });
  }

  export async function CancelLoanService (
    signer: SignerProvider,
    loanFactory: LoanFactoryInstance,
    contract: string
  ) {
    return await CancelLoan.execute(signer, {
      initialFields: {
        loanFactory: loanFactory.contractId,
        contract: contract
      },
      attoAlphAmount: DUST_AMOUNT, // 0.1 alph
    });
  }

  export async function PayLoanService (
    signer: SignerProvider,
    loanFactory: LoanFactoryInstance,
    contract: string,
    token: string,
    amount: number
  ) {
    return await PayLoan.execute(signer, {
      initialFields: {
        loanFactory: loanFactory.contractId,
        contract: contract
      },
      attoAlphAmount: DUST_AMOUNT, // 0.1 alph
      tokens: [{id: token, amount: BigInt(amount) }]
    });
  }