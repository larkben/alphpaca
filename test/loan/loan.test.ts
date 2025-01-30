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
import { AcceptLoan, CreateTokenInstance, GamifyProtocolInstance, LoaneeMarketInstance, LoanFactoryInstance, LoanFactoryTestInstance, LoanInstance, LoanTestInstance, MutableNFTInstance, NFTPublicSaleCollectionSequentialWithRoyaltyInstance, TestOracleInstance, TokenInstance, UpdateTime } from "../../artifacts/ts";
import { AcceptLoanService, AddTokenMapping, CalculateLoanAssets, CancelLoanService, CreateLoanService, defaultSigner, DeployLoan, DeployLoanFactory, DeployMarket, PayLoanService } from "./loan_services";
import { debug } from "console";
import { AddOraclePair, DeployTimeOracle, UpdateOracleTime, UpdateOracleValue } from "./time_services";
  
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
      buyer = await getSigners(2, alph(1000), groupIndex);

      oracleTemplate = (await DeployTimeOracle()).contractInstance

      marketTemplate = (await DeployMarket()).contractInstance
      loanTemplate = (await DeployLoan(oracleTemplate)).contractInstance
      loanFactoryTemplate = (await DeployLoanFactory(loanTemplate, oracleTemplate, marketTemplate)).contractInstance

      tokenTemplate = (await deployToken()).contractInstance;
      creatorTemplate = (await deployCreateToken(tokenTemplate)).contractInstance;
    });
  
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

        await UpdateOracleValue(creator, oracleTemplate, "BTC/USD", 105189_08955622122)
        await UpdateOracleValue(creator, oracleTemplate, "ALPH/USD", 8392017041720942)
        await UpdateOracleValue(creator, oracleTemplate, "ETH/USD", 3271_7193267584776)

        // create 2 tokens (btc and eth)

        // add alph
        await AddTokenMapping(defaultSigner, loanFactoryTemplate, ALPH_TOKEN_ID, true, false, "")
        await AddTokenMapping(defaultSigner, loanFactoryTemplate, ALPH_TOKEN_ID, false, true, "ALPH/USD")

        /*
        // next test with various tokens (decimals, etc)
        let tokenDetails = await CreateCoin(creator, creatorTemplate, "test", "prototype", 18, 100000000000000000000); // 18 decimals

        let assets = await nodeProvider.addresses.getAddressesAddressBalance(creator.address)
        const ids = assets.tokenBalances?.map(token => token.id) ?? [];

        loanOne = await CreateLoanService(creator, loanFactoryTemplate, ids[0], 20000, ALPH_TOKEN_ID, 10000000000000000000, 800, 3000, false)

        details = await nodeProvider.transactions.getTransactionsDetailsTxid((loanOne).txId)
        contractAddress = details.generatedOutputs[0].address

        loanId = contractIdFromAddress(details.generatedOutputs[0].address)
        hexString = Array.from(loanId, byte => byte.toString(16).padStart(2, '0')).join('');

        await AcceptLoanService(creator, loanFactoryTemplate, hexString, ids[0], 20000)

        calculatedAmount = await CalculateLoanAssets(nodeProvider, contractAddress, 1751130767000)

        await PayLoanService(creator, loanFactoryTemplate, hexString, ids[0], calculatedAmount)
        */
      })
  });