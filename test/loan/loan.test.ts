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
import { AcceptLoan, GamifyProtocolInstance, LoanFactoryInstance, LoanInstance, MutableNFTInstance, NFTPublicSaleCollectionSequentialWithRoyaltyInstance, TokenInstance } from "../../artifacts/ts";
import { AcceptLoanService, CancelLoanService, CreateLoanService, DeployLoan, DeployLoanFactory } from "./loan_services";
  
  const nodeProvider = new NodeProvider("http://127.0.0.1:22973");
  
  describe("loanfi", () => {
    const groupIndex = groupOfAddress(testAddress);

    let loanFactoryTemplate: LoanFactoryInstance
    let loanTemplate: LoanInstance
  
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
        loanId = contractIdFromAddress(details.generatedOutputs[0].address)
        hexString = Array.from(loanId, byte => byte.toString(16).padStart(2, '0')).join('');

        await AcceptLoanService(spender, loanFactoryTemplate, hexString, ALPH_TOKEN_ID, 10000000000000000000)
      })
  });