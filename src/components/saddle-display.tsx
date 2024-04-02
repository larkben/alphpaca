"use client";

import React, { useEffect, useState } from "react";
import { useWallet } from "@alephium/web3-react";
import { getAssets, getImageUri } from "../services/nodequerys";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import tokens from "../../mainnet_tokens.json";

interface Asset {
    id: string;
    description: string;
    imageUrl: string;
    price: number;
}

export function SaddleDisplay() {
    const [address, setAddress] = useState("");
    const [assets, setAssets] = useState<Asset[]>([]);
    const [otherAssets, setOtherAssets] = useState<Asset[]>([]);

    const fetchData = async () => {
        if (!address) return;
        const walletAssets = await getAssets(address);
        const tokenBalances = walletAssets.tokenBalances || [];
        const assetPromises = tokenBalances.map(async (asset: { id: any; amount: any; }) => {
            const token = tokens.tokens.find((token) => token.id === asset.id);
            if (token && token.decimals > 0) {
                const { imageUrl, imageName } = await getImageUri(asset.id);
                return {
                    id: asset.id,
                    description: imageName,
                    imageUrl: imageUrl,
                    price: asset.amount // Assuming amount is the price in this case
                };
            } else {
                const { imageUrl, imageName } = await getImageUri(asset.id);
                return {
                    id: asset.id,
                    description: imageName,
                    imageUrl: imageUrl,
                    price: asset.amount // Assuming amount is the price in this case
                };
            }
        });
        const resolvedAssets = await Promise.all(assetPromises);
        const mainnetTokens = tokens.tokens.map((token) => token.id);
        const mainnetAssets = resolvedAssets.filter((asset) => mainnetTokens.includes(asset.id));
        const otherAssets = resolvedAssets.filter((asset) => !mainnetTokens.includes(asset.id));
        setAssets(mainnetAssets);
        setOtherAssets(otherAssets);
    }
    

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetchData();
    }

    const listItems = assets.map((asset) => (
        <div key={asset.id} className="grid gap-2">
            <div className="relative group">
                <a className="block aspect-square overflow-hidden rounded-lg" href="#">
                    <img
                        className="object-cover"
                        height={400}
                        src={asset.imageUrl}
                        style={{
                            aspectRatio: "400/400",
                            objectFit: "cover",
                        }}
                        width={400}
                    />
                </a>
                <p> {asset.description} </p>
                {/*<p> {asset.id} </p> */}
            </div>
        </div>
    ));

    const otherListItems = otherAssets.map((asset) => (
        <div
          key={asset.id}
          className="rounded-lg overflow-hidden shadow-lg max-w-sm mx-auto hover:shadow-xl transition-all duration-200 my-2"
        >
          <div className="relative group">
            <img
              alt="Token/NFT Image"
              className="object-cover w-full h-56 transition-transform transform-gpu scale-100 group-hover:scale-105"
              src={asset.imageUrl}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black bg-opacity-50 group-hover:opacity-100 transition-opacity duration-200">
              <img
                alt="Token/NFT Image"
                className="object-contain max-w-full max-h-full"
                src={asset.imageUrl}
              />
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-2xl font-bold hover:text-gray-700 transition-all duration-200">{asset.description}</h2>
            <h3 className="text-gray-500 hover:text-gray-600 transition-all duration-200">Amount Owned: {asset.price}</h3>
            <p className="mt-2 text-gray-600 hover:text-gray-700 transition-all duration-200">
              {/* Additional information about the token or NFT */}
            </p>
            <div className="flex mt-4 space-x-2">
              <form className="w-full" onSubmit={handleSearch}>
                <Button className="w-full hover:bg-gray-700 hover:text-white transition-all duration-200" type="submit" size="sm">
                  Auction Off
                </Button>
              </form>
            </div>
          </div>
        </div>
      ));
      

    return (
        <div>
            <form onSubmit={handleSearch} className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label className="text-white" htmlFor="symbol">Your Address: </label>
                        <Input
                            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-200 border-gray-700 placeholder-gray-500 text-blue-500 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:border-gray-800"
                            id="address"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            type="text"
                        />
                    </div>
                </div>
                <div>
                    <Button
                        className="group relative w-full flex justify-center py-2 px-4 border border-gray-200 border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-800"
                        type="submit"
                    >
                        Get Assets
                    </Button>
                </div>
            </form>
            <br />
            <section className="grid items-center justify-center bg-gray-900 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8 xl:grid-cols-5">
                {otherListItems}
            </section>
            {otherAssets.length > 0 && (
                <>
                    <h2 className="text-white">Other Assets:</h2>
                    <section className="grid items-center justify-center bg-gray-900 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8 xl:grid-cols-5">
                        {listItems}
                    </section>
                </>
            )}
        </div>
    );
}

