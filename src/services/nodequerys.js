const { NodeProvider, hexToString, binToHex, contractIdFromAddress, fetchContractState, addressFromContractId, web3 } = require('@alephium/web3')
const { PrivateKeyWallet } = require('@alephium/web3-wallet')
require('dotenv').config({ path: '../../.env' });

//const Node = process.env.Node;
//const NodeAPI = process.env.NodeAPI;

const Node = "https://wallet-v20.mainnet.alephium.org"

const nodeProvider = new NodeProvider("https://wallet-v20.mainnet.alephium.org")

// fetches the names of tokens that have been created.
async function logTokens() {
    const result = await nodeProvider.events.getEventsContractContractaddress(
        "24nVqPHpFofyJrh4nFBeT3KVJDfG44mS6XWhGknbKWkFZ", {start: 0, limit: 100}
    )
    
    for (let i = 0; i < result.nextStart; i ++) {

        let id = result.events[i].fields[1].value
        //console.log("Token ID: " + id)
        let address = addressFromContractId(id)
        //console.log(" Token Address: " + address)

        const url = `${Node}/contracts/${address}/state`;

        fetch(`https://wallet-v20.mainnet.alephium.org/contracts/${address}/state`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            return response.json();
            })
            .then(data => {
                let hexsymbol = data.immFields[0].value; // This will log the JSON data to the console
                let hexname = data.immFields[1].value; 
                let decimals = data.immFields[2].value; 
                let supply = data.immFields[3].value; 
                console.log(hexToString(hexsymbol) + " " + hexToString(hexname) + "Total Supply: " + supply)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }
}

// Node , NodeAPI , DjangoServer

// Now you can use config properties
//console.log(config.Node);                 // test command

// https://ipfs.filebase.io/ipfs/QmX6hKNuK9eua8e91Nu2jbzKBM9ucczKp2p5DizphXGiKk/16
// https://ipfs.filebase.io/ipfs/QmPeqHaNjsm3U9Uk1qnEgH9iCFWMoGx1o6UsJr8p8h4wHx/16.svg

//const nodeProvider = new NodeProvider(`${Node}`, `${NodeAPI}`)

//const nodeProvider = new NodeProvider("https://wallet-v20.mainnet.alephium.org")


async function getAssets(walletAddy) {
    let walletAssets = await nodeProvider.addresses.getAddressesAddressBalance(walletAddy);
    console.log(walletAssets);
    return walletAssets;
}

/*

// gets the image url of the nft by its token id
async function getImageUri(tokenId) {
    let tokenIdAddress = addressFromContractId(tokenId);
    const url = `${process.env.Node}contracts/${tokenIdAddress}/state?group=0`; // only group 0 nfts

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'X-API-KEY': String(NodeAPI)
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const websiteLink = hexToString(data.immFields[0].value);

        // Fetch the data from the website link
        const websiteResponse = await fetch(websiteLink);
        if (!websiteResponse.ok) {
            throw new Error(`HTTP error! status: ${websiteResponse.status}`);
        }

        const websiteData = await websiteResponse.json();
        const imageUrl = websiteData.image;
        const imageName = websiteData.name;
        console.log(imageUrl)

        return { imageUrl, imageName };
    } catch (error) {
        console.error('Error:', error);
        return { imageUrl: "", imageName: "" }; // Return default values or handle the error case as needed
    }
}

*/

let tokenIdAddress = addressFromContractId("x3N8DjuzWMaZtZbxXWMbaW5dRuXZgw6VjGnDYuhFd3b5");

console.log(tokenIdAddress)