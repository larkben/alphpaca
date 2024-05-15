import React, { useEffect, useState } from 'react';
const { NodeProvider, hexToString, binToHex, contractIdFromAddress, fetchContractState, addressFromContractId } = require('@alephium/web3')

const Node = "https://wallet-v20.mainnet.alephium.org"

const nodeProvider = new NodeProvider("https://wallet-v20.mainnet.alephium.org")

// Define the structure for a token
interface Token {
  id: string;
  address: string;
  name: string;
  symbol: string;
  decimals: string;
  supply: string;
}

// Main component that fetches tokens and generates components based on them
const TokenComponent: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      console.log("Starting token fetch...");
  
      try {
        // Make sure the endpoint is correct and the call works
        const result = await nodeProvider.events.getEventsContractContractaddress(
          "24nVqPHpFofyJrh4nFBeT3KVJDfG44mS6XWhGknbKWkFZ",
          { start: 0, limit: 100 }
        );
  
        console.log("Fetch successful, result:", result);
  
        const fetchedTokens = [];
  
        // Verify result has expected structure
        if (result && result.events) {
          for (let i = result.nextStart - 5; i < result.nextStart; i++) {
            const id = result.events[i].fields[1].value;
            const address = addressFromContractId(id);
  
            const url = `${Node}/contracts/${address}/state`;
  
            try {
              const response = await fetch(`https://wallet-v20.mainnet.alephium.org/contracts/${address}/state`);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
  
              const hexsymbol = data.immFields[0].value;
              const hexname = data.immFields[1].value;
              const decimals = data.immFields[2].value;
              const supply = data.immFields[3].value;
              const name = hexToString(hexname);
              const symbol = hexToString(hexsymbol);
  
              console.log(`${symbol} (${name}), Total Supply: ${supply}, Decimals: ${decimals}`);
  
              fetchedTokens.push({ id, address, name, symbol, decimals, supply });
            } catch (error) {
              console.error('There was a problem with the fetch operation:', error);
            }
  
            console.log(`Token ID: ${id}, Address: ${address}`);
          }
  
          setTokens(fetchedTokens);
        } else {
          console.log("Unexpected response structure:", result);
          setError("Invalid response structure");
        }
      } catch (e) {
        console.error("Error during fetchTokens:", e);
        setError("Failed to fetch tokens");
      } finally {
        setIsLoading(false); // Make sure to update loading state regardless of success or failure
      }
    };
  
    fetchTokens(); // Fetch tokens when component is mounted
  }, []); // The empty dependency array ensures this effect runs once after the first render

  // Handling different component states
  if (isLoading) {
    console.log("Component is loading...");
    return <div>Loading tokens...</div>;
  }

  if (error) {
    console.log("An error occurred:", error);
    return <div>Error: {error}</div>;
  }

  console.log("Rendering token list...");

  return (
    <div className="p-4 text-amber-500">
      <ul className="space-y-4">
        {tokens.map((token, index) => (
          <li key={index} className="border border-gray-300 p-4 rounded-lg">
            <div className="mb-2">
              <strong className="font-bold">Token ID:</strong> {token.id}
            </div>
            <div className="mb-2">
              <strong className="font-bold">Token Address:</strong> {token.address}
            </div>
            <div className="mb-2">
              <strong className="font-bold">Name:</strong> {token.name}
            </div>
            <div className="mb-2">
              <strong className="font-bold">Symbol:</strong> {token.symbol}
            </div>
            <div>
              <strong className="font-bold">Decimals:</strong> {token.decimals}
            </div>
            <div>
              <strong className="font-bold">Supply:</strong> {token.supply}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TokenComponent;

