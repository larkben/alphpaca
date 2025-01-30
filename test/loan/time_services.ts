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
import { AcceptLoan, AcceptLoanTest, AddPair, Buildtoken, CancelLoan, CancelLoanTest, CollectFees, CreateLoan, CreateLoanTest, CreateToken, CreateTokenInstance, EditValidContract, GamifyProtocol, GamifyProtocolInstance, Loan, LoanFactory, LoanFactoryInstance, LoanFactoryTest, LoanFactoryTestInstance, LoanInstance, LoanTest, LoanTestInstance, PayLoan, PayLoanTest, Supercharge, TestOracle, TestOracleInstance, Token, TokenInstance, UpdateCreationFee, UpdateTime, UpdateValue } from '../../artifacts/ts'
import { start } from 'repl'
  
  web3.setCurrentNodeProvider('http://127.0.0.1:22973', undefined, fetch)
  export const ZERO_ADDRESS = 'tgx7VNFoP9DJiFMFgXXtafQZkUvyEdDHT9ryamHJYrjq'
  export const defaultSigner = new PrivateKeyWallet({ privateKey: testPrivateKey })
  
  const nodeProvider = new NodeProvider('http://127.0.0.1:22973') 

  // loan templates

  export async function DeployTimeOracle() {
    return await TestOracle.deploy(defaultSigner, {
      initialFields: {
        currentTime: 0n
      },
    });
  }

  export async function UpdateOracleValue(
    signer: SignerProvider,
    timeOracle: TestOracleInstance,
    pair: string,
    value: number
  ) {
    return await UpdateValue.execute(signer, {
      initialFields: {
          oracle: timeOracle.contractId,
          pair: stringToHex(pair),
          value: BigInt(value)
      },
      attoAlphAmount: DUST_AMOUNT, // 0.1 alph
    });
  }

  export async function AddOraclePair(
    signer: SignerProvider,
    timeOracle: TestOracleInstance,
    pair: string
  ) {
    return await AddPair.execute(signer, {
      initialFields: {
          oracle: timeOracle.contractId,
          pair: stringToHex(pair)
      },
      attoAlphAmount: DUST_AMOUNT +  MINIMAL_CONTRACT_DEPOSIT, // 0.1 alph
    });
  }

  export async function UpdateOracleTime(
    signer: SignerProvider,
    timeOracle: TestOracleInstance,
    time: number
  ) {
    return await UpdateTime.execute(signer, {
      initialFields: {
          oracle: timeOracle.contractId,
          time: BigInt(time)
      },
      attoAlphAmount: DUST_AMOUNT, // 0.1 alph
    });
  }