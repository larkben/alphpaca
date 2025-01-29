"use client"

import { Navbar } from "../../components/navbar";
import { TokenCreate } from "../../services/utils";
import { WrappedTokens } from "../../components/WrappedTokens";
import React from "react";
import { Footer } from "../../components/footer";

export default function TokenCPage() {
  return (
    <main>
      <Navbar/>
      <WrappedTokens config={TokenCreate}></WrappedTokens>
      <Footer/>
    </main>
  );
}