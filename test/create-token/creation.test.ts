import {
    ALPH_TOKEN_ID,
    Address,
    NodeProvider,
    contractIdFromAddress,
    groupOfAddress,
  } from "@alephium/web3";
  import { PrivateKeyWallet } from "@alephium/web3-wallet";
  import { getSigners, testAddress } from "@alephium/web3-test";
  import { alph, CreateCoin, deployCreateToken, deployToken, randomP2PKHAddress } from "./utils";
  import { defaultSigner } from "./utils";
import { CreateTokenInstance, TokenInstance } from "../../artifacts/ts";
  
  const nodeProvider = new NodeProvider("http://127.0.0.1:22973");
  
  describe("test token creation", () => {
    const groupIndex = groupOfAddress(testAddress);
  
    let tokenTemplate: TokenInstance;
    let creatorTemplate: CreateTokenInstance;
  
    let lister: Address;
    let buyer: PrivateKeyWallet[];
  
    beforeEach(async () => {
      lister = randomP2PKHAddress(groupIndex);
      buyer = await getSigners(2, alph(1000), groupIndex);
        
      tokenTemplate = (await deployToken()).contractInstance;
      creatorTemplate = (await deployCreateToken(tokenTemplate)).contractInstance;
    }, 100000);
  
    test("test token creation", async () => {
      const creator = buyer[0];
      const spender = buyer[1];
  
      await CreateCoin(creator, creatorTemplate, "test", "prototype", 18, 1000);
    });
  });
  