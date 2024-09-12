import { Navbar } from "../../components/navbar";
import { DevDashboard } from "../../components/devdashboard";
import { TokenCreate } from "../../services/utils";

export default function Dashboard() {
  return (
    <main>
      <Navbar/>
      <DevDashboard config={TokenCreate}/>
    </main>
  );
}