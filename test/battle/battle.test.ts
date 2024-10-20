import { ALPH_TOKEN_ID, Address, NodeProvider, ONE_ALPH, addressFromContractId, contractIdFromAddress, fetchContractState, groupOfAddress, sleep, web3 } from '@alephium/web3'
import {
  CancelCOffer,
  ConfirmCollectionOffer,
  ConfirmOffer,
  CreateCollectionOffer,
  CreateListing,
  CreateOffer,
  EditListing,
  PurchaseListing,
  UnlistListing,
  ZERO_ADDRESS, alph, deployCollectionOffer, deployListing, deployListingFactory, deployOffer, deployOfferFactory, getALPHBalance, getPreciseALPHBalance, randomP2PKHAddress,
  
} from './utils'
import { PrivateKeyWallet } from '@alephium/web3-wallet'
import { getSigners, mintToken, testAddress } from '@alephium/web3-test'
import { assert } from 'console'

const nodeProvider = new NodeProvider('http://127.0.0.1:22973') 

describe('test listing', () => {
  const groupIndex = groupOfAddress(testAddress)

  let listingTemplate: NFTListingInstance
  let offerTemplate: OfferInstance
  let collectionOfferTemplate: CollectionOfferInstance
  let listingFactory: ListingFactoryInstance
  let offerFactory: OfferFactoryInstance

  let collectionTemplate: NFTPublicSaleCollectionSequentialWithRoyaltyInstance
  let mutableNFTTemplate: MutableNFTInstance

  let lister: Address
  let buyer: PrivateKeyWallet[]

  beforeEach(async () => {
    lister = randomP2PKHAddress(groupIndex)
    buyer = await getSigners(2, alph(1000), groupIndex)

    collectionTemplate = (await deployCollection()).contractInstance
    mutableNFTTemplate = (await deployNFT()).contractInstance

    listingTemplate = (await deployListing()).contractInstance

    offerTemplate = (await deployOffer()).contractInstance
    collectionOfferTemplate = (await deployCollectionOffer()).contractInstance
    offerFactory = (await deployOfferFactory(offerTemplate.contractId, collectionOfferTemplate.contractId)).contractInstance
    listingFactory = (await deployListingFactory(listingTemplate.contractId, offerFactory.contractId)).contractInstance
})

    test('listing (create, purchase, cancel, edit) + collection mint', async () => {
        
    })

})
