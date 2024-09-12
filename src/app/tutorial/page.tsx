import { Navbar } from "../../components/navbar";
import { FaucetDapp } from "../../components/faucet";
import { TokenCreate } from "../../services/utils";

export default function Faucet() {
  return (
    <main>
      <Navbar/>
      <FaucetDapp config={TokenCreate}/>
    </main>
  );
}