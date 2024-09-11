"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Search, Menu } from "lucide-react"

type NFT = {
  id: number
  title: string
  artist: string
  price: string
  image: string
}

export function NftMarketplaceListingsWithSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredNFTs, setFilteredNFTs] = useState<NFT[]>([])

  // This would typically come from an API or database - it will
  const allNFTs: NFT[] = Array(48).fill(null).map((_, i) => ({
    id: i + 1,
    title: `NFT #${i + 1}`,
    artist: `Artist ${i + 1}`,
    price: (Math.random() * 10).toFixed(2),
    image: `/placeholder.svg?height=200&width=200&text=NFT ${i + 1}`
  }))

  useEffect(() => {
    const filtered = allNFTs.filter(nft =>
      nft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nft.artist.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredNFTs(filtered)
  }, [searchTerm])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-white border-b dark:bg-gray-950">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
            <h1 className="text-xl font-bold">NFT Market</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search NFTs"
                className="pl-8 w-[200px] lg:w-[300px]"
                value={searchTerm}
                onChange={handleSearch}
                aria-label="Search NFTs"
              />
            </div>
            {/* this is where we make a link to return to profile */}
          </div>
        </div>
      </header>

      <main className="flex-grow p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {filteredNFTs.map((nft) => (
            <Card key={nft.id} className="overflow-hidden">
              <img
                src={nft.image}
                alt={`${nft.title} by ${nft.artist}`}
                className="w-full aspect-square object-cover"
              />
              <CardContent className="p-2">
                <h3 className="font-semibold text-sm truncate">{nft.title}</h3>
                <p className="text-xs text-gray-500 truncate dark:text-gray-400">{nft.artist}</p>
              </CardContent>
              <CardFooter className="p-2 pt-0 flex justify-between items-center">
                <span className="text-sm font-bold">{nft.price} ETH</span>
                <Button size="sm" className="text-xs">Buy</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}