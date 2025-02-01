import {
    ALPH_TOKEN_ID,
    Address,
    NodeProvider,
    contractIdFromAddress,
    groupOfAddress,
} from "@alephium/web3";
import { PrivateKeyWallet } from "@alephium/web3-wallet";
import { getSigners, testAddress } from "@alephium/web3-test";
import { alph, randomP2PKHAddress } from "../create-token/utils";
import { GamifyProtocolInstance, MutableNFTInstance, NFTPublicSaleCollectionSequentialWithRoyaltyInstance, TokenInstance } from "../../artifacts/ts";
import { createCustomCollection, createNFT, defaultSigner, deployCollection, deployNFT } from "./nft-helper";
import { AddApprovedNFTCollection, GamifyProtocoldeploy, SuperchargeNFT } from "./supercharge_services";
  
  const nodeProvider = new NodeProvider("http://127.0.0.1:22973");
  
  describe("gamefi (supercharge)", () => {
    const groupIndex = groupOfAddress(testAddress);

    let collectionTemplate: NFTPublicSaleCollectionSequentialWithRoyaltyInstance
    let mutableNFTTemplate: MutableNFTInstance

    let gamefiTemplate: GamifyProtocolInstance
  
    let lister: Address;
    let buyer: PrivateKeyWallet[];
  
    beforeEach(async () => {
      lister = randomP2PKHAddress(groupIndex);
      buyer = await getSigners(2, alph(1000), groupIndex);

      collectionTemplate = (await deployCollection()).contractInstance
      mutableNFTTemplate = (await deployNFT()).contractInstance

      gamefiTemplate = (await GamifyProtocoldeploy()).contractInstance
    }, 100000);
  
    test('gamefi (supercharging)', async () => {
        const creator = buyer[0]
        const spender = buyer[1]
    
        // collection creation mint and mint nft
        let customcollection = createCustomCollection(creator, collectionTemplate, mutableNFTTemplate, 10, 500, 10, 1000000000000000000)
    
        let details = await nodeProvider.transactions.getTransactionsDetailsTxid((await customcollection).txId)
        //console.log(details)
    
        const u8int = contractIdFromAddress(details.generatedOutputs[0].address)
        const hexString = Array.from(u8int, byte => byte.toString(16).padStart(2, '0')).join('');

        //const collectionAddress = details.generatedOutputs[0].address
    
        for (let x = 0; x < 9; x = x + 1) {
          await createNFT(creator, hexString, 1000000000000000000, ALPH_TOKEN_ID, true, false)
        }
    
        let assets = await nodeProvider.addresses.getAddressesAddressBalance(creator.address)
    
        const ids = assets.tokenBalances?.map(token => token.id) ?? [];

        await AddApprovedNFTCollection(defaultSigner, gamefiTemplate, hexString)

        await SuperchargeNFT(creator, gamefiTemplate, ids[0])
      })
  });