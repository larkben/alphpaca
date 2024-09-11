"use client";

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, RefreshCw } from "lucide-react"

type NFT = {
  id: number
  name: string
  image: string
  category: "sale" | "update" | "inventory"
  price?: number
  lastUpdated?: string
  rarity?: string
  collection?: string
}

export function SimplifiedNftProfileViewer() {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)

  const user = {
    name: "Satoshi Nakamoto",
    username: "@satoshi",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    nfts: [
      { id: 1, name: "CryptoPunk #3100", image: "/placeholder.svg?height=300&width=300", category: "sale", price: 1000, rarity: "Rare", collection: "CryptoPunks" },
      { id: 2, name: "Bored Ape #7495", image: "/placeholder.svg?height=300&width=300", category: "update", lastUpdated: "2023-05-15", rarity: "Legendary", collection: "Bored Ape Yacht Club" },
      { id: 3, name: "Doodle #6914", image: "/placeholder.svg?height=300&width=300", category: "inventory", rarity: "Uncommon", collection: "Doodles" },
      { id: 4, name: "Azuki #9605", image: "/placeholder.svg?height=300&width=300", category: "sale", price: 500, rarity: "Epic", collection: "Azuki" },
      { id: 5, name: "Cool Cat #1234", image: "/placeholder.svg?height=300&width=300", category: "inventory", rarity: "Common", collection: "Cool Cats" },
      { id: 6, name: "Moonbird #5678", image: "/placeholder.svg?height=300&width=300", category: "update", lastUpdated: "2023-06-01", rarity: "Rare", collection: "Moonbirds" },
    ] as NFT[]
  }

  const renderNFTGrid = (category: NFT["category"]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {user.nfts.filter(nft => nft.category === category).map((nft) => (
        <Card key={nft.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedNFT(nft)}>
          <CardContent className="p-0">
            <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">{nft.name}</h3>
              {nft.category === "sale" && <p className="text-sm text-gray-500 dark:text-gray-400">Price: {nft.price} ETH</p>}
              {nft.category === "update" && <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated: {nft.lastUpdated}</p>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-500 dark:text-gray-400">{user.username}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="sale" className="mb-6">
        <TabsList>
          <TabsTrigger value="sale">Listed on Sale</TabsTrigger>
          <TabsTrigger value="update">Need Update</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>
        <TabsContent value="sale">
          <h2 className="text-xl font-semibold mb-4">NFTs Listed on Sale</h2>
          {renderNFTGrid("sale")}
        </TabsContent>
        <TabsContent value="update">
          <h2 className="text-xl font-semibold mb-4">NFTs That Need Update</h2>
          {renderNFTGrid("update")}
        </TabsContent>
        <TabsContent value="inventory">
          <h2 className="text-xl font-semibold mb-4">NFTs in Inventory</h2>
          {renderNFTGrid("inventory")}
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedNFT} onOpenChange={() => setSelectedNFT(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedNFT?.name}</DialogTitle>
            <DialogDescription>
              Collection: {selectedNFT?.collection}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <img src={selectedNFT?.image} alt={selectedNFT?.name} className="w-full h-64 object-cover rounded-lg" />
            <Badge variant="secondary" className="w-fit">{selectedNFT?.rarity}</Badge>
            {selectedNFT?.category === "sale" && (
              <p className="text-lg font-semibold">Price: {selectedNFT.price} ETH</p>
            )}
            {selectedNFT?.category === "update" && (
              <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated: {selectedNFT.lastUpdated}</p>
            )}
          </div>
          <DialogFooter>
            {selectedNFT?.category === "sale" && (
              <Button variant="outline" onClick={() => setSelectedNFT(null)}>
                <DollarSign className="mr-2 h-4 w-4" />
                Cancel Listing
              </Button>
            )}
            {selectedNFT?.category === "update" && (
              <Button variant="outline" onClick={() => setSelectedNFT(null)}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Update NFT
              </Button>
            )}
            {selectedNFT?.category === "inventory" && (
              <Button variant="outline" onClick={() => setSelectedNFT(null)}>
                <DollarSign className="mr-2 h-4 w-4" />
                List for Sale
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}