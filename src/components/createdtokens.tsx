import React, { useEffect, useState } from 'react';
const { NodeProvider, hexToString, binToHex, contractIdFromAddress, fetchContractState, addressFromContractId } = require('@alephium/web3')

const Node = "https://wallet-v20.mainnet.alephium.org"

const nodeProvider = new NodeProvider("https://wallet-v20.mainnet.alephium.org")

// Define the structure for a token
interface Token {
  id: string;
  address: string;
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

        const fetchedTokens: Token[] = [];

        // Verify result has expected structure
        if (result && result.events) {
          for (let i = 0; i < result.events.length; i++) {
            const id = result.events[i].fields[1].value;
            const address = addressFromContractId(id);

            console.log(`Token ID: ${id}, Address: ${address}`);

            fetchedTokens.push({ id, address });
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
    <div>
      <h2>Token List</h2>
      <ul>
        {tokens.map((token, index) => (
          <li key={index}>
            <div><strong>Token ID:</strong> {token.id}</div>
            <div><strong>Token Address:</strong> {token.address}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TokenComponent;

