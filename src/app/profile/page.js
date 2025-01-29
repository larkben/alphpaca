"use client"

import { Navbar } from "../../components/navbar";
import Dashboard from "../../components/profile";
import { Footer } from "../../components/footer";

export default function TokenCPage() {
  return (
    <main>
      <Navbar/>
      <Dashboard/>
      <Footer/>
    </main>
  );
}