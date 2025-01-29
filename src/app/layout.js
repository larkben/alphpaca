import { Inter } from "next/font/google";
import "./globals.css";
import { AlephiumWalletProvider } from "@alephium/web3-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ALPHpaca Home",
  description: "A site dedicated towards ALPHpacas and Alephium.",
};

export default function RootLayout({ children }) {
  return (
    <AlephiumWalletProvider network={"mainnet"}>
    <html lang="en">
        <body className={inter.className}>{children}</body>
    </html>
    </AlephiumWalletProvider>
  );
}