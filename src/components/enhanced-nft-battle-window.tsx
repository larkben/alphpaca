"use client";

import { useState } from "react";
import { Button, Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { Sword, Shield, Zap, Heart } from "lucide-react";

type Move = {
  name: string;
  damage: number;
  icon: React.ReactNode;
};

type BattleLog = {
  turn: number;
  attacker: string;
  move: string;
  damage: number;
};

export function EnhancedNftBattleWindow() {
  const [battleLog, setBattleLog] = useState<BattleLog[]>([]);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(100);

  const moves: Move[] = [
    { name: "Slash", damage: 20, icon: <Sword className="w-4 h-4" /> },
    { name: "Block", damage: 0, icon: <Shield className="w-4 h-4" /> },
    { name: "Thunderbolt", damage: 30, icon: <Zap className="w-4 h-4" /> },
    { name: "Heal", damage: -15, icon: <Heart className="w-4 h-4" /> },
  ];

  const handleMove = (move: Move) => {
    const newLog: BattleLog = {
      turn: battleLog.length + 1,
      attacker: "Player",
      move: move.name,
      damage: move.damage,
    };

    setBattleLog((prevLog) => [...prevLog, newLog]);

    if (move.name === "Heal") {
      setPlayerHealth((prevHealth) => Math.min(prevHealth + Math.abs(move.damage), 100));
    } else {
      setEnemyHealth((prevHealth) => Math.max(prevHealth - move.damage, 0));
    }

    // Enemy's turn
    setTimeout(() => {
      const enemyMove = moves[Math.floor(Math.random() * moves.length)];
      const enemyLog: BattleLog = {
        turn: battleLog.length + 2,
        attacker: "Enemy",
        move: enemyMove.name,
        damage: enemyMove.damage,
      };

      setBattleLog((prevLog) => [...prevLog, enemyLog]);

      if (enemyMove.name === "Heal") {
        setEnemyHealth((prevHealth) => Math.min(prevHealth + Math.abs(enemyMove.damage), 100));
      } else {
        setPlayerHealth((prevHealth) => Math.max(prevHealth - enemyMove.damage, 0));
      }
    }, 1000);
  };

  return (
    <Box className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-8">
        <CardContent className="p-6">
          <Box 
            className="relative h-96 mb-8 bg-cover bg-center rounded-lg overflow-hidden" 
            style={{ backgroundImage: `url('/placeholder.svg?height=400&width=800')` }}
          >
            <Box className="absolute inset-0 bg-black bg-opacity-30"></Box>
            <Box className="relative z-10 flex justify-between items-end h-full p-8">
              <Box className="text-center transform translate-y-4">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Your NFT"
                  className="w-40 h-40 object-cover rounded-lg mb-2 border-4 border-gray-900 dark:border-gray-50"
                />
                <Typography variant="h6" className="font-bold text-white">Your NFT</Typography>
                <Typography variant="body2" className="text-sm text-white bg-gray-50/80 rounded px-2 py-1 mt-1 dark:bg-gray-900/80">
                  HP: {playerHealth}/100
                </Typography>
              </Box>
              <Box className="text-center transform translate-y-[-2rem] translate-x-[-2rem] scale-90">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Enemy"
                  className="w-40 h-40 object-cover rounded-lg mb-2 border-4 border-red-500 dark:border-red-900"
                />
                <Typography variant="h6" className="font-bold text-white">Enemy</Typography>
                <Typography variant="body2" className="text-sm text-white bg-gray-50/80 rounded px-2 py-1 mt-1 dark:bg-gray-50/80">
                  HP: {enemyHealth}/100
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="grid grid-cols-2 gap-4 mb-8">
            {moves.map((move) => (
              <Button
                key={move.name}
                onClick={() => handleMove(move)}
                variant="contained"
                className="h-16 text-lg"
                disabled={playerHealth <= 0 || enemyHealth <= 0}
              >
                {move.icon}
                <span className="ml-2">{move.name}</span>
              </Button>
            ))}
          </Box>
          <Card>
            <CardContent className="p-4">
              <Typography variant="h6" className="font-bold mb-2">Battle Log</Typography>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Box>
  );
}