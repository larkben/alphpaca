"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

// functions
import React, { useEffect } from "react";

export function AuctionDisplay() {
  return (
    <section className="grid items-center justify-center bg-gray-900 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8 xl:grid-cols-5">
      {" "}
      {/* min-h-screen; blank if no auctions */}
      <div className="grid gap-2">
        <div className="group relative">
          <Link
            className="block aspect-square overflow-hidden rounded-lg"
            href="#"
          >
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
          <br />
          <Button className="group relative flex w-full justify-center rounded-md border border-gray-200 border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-800">
            {" "}
            Bid{" "}
          </Button>
          <br />
          <p className="text-1xl font-bold tracking-tight text-white">
            {" "}
            Current Bid: $value{" "}
          </p>
          <p className="text-1xl font-bold tracking-tight text-white">
            {" "}
            Current Owner: $value{" "}
          </p>
          <h3 className="text-2xl font-bold tracking-tight text-white">
            ALPHPACA #56
          </h3>
        </div>
      </div>
    </section>
  );
}
