const config = require('../../config.json');
const { NodeProvider, hexToString, binToHex, contractIdFromAddress, fetchContractState, addressFromContractId } = require('@alephium/web3')

// Node , NodeAPI , DjangoServer

// Now you can use config properties
//console.log(config.Node);                 // test command

// https://ipfs.filebase.io/ipfs/QmX6hKNuK9eua8e91Nu2jbzKBM9ucczKp2p5DizphXGiKk/16
// https://ipfs.filebase.io/ipfs/QmPeqHaNjsm3U9Uk1qnEgH9iCFWMoGx1o6UsJr8p8h4wHx/16.svg

const nodeProvider = new NodeProvider(`${config.Node}`, `${config.NodeAPI}`)

export async function getAssets(walletAddy: any): Promise<any> {
    let walletAssets = await nodeProvider.addresses.getAddressesAddressBalance(walletAddy);
    console.log(walletAssets);
    return walletAssets;
}

export async function getImageUri(tokenId: string): Promise<{ imageUrl: string, imageName: string }> {
    let tokenIdAddress = addressFromContractId(tokenId);
    const url = `${config.Node}contracts/${tokenIdAddress}/state?group=0`; // only group 0 nfts
    const apiKey = config.NodeAPI;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'X-API-KEY': apiKey
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

        return { imageUrl, imageName };
    } catch (error) {
        console.error('Error:', error);
        return { imageUrl: "", imageName: "" }; // Return default values or handle the error case as needed
    }
}

//console.log(addressFromContractId("3426a33ad6041001fe365f41b17b0d50c2417ab54919ea200a5cff24dd7a9300"))

//console.log(hexToString("68747470733a2f2f697066732e66696c65626173652e696f2f697066732f516d5836684b4e754b39657561386539314e75326a627a4b424d397563637a4b7032703544697a70685847694b6b2f3136"))

console.log(getAssets("148n4B7H7CB8wUJHpSoj95ctMcENYjBM5ysbHoTq2Kf9t"))

getImageUri("3426a33ad6041001fe365f41b17b0d50c2417ab54919ea200a5cff24dd7a9300");