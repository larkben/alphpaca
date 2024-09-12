import { Navbar } from "../../components/navbar";
import { TokenCreate } from "../../services/utils";
import { WrappedAlfDapp } from "../../components/walf";
import React from "react";

export default function TokenCPage() {
  return (
    <main>
      <Navbar/>
      <WrappedAlfDapp config={TokenCreate}></WrappedAlfDapp>
    </main>
  );
}