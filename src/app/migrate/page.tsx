import { Navbar } from "../../components/navbar";
import { TokenCreate } from "../../services/utils";
import { MintPlayerAutomation } from "../../components/mint-player";
import React from "react";

export default function TokenCPage() {
  return (
    <main>
      <Navbar/>
      <MintPlayerAutomation config={TokenCreate}></MintPlayerAutomation>
    </main>
  );
}