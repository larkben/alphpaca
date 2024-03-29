import Image from "next/image";
import { Hero } from "../components";
import { Navbar } from "../components/navbar";
import { Dapps } from "../components/un_dapps";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
    </div>
  );
}
