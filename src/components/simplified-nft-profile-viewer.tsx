"use client";

import { useEffect, useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Button } from "./ui/button";
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

export default function SimplifiedNftProfileViewer() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log("Count updated:", count)
  }, [count])

  const handleClick = () => {
    console.log("Button clicked")
    setCount(prevCount => {
      console.log("Updating count from", prevCount, "to", prevCount + 1)
      return prevCount + 1
    })
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Card className="mb-8">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">NFT Profile Viewer</h1>
          <p className="mb-4">Count: {count}</p>
          <Button
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-200 border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-800"
              onClick={handleClick}
            >
              Migrate
            </Button>
        </CardContent>
      </Card>
    </div>
  )
}