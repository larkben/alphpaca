'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"

// functions
import { testConnection } from "/workspaces/nonchalant/src/app/api/auctionsFetch"


export function AuctionDisplay() {

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-center justify-center py-12 bg-gray-900 sm:px-6 lg:px-8"> {/* min-h-screen; blank if no auctions */}
      <div className="grid gap-2">
        <div className="relative group">
          <Link className="block aspect-square overflow-hidden rounded-lg" href="#">
            <Image
              alt="ALPHPACA #56"
              className="object-cover"
              height={400}
              src="https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1-1024x1024.jpg"
              style={{
                aspectRatio: "400/400",
                objectFit: "cover",
              }}
              width={400}
            />
          </Link>
          <br/>
          <Button className="group relative w-full flex justify-center py-2 px-4 border border-gray-200 border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-800" onClick={testConnection}> Bid </Button>
          <br/>
          <p className="text-1xl font-bold tracking-tight text-white"> Current Bid: $value </p>
          <p className="text-1xl font-bold tracking-tight text-white"> Current Owner: $value </p>
          <h3 className="text-2xl font-bold tracking-tight text-white">ALPHPACA #56</h3>
        </div>
      </div>
    </section>
  )
}
