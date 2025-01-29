"use client"

import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { TokenCreate } from "../../services/utils";
import { TokenCreateAutomation } from "../../components/token-create";
import React from "react";

export default function TokenCPage() {
  return (
    <main>
      <Navbar/>
      <TokenCreateAutomation config={TokenCreate}></TokenCreateAutomation>
      <Footer/>
    </main>
  );
}