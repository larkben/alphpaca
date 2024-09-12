import { Navbar } from "../../components/navbar";
import { TokenCreate } from "../../services/utils";
import { TokenCreateAutomation } from "../../components/token-create";
import React from "react";

export default function TokenCPage() {
  return (
    <main>
      <Navbar/>
      <TokenCreateAutomation config={TokenCreate}></TokenCreateAutomation>
    </main>
  );
}