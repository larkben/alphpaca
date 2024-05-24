'use client'
import { Button } from "../components/ui/button"
import { Input } from "./ui/input"
import React, { FC, useState, useEffect } from 'react'
import Modal from 'react-modal'

// Import Alephium Services
import { TokenCreate } from "../services/utils"
import { useWallet } from "@alephium/web3-react"
import { ServiceBuyListing, ServiceCreateListing } from "../services/token.services"
import { NodeProvider } from "@alephium/web3"
import { mainnet } from "@alephium/token-list"

const tokens = mainnet.tokens

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#2d3748', // Dark background
      border: 'none',
      borderRadius: '8px',
      padding: '20px',
      width: '90%', // Adjust width as needed
      maxWidth: '400px', // Limit maximum width
      minHeight: 'auto', // Adjust height as needed
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    }
};

const nodeProvider = new NodeProvider("https://wallet-v20.mainnet.alephium.org")

interface Listing {
    type: string;
    contractid: string;
    path: string;
    token: string;
    tokenAmount: string;
    priceToken: string;
    price: string;
}

export const Marketplace: FC<{
    config: TokenCreate
  }> = ({ config }) => {
  const { signer } = useWallet()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [token, setToken] = useState<string>("")
  const [tokenAmount, setTokenAmount] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)
  const [priceToken, setPriceToken] = useState<string>("")
  const [decimals, setDecimals] = useState<number>(0)
  const [decimalsPrice, setPriceDecimals] = useState<number>(0)
  const [events, setEvents] = useState<Listing[]>([]);

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signer) {
      const integerTokenAmount = tokenAmount * 10**decimals;
      const integerPrice = price * 10**decimalsPrice;
      await ServiceCreateListing(signer, token, integerTokenAmount, integerPrice, priceToken);
      closeModal();
    }
  }

  const handleBuyListing = async (e: React.FormEvent, path: string, priceToken: string, price: string) => {
    e.preventDefault();
    console.log("handleBuyListing called with:", path, priceToken, price);
    if (signer) {
      const selectedToken = mainnet.tokens.find(token => token.id === priceToken);
      if (selectedToken) {
        const integerPrice = parseFloat(price) * 10**selectedToken.decimals;
        console.log("Integer Price:", integerPrice);
        const result = await ServiceBuyListing(signer, path, priceToken, String(integerPrice));
        console.log("Buy Listing Result:", result);
        closeModal();
      } else {
        console.error('Token not found');
      }
    }
  }

  const handleTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTokenId = e.target.value;
    const selectedToken = mainnet.tokens.find(token => token.id === selectedTokenId);
    if (selectedToken) {
      setToken(selectedToken.id);
      setDecimals(selectedToken.decimals);
    }
  }

  const handlePriceTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTokenId = e.target.value;
    const selectedToken = mainnet.tokens.find(token => token.id === selectedTokenId);
    if (selectedToken) {
      setPriceToken(selectedToken.id);
      setPriceDecimals(selectedToken.decimals);
    }
  };

  const handleTokenAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const decimals = tokens.find((t) => t.id === token)?.decimals || 0;
    const roundedValue = parseFloat(value.toFixed(decimals));
    setTokenAmount(roundedValue);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const decimals = tokens.find((t) => t.id === priceToken)?.decimals || 0;
    const roundedValue = parseFloat(value.toFixed(decimals));
    setPrice(roundedValue);
  };

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  useEffect(() => {
    getMarketEvents();
  }, []);

  const getMarketEvents = async () => {
    const result = await nodeProvider.events.getEventsContractContractaddress(
      "yTqYQ6hiiCDJEEdLc8qZH6o7gQeHBCwXHkdagcB9xsBV", { start: 0, limit: 100 }
    );
    const events: Listing[] = result.events.map((event) => {
      let fields = event.fields;
      return {
        type: String(fields[0].value),
        contractid: String(fields[1].value),
        path: String(fields[2].value),
        token: String(fields[3].value),
        tokenAmount: String(fields[4].value),
        priceToken: String(fields[5].value),
        price: String(fields[6].value)
      };
    });
    setEvents(events);
  }

  return (
    <div className="flex flex-col gap-8 p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold">Listings</h1>
          <p className="text-gray-500 dark:text-gray-400">Discover the latest listings.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">
            
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Product cards */}
      </div>
      <Button
        className="group relative w-50 flex justify-center py-2 px-4 border border-gray-200 border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-800"
        onClick={openModal}
      >
        Create Listing
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Create Listing Modal"
      >
        <main className="flex flex-col items-center justify-center py-10 bg-gray-900 sm:px-6 lg:px-8">
          <div className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-md z-50">
            <div>
              <h2 className="text-center text-2xl font-extrabold text-blue-500">Create Your Listing</h2>
            </div>
            <form onSubmit={handleCreateListing} className="space-y-4">
              <div className="rounded-md shadow-sm space-y-2">
                <div>
                  <label className="text-white" htmlFor="token">Token You Want to Sell:</label>
                  <select
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-200 border-gray-700 placeholder-gray-500 text-blue-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:border-gray-800"
                    id="token"
                    name="token"
                    value={token}
                    onChange={handleTokenChange}
                    required
                  >
                    {tokens.map((token) => (
                        <option key={token.id} value={token.id}>
                            {token.name} ({token.symbol}) - Decimals: {token.decimals}
                        </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-white" htmlFor="tokenAmount">Amount of Token:</label>
                  <Input
                    id="tokenAmount"
                    type="number"
                    min="0"
                    step={`0.${"0".repeat(Math.max(0, decimals - 1))}1`}
                    value={tokenAmount.toString()}
                    onChange={handleTokenAmountChange}
                    placeholder="Enter amount"
                    required
                  />
                </div>
                <div>
                  <label className="text-white" htmlFor="price">Price:</label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step={`0.${"0".repeat(Math.max(0, decimalsPrice - 1))}1`}
                    value={price.toString()}
                    onChange={handlePriceChange}
                    placeholder="Enter price"
                    required
                  />
                </div>
                <div>
                  <label className="text-white" htmlFor="priceToken">Token You Want:</label>
                  <select
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-200 border-gray-700 placeholder-gray-500 text-blue-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:border-gray-800"
                    id="priceToken"
                    name="priceToken"
                    value={priceToken}
                    onChange={handlePriceTokenChange}
                    required
                  >
                    {tokens.map((token) => (
                        <option key={token.id} value={token.id}>
                            {token.name} ({token.symbol}) - Decimals: {token.decimals}
                        </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <Button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-800"
                >
                  Create Listing
                </Button>
                <Button
                  onClick={closeModal}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:border-gray-800"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </main>
        <div>
      {events.length > 0 ? (
        events.map((listing, index) => (
          <form key={index} onSubmit={(e) => handleBuyListing(e, listing.path, listing.priceToken, listing.price)}>
            <p>Type: {listing.type}</p>
            <p>Contract ID: {listing.contractid}</p>
            <p>Contract Path: {listing.path}</p>
            <p>Token: {listing.token}</p>
            <p>Token Amount: {listing.tokenAmount}</p>
            <p>Price Token: {listing.priceToken}</p>
            <p>Price: {listing.price}</p>
            <Button type="submit">Buy</Button>
          </form>
        ))
      ) : (
        <p>No events found</p>
      )}
    </div>
      </Modal>
      <h1>Listings</h1>
      <div>
      {events.length > 0 ? (
        events.map((listing, index) => (
          <form key={index} onSubmit={(e) => handleBuyListing(e, listing.path, listing.priceToken, listing.price)}>
            <p>Type: {listing.type}</p>
            <p>Contract ID: {listing.contractid}</p>
            <p>Contract Path: {listing.path}</p>
            <p>Token: {listing.token}</p>
            <p>Token Amount: {listing.tokenAmount}</p>
            <p>Price Token: {listing.priceToken}</p>
            <p>Price: {listing.price}</p>
            <Button type="submit">Buy</Button>
          </form>
        ))
      ) : (
        <p>No events found</p>
      )}
    </div>
    </div>
  )
}

export default Marketplace

