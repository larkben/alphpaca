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
import { alph, randomP2PKHAddress } from "../create-token/utils";
import { AcceptLoan, GamifyProtocolInstance, LoanFactoryInstance, LoanFactoryTestInstance, LoanInstance, LoanTestInstance, MutableNFTInstance, NFTPublicSaleCollectionSequentialWithRoyaltyInstance, TokenInstance } from "../../artifacts/ts";
import { AcceptLoanService, CalculateLoanAssets, CancelLoanService, CreateLoanService, DeployLoan, DeployLoanFactory, PayLoanService } from "./loan_services";
import { debug } from "console";
  
  const nodeProvider = new NodeProvider("http://127.0.0.1:22973");
  
  describe("loanfi", () => {
    const groupIndex = groupOfAddress(testAddress);

    let loanFactoryTemplate: LoanFactoryTestInstance
    let loanTemplate: LoanTestInstance
  
    let lister: Address;
    let buyer: PrivateKeyWallet[];
  
    beforeEach(async () => {
      lister = randomP2PKHAddress(groupIndex);
      buyer = await getSigners(2, alph(1000), groupIndex);

      loanTemplate = (await DeployLoan()).contractInstance
      loanFactoryTemplate = (await DeployLoanFactory(loanTemplate)).contractInstance
    });
  
    test('loan (loanfi)', async () => {
        const creator = buyer[0]
        const spender = buyer[1]
    
        let loanOne = await CreateLoanService(creator, loanFactoryTemplate, ALPH_TOKEN_ID, 10000000000000000000, ALPH_TOKEN_ID, 20000000000000000000, 1000, 3000)

        let details = await nodeProvider.transactions.getTransactionsDetailsTxid((loanOne).txId)
        let loanId = contractIdFromAddress(details.generatedOutputs[0].address)
        let hexString = Array.from(loanId, byte => byte.toString(16).padStart(2, '0')).join('');

        await CancelLoanService(creator, loanFactoryTemplate, hexString)

        loanOne = await CreateLoanService(creator, loanFactoryTemplate, ALPH_TOKEN_ID, 10000000000000000000, ALPH_TOKEN_ID, 20000000000000000000, 1000, 3000)

        details = await nodeProvider.transactions.getTransactionsDetailsTxid((loanOne).txId)
        let contractAddress = details.generatedOutputs[0].address

        loanId = contractIdFromAddress(details.generatedOutputs[0].address)
        hexString = Array.from(loanId, byte => byte.toString(16).padStart(2, '0')).join('');

        await AcceptLoanService(spender, loanFactoryTemplate, hexString, ALPH_TOKEN_ID, 10000000000000000000)

        // calculate the amount
        let calculatedAmount = await CalculateLoanAssets(nodeProvider, contractAddress, 1751130767000)

        await PayLoanService(creator, loanFactoryTemplate, hexString, ALPH_TOKEN_ID, calculatedAmount)

        // next test with various tokens (decimals, etc)
      })
  });