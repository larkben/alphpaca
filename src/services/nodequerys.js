const { NodeProvider, hexToString, binToHex, contractIdFromAddress, fetchContractState, addressFromContractId } = require('@alephium/web3')
require('dotenv').config({ path: '../../.env' });

const Node = process.env.Node;
const NodeAPI = process.env.NodeAPI;

async function logTokens() {
    const result = await nodeProvider.events.getEventsContractContractaddress(
        "vgz6gJB8GVmZgokXJzBNagTUuZJyUuNmAtHtKqQJZ8Go", {start: 0, limit: 100}
    )
    
    for (let i = 0; i < result.nextStart; i ++) {

        let id = result.events[i].fields[1].value
        console.log("Token ID: " + id)
        let address = addressFromContractId(id)
        console.log(" Token Address: " + address)

        const url = `${process.env.Node}contracts/${address}/state?group=0`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'X-API-KEY': NodeAPI
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const tokenName = hexToString(data.immFields[1].value)
            //const tokenName = data
                
            console.log(tokenName)

        }
        catch(error) {
            console.log("Network Error", error)
        }

        console.log("\n")

    }
}

// Node , NodeAPI , DjangoServer

// Now you can use config properties
//console.log(config.Node);                 // test command

// https://ipfs.filebase.io/ipfs/QmX6hKNuK9eua8e91Nu2jbzKBM9ucczKp2p5DizphXGiKk/16
// https://ipfs.filebase.io/ipfs/QmPeqHaNjsm3U9Uk1qnEgH9iCFWMoGx1o6UsJr8p8h4wHx/16.svg

const nodeProvider = new NodeProvider(`${Node}`, `${NodeAPI}`)

//const nodeProvider = new NodeProvider("https://wallet-v20.mainnet.alephium.org")

async function getAssets(walletAddy) {
    let walletAssets = await nodeProvider.addresses.getAddressesAddressBalance(walletAddy);
    console.log(walletAssets);
    return walletAssets;
}

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

//console.log(addressFromContractId("3426a33ad6041001fe365f41b17b0d50c2417ab54919ea200a5cff24dd7a9300"))

//console.log(hexToString("68747470733a2f2f697066732e66696c65626173652e696f2f697066732f516d5836684b4e754b39657561386539314e75326a627a4b424d397563637a4b7032703544697a70685847694b6b2f3136"))

//console.log(getAssets("148n4B7H7CB8wUJHpSoj95ctMcENYjBM5ysbHoTq2Kf9t"))

//getImageUri("3426a33ad6041001fe365f41b17b0d50c2417ab54919ea200a5cff24dd7a9300");

logTokens()
