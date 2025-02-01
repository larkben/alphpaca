import {
    ALPH_TOKEN_ID,
    Address,
    NodeProvider,
    ONE_ALPH,
    addressFromContractId,
    contractIdFromAddress,
    groupOfAddress,
} from "@alephium/web3";
import { PrivateKeyWallet } from "@alephium/web3-wallet";
import { getSigners, testAddress } from "@alephium/web3-test";
import { alph, CreateCoin, deployCreateToken, deployToken, randomP2PKHAddress } from "../create-token/utils";
import { AcceptLoan, CreateTokenInstance, ForfeitLoanTest, GamifyProtocolInstance, LoaneeMarketInstance, LoanFactoryInstance, LoanFactoryTestInstance, LoanInstance, LoanTestInstance, MutableNFTInstance, NFTPublicSaleCollectionSequentialWithRoyaltyInstance, TestOracleInstance, TokenInstance, UpdateTime } from "../../artifacts/ts";
import { AcceptLoanService, AddTokenMapping, CalculateLoanAssets, CancelLoanService, CreateLoanService, defaultSigner, DeployLoan, DeployLoanFactory, DeployMarket, ForfeitLoanService, LiquidationLoanService, PayLoanService } from "./loan_services";
import { debug } from "console";
import { AddOraclePair, DeployTimeOracle, UpdateOracleTime, UpdateOracleValue } from "./time_services";
import { AddFundsService, CreateLoaneeMarketService, DestroyMarketService, MarketUpdateService, WithdrawFundsService } from "./market_services";
  
  const nodeProvider = new NodeProvider("http://127.0.0.1:22973");
  
  describe("loanfi", () => {
    const groupIndex = groupOfAddress(testAddress);

    let oracleTemplate: TestOracleInstance

    let loanFactoryTemplate: LoanFactoryTestInstance
    let loanTemplate: LoanTestInstance
    let marketTemplate: LoaneeMarketInstance

    let tokenTemplate: TokenInstance;
    let creatorTemplate: CreateTokenInstance;
  
    let lister: Address;
    let buyer: PrivateKeyWallet[];
  
    beforeEach(async () => {
      lister = randomP2PKHAddress(groupIndex);
      buyer = await getSigners(2, alph(10000), groupIndex);

      oracleTemplate = (await DeployTimeOracle()).contractInstance

      marketTemplate = (await DeployMarket()).contractInstance
      loanTemplate = (await DeployLoan(oracleTemplate)).contractInstance
      loanFactoryTemplate = (await DeployLoanFactory(loanTemplate, oracleTemplate, marketTemplate)).contractInstance

      tokenTemplate = (await deployToken()).contractInstance;
      creatorTemplate = (await deployCreateToken(tokenTemplate)).contractInstance;
    }, 1000000);
  
    test('loan (loanfi)', async () => {
        const creator = buyer[0]
        const spender = buyer[1]

        // set time
        await UpdateOracleTime(creator, oracleTemplate, 1738256564000)
    
        let loanOne = await CreateLoanService(creator, loanFactoryTemplate, ALPH_TOKEN_ID, 10000000000000000000, ALPH_TOKEN_ID, 20000000000000000000, 1000, 604800000, false)

        let details = await nodeProvider.transactions.getTransactionsDetailsTxid((loanOne).txId)
        let loanId = contractIdFromAddress(details.generatedOutputs[0].address)
        let hexString = Array.from(loanId, byte => byte.toString(16).padStart(2, '0')).join('');

        await CancelLoanService(creator, loanFactoryTemplate, hexString)

        loanOne = await CreateLoanService(creator, loanFactoryTemplate, ALPH_TOKEN_ID, 10000000000000000000, ALPH_TOKEN_ID, 20000000000000000000, 1000, 604800000, false)

        details = await nodeProvider.transactions.getTransactionsDetailsTxid((loanOne).txId)
        let contractAddress = details.generatedOutputs[0].address

        loanId = contractIdFromAddress(details.generatedOutputs[0].address)
        hexString = Array.from(loanId, byte => byte.toString(16).padStart(2, '0')).join('');

        await AcceptLoanService(spender, loanFactoryTemplate, hexString, ALPH_TOKEN_ID, 10000000000000000000)

        await UpdateOracleTime(creator, oracleTemplate, 1738256564000 + 60480000)

        // calculate the amount
        console.log(contractAddress)
        let calculatedAmount = await CalculateLoanAssets(nodeProvider, contractAddress, 1738256564000 + 60480000)

        await PayLoanService(creator, loanFactoryTemplate, hexString, ALPH_TOKEN_ID, calculatedAmount)

        // oracle pairs setup

        await AddOraclePair(creator, oracleTemplate, "BTC/USD")
        await AddOraclePair(creator, oracleTemplate, "ALPH/USD")
        await AddOraclePair(creator, oracleTemplate, "ETH/USD")

        await UpdateOracleValue(creator, oracleTemplate, "BTC/USD", 10534011153980)
        await UpdateOracleValue(creator, oracleTemplate, "ALPH/USD", 163418282)
        await UpdateOracleValue(creator, oracleTemplate, "ETH/USD", 3271_7193267584776) // update this!!!

        // create 2 tokens (btc and eth)

        // add the other token here
        //await AddTokenMapping(defaultSigner, loanFactoryTemplate, ALPH_TOKEN_ID, true, "BTC/USD")
        await AddTokenMapping(defaultSigner, loanFactoryTemplate, ALPH_TOKEN_ID, true, "ALPH/USD", 18)

        // next test with various tokens (decimals, etc)
        await UpdateOracleTime(creator, oracleTemplate, 1738256564000)

        let tokenDetails = await CreateCoin(creator, creatorTemplate, "test", "prototype", 6, 100000000000000000000); // 18 decimals

        let assets = await nodeProvider.addresses.getAddressesAddressBalance(creator.address)
        const ids = assets.tokenBalances?.map(token => token.id) ?? [];

        // minimum on 2000 tokens is 20,000 seconds or 5.5 hours with 8% apr
        loanOne = await CreateLoanService(creator, loanFactoryTemplate, ids[0], 20000, ALPH_TOKEN_ID, 10000000000000000000, 1000, 20000000, false)

        details = await nodeProvider.transactions.getTransactionsDetailsTxid((loanOne).txId)
        contractAddress = details.generatedOutputs[0].address

        loanId = contractIdFromAddress(details.generatedOutputs[0].address)
        hexString = Array.from(loanId, byte => byte.toString(16).padStart(2, '0')).join('');

        await AcceptLoanService(creator, loanFactoryTemplate, hexString, ids[0], 20000)

        await UpdateOracleTime(creator, oracleTemplate, 1738256564000 + 20000000)

        calculatedAmount = await CalculateLoanAssets(nodeProvider, contractAddress, 1738256564000 + 20000000)

        await PayLoanService(creator, loanFactoryTemplate, hexString, ids[0], calculatedAmount)

        // assign token to mapping for oracle

        await AddTokenMapping(defaultSigner, loanFactoryTemplate, ids[0], true, "BTC/USD", 6)

        // testing forfeit

        await UpdateOracleTime(creator, oracleTemplate, 1738256564000)

        // minimum on 2000 tokens is 20,000 seconds or 5.5 hours with 8% apr
        loanOne = await CreateLoanService(creator, loanFactoryTemplate, ALPH_TOKEN_ID, 10000000000000000000, ids[0], 1000000, 1000, 20000000, false)

        details = await nodeProvider.transactions.getTransactionsDetailsTxid((loanOne).txId)
        contractAddress = details.generatedOutputs[0].address

        loanId = contractIdFromAddress(details.generatedOutputs[0].address)
        hexString = Array.from(loanId, byte => byte.toString(16).padStart(2, '0')).join('');

        await AcceptLoanService(creator, loanFactoryTemplate, hexString, ALPH_TOKEN_ID, 10000000000000000000)

        await UpdateOracleTime(creator, oracleTemplate, 1738256564000 + 21000000) // forefit after 2.1m seconds

        await ForfeitLoanService(creator, loanFactoryTemplate, hexString)

        // confirm forefit does not work on liquidation loan - good
        /*
        await UpdateOracleTime(creator, oracleTemplate, 1738256564000)

        loanOne = await CreateLoanService(creator, loanFactoryTemplate, ids[0], 40000, ALPH_TOKEN_ID, 10000000000000000000, 800, 20000000, true)

        details = await nodeProvider.transactions.getTransactionsDetailsTxid((loanOne).txId)
        contractAddress = details.generatedOutputs[0].address

        loanId = contractIdFromAddress(details.generatedOutputs[0].address)
        hexString = Array.from(loanId, byte => byte.toString(16).padStart(2, '0')).join('');

        await AcceptLoanService(creator, loanFactoryTemplate, hexString, ids[0], 40000)

        await UpdateOracleTime(creator, oracleTemplate, 1738256564000 + 21000000)

        await ForfeitLoanService(creator, loanFactoryTemplate, hexString)
        */

        // test liquidation loans
        await UpdateOracleTime(creator, oracleTemplate, 1738256564000)

        loanOne = await CreateLoanService(creator, loanFactoryTemplate, ALPH_TOKEN_ID, 1000000000000000000, ALPH_TOKEN_ID, 1000000000000000000, 800, 20000000, true) // 1 bitcoin and 10 alph

        details = await nodeProvider.transactions.getTransactionsDetailsTxid((loanOne).txId)
        contractAddress = details.generatedOutputs[0].address

        loanId = contractIdFromAddress(details.generatedOutputs[0].address)
        hexString = Array.from(loanId, byte => byte.toString(16).padStart(2, '0')).join('');

        await AcceptLoanService(creator, loanFactoryTemplate, hexString, ALPH_TOKEN_ID, 1000000000000000000)

        await UpdateOracleTime(creator, oracleTemplate, 1738256564000 + 20000000)

        let liq = await nodeProvider.contracts.getContractsAddressState(contractAddress)
        // console.log(liq)

        await LiquidationLoanService(creator, loanFactoryTemplate, hexString)

        // bidding
        // ...

        // redeem
        // ...

        let market = await CreateLoaneeMarketService(creator, loanFactoryTemplate, ALPH_TOKEN_ID, BigInt(100_000000_000000_000000), 10_000000_000000_000000, 500, 2629743000, true) // 100 alph | 10 alph minimum

        details = await nodeProvider.transactions.getTransactionsDetailsTxid((market).txId)
        contractAddress = details.generatedOutputs[0].address

        loanId = contractIdFromAddress(details.generatedOutputs[0].address)
        hexString = Array.from(loanId, byte => byte.toString(16).padStart(2, '0')).join('');

        // loanee market destroy
        await DestroyMarketService(creator, loanFactoryTemplate, hexString)

        // create for edits testing
        market = await CreateLoaneeMarketService(creator, loanFactoryTemplate, ALPH_TOKEN_ID, BigInt(100_000000_000000_000000), 10_000000_000000_000000, 500, 2629743000, true) // 100 alph | 10 alph minimum

        details = await nodeProvider.transactions.getTransactionsDetailsTxid((market).txId)
        contractAddress = details.generatedOutputs[0].address

        loanId = contractIdFromAddress(details.generatedOutputs[0].address)
        hexString = Array.from(loanId, byte => byte.toString(16).padStart(2, '0')).join('');

        // loanee market edits / withdraw and funding
        await MarketUpdateService(creator, loanFactoryTemplate, hexString, 5_000000_000000_000000, 600, 2329743000, false)

        // loanee market accept
        await WithdrawFundsService(creator, loanFactoryTemplate, hexString, ALPH_TOKEN_ID, 10_000000_000000_000000)
        let m = await nodeProvider.contracts.getContractsAddressState(addressFromContractId(hexString))
        console.log(m)

        /*
        await AddFundsService(creator, loanFactoryTemplate, hexString, ALPH_TOKEN_ID, 10_000000_000000_000000, true)
        m = await nodeProvider.contracts.getContractsAddressState(addressFromContractId(hexString))
        console.log(m)
        */
      }, 1000000)
  });