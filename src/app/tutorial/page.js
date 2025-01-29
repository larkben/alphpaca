import { Navbar } from "../../components/navbar";
import { FaucetDapp } from "../../components/faucet";
import { TokenCreate } from "../../services/utils";
import React from "react";

export default function Faucet() {
  return (
    <main>
      <Navbar/>
      <FaucetDapp config={TokenCreate}/>
    </main>
  );
}