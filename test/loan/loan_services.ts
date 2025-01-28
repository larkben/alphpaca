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
import { AcceptLoan, AcceptLoanTest, Buildtoken, CancelLoan, CancelLoanTest, CollectFees, CreateLoan, CreateLoanTest, CreateToken, CreateTokenInstance, EditValidContract, GamifyProtocol, GamifyProtocolInstance, Loan, LoanFactory, LoanFactoryInstance, LoanFactoryTest, LoanFactoryTestInstance, LoanInstance, LoanTest, LoanTestInstance, PayLoan, PayLoanTest, Supercharge, Token, TokenInstance, UpdateCreationFee } from '../../artifacts/ts'
import { start } from 'repl'
  
  web3.setCurrentNodeProvider('http://127.0.0.1:22973', undefined, fetch)
  export const ZERO_ADDRESS = 'tgx7VNFoP9DJiFMFgXXtafQZkUvyEdDHT9ryamHJYrjq'
  export const defaultSigner = new PrivateKeyWallet({ privateKey: testPrivateKey })
  
  const nodeProvider = new NodeProvider('http://127.0.0.1:22973') 

  // loan templates

  export async function DeployLoan() {
    return await LoanTest.deploy(defaultSigner, {
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

  export async function DeployLoanFactory(loan: LoanTestInstance) {
    return await LoanFactoryTest.deploy(defaultSigner, {
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
    loanFactory: LoanFactoryTestInstance,
    tokenRequested: string,
    tokenAmount: number,
    collateralToken: string,
    collateralAmount: number,
    interest: number,
    duration: number
  ) {
    return await CreateLoanTest.execute(signer, {
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
    loanFactory: LoanFactoryTestInstance,
    contract: string,
    token: string,
    amount: number,
    startTime: number
  ) {
    return await AcceptLoanTest.execute(signer, {
      initialFields: {
        loanFactory: loanFactory.contractId,
        contract: contract,
        interestTime: 0n,              // should always be zero in this case
        startTime: BigInt(startTime)
      },
      attoAlphAmount: DUST_AMOUNT, // 0.1 alph
      tokens: [{id: token, amount: BigInt(amount) }]
    });
  }

  export async function CancelLoanService (
    signer: SignerProvider,
    loanFactory: LoanFactoryTestInstance,
    contract: string
  ) {
    return await CancelLoanTest.execute(signer, {
      initialFields: {
        loanFactory: loanFactory.contractId,
        contract: contract
      },
      attoAlphAmount: DUST_AMOUNT, // 0.1 alph
    });
  }

  export async function PayLoanService (
    signer: SignerProvider,
    loanFactory: LoanFactoryTestInstance,
    contract: string,
    token: string,
    amount: number,
    interestTime: number
  ) {
    return await PayLoanTest.execute(signer, {
      initialFields: {
        loanFactory: loanFactory.contractId,
        contract: contract,
        interestTime: BigInt(interestTime)
      },
      attoAlphAmount: DUST_AMOUNT, // 0.1 alph
      tokens: [{id: token, amount: BigInt(amount) }]
    });
  }

// helper function

export async function CalculateLoanAssets (
  node: NodeProvider,
  contractAddress: string,
  time: number
) {
  let details = await node.contracts.getContractsAddressState(contractAddress)
  //console.log(details.mutFields[1].value)

  let startTime = Number(details.mutFields[1].value);
  let interestRate = Number(details.immFields[5].value); // Assuming interest is at index 2
  let principal = Number(details.immFields[2].value); // Assuming principal is at index 0

  console.log("start time is " + startTime + " interest rate: " + interestRate + " principal: " + principal)

  // Calculate the proportional interest based on elapsed time
  let elapsedTime = time - startTime; // Time difference in milliseconds
  let timeFactor = elapsedTime / 31556926000; // Convert to years (approx.)

  // Calculate the gain for the elapsed time
  let gain = (principal * interestRate * timeFactor) / 10000;

  // Return the original amount plus interest
  console.log(principal + gain)
  return principal + gain + 100000000000000000 // .1 overhead
}