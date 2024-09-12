import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AlephiumWalletProvider } from "@alephium/web3-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ALPHpaca Home",
  description: "A site dedicated towards ALPHpacas and Alephium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AlephiumWalletProvider network={"mainnet"}>
        <body className={inter.className}>{children}</body>
      </AlephiumWalletProvider>
    </html>
  );
}
