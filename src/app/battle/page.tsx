import { Navbar } from "../../components/navbar";
import { EnhancedNftBattleWindow } from "../../components/enhanced-nft-battle-window";
import BattleUI from "../../components/alphpaca-battle"
import React from "react";

export default function TokenCPage() {
  return (
    <main>
      <Navbar/>
      <BattleUI/>
      <EnhancedNftBattleWindow/>
    </main>
  );
}