"use client";
import React, { useState, useEffect } from 'react';
import { Shield, Sword, Heart } from 'lucide-react';

const BattleUI = () => {
  const [enemyHP, setEnemyHP] = useState(100);
  const [playerHP, setPlayerHP] = useState(100);
  const [isPlayerAttacking, setIsPlayerAttacking] = useState(false);
  const [isEnemyAttacking, setIsEnemyAttacking] = useState(false);
  const [isPlayerHit, setIsPlayerHit] = useState(false);
  const [isEnemyHit, setIsEnemyHit] = useState(false);
  const [isDefending, setIsDefending] = useState(false);
  const [isHealing, setIsHealing] = useState(false);
  const [battleLog, setBattleLog] = useState('');
  const [backgroundGradient, setBackgroundGradient] = useState('');

  useEffect(() => {
    setBackgroundGradient(generateRandomGradient());
  }, []);

  const generateRandomGradient = () => {
    const color1 = `hsl(${Math.random() * 360}, 70%, 75%)`;
    const color2 = `hsl(${Math.random() * 360}, 70%, 75%)`;
    return `linear-gradient(135deg, ${color1}, ${color2})`;
  };

  const handleAction = async (action) => {
    switch (action) {
      case 'attack':
        await playerAttack();
        break;
      case 'defend':
        setIsDefending(true);
        setBattleLog("Player is defending!");
        setTimeout(() => setIsDefending(false), 3000);
        break;
      case 'heal':
        const healAmount = Math.floor(Math.random() * 30) + 20;
        setPlayerHP(prev => Math.min(prev + healAmount, 100));
        setIsHealing(true);
        setBattleLog(`Player healed for ${healAmount} HP!`);
        setTimeout(() => setIsHealing(false), 1000);
        break;
    }

    if (action !== 'defend') {
      await new Promise(resolve => setTimeout(resolve, 1500));
      await enemyAttack();
    }
  };

  const playerAttack = async () => {
    setIsPlayerAttacking(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsPlayerAttacking(false);
    
    const damage = Math.floor(Math.random() * 20) + 10;
    setEnemyHP(prev => Math.max(prev - damage, 0));
    setBattleLog(`Player attacked for ${damage} damage!`);
    
    setIsEnemyHit(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsEnemyHit(false);
  };

  const enemyAttack = async () => {
    setIsEnemyAttacking(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsEnemyAttacking(false);
    
    setIsPlayerHit(true);
    const enemyDamage = Math.floor(Math.random() * 15) + 5;
    setPlayerHP(prev => Math.max(prev - enemyDamage, 0));
    setBattleLog(prev => `${prev}\nEnemy attacked for ${enemyDamage} damage!`);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsPlayerHit(false);
  };

  const Paca = ({ isEnemy, hp, maxHp }) => (
    <div className={`absolute ${isEnemy ? 'top-20 right-20' : 'bottom-40 left-20'} flex ${isEnemy ? 'flex-row-reverse' : 'flex-row'} items-center`}>
      <div className="flex flex-col items-center">
        <div 
          className={`w-40 h-40 flex items-center justify-center
            ${isPlayerAttacking && !isEnemy ? 'animate-attack' : ''}
            ${isEnemyAttacking && isEnemy ? 'animate-attack' : ''}
            ${isPlayerHit && !isEnemy ? 'animate-hit' : ''}
            ${isEnemyHit && isEnemy ? 'animate-hit' : ''}
            ${isDefending && !isEnemy ? 'ring-4 ring-yellow-400 animate-pulse' : ''}
            ${isHealing && !isEnemy ? 'animate-heal' : ''}`}
        >
          {isEnemy ? (
            <div className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full"></div>
            </div>
          ) : (
            <div className="w-32 h-32 bg-blue-500 rounded-t-full rounded-b-sm flex flex-col items-center justify-end">
              <div className="w-24 h-12 bg-white rounded-t-full"></div>
            </div>
          )}
        </div>
        <div className="w-32 h-8 bg-black/30 rounded-full mt-2 blur-sm transform translate-y-2" />
      </div>
      <div className={`${isEnemy ? 'mr-4' : 'ml-4'} w-40`}>
        <div className="mb-1 text-sm font-medium">{`HP: ${hp}/${maxHp}`}</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-green-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${(hp / maxHp) * 100}%` }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-3xl h-[600px] bg-gray-800 relative overflow-hidden border-4 border-gray-700 rounded-lg shadow-2xl">
        <div 
          className="absolute inset-0 backdrop-blur-sm"
          style={{ backgroundImage: backgroundGradient }}
        />
        
        <Paca isEnemy={true} hp={enemyHP} maxHp={100} />
        <Paca isEnemy={false} hp={playerHP} maxHp={100} />
        
        <div className="absolute bottom-0 left-0 right-0 bg-gray-800 border-t-2 border-gray-700 p-4">
          <div className="mb-4 h-20 bg-gray-700 rounded p-2 overflow-y-auto text-sm">
            {battleLog.split('\n').map((log, index) => (
              <div key={index}>{log}</div>
            ))}
          </div>
          <div className="flex justify-between">
            <button onClick={() => handleAction('attack')} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
              <Sword className="inline-block mr-2" /> Attack
            </button>
            <button onClick={() => handleAction('defend')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              <Shield className="inline-block mr-2" /> Defend
            </button>
            <button onClick={() => handleAction('heal')} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              <Heart className="inline-block mr-2" /> Heal
            </button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes attack {
          0% { transform: translateX(0); }
          25% { transform: translateX(${isEnemyAttacking ? '-' : ''}100px); }
          100% { transform: translateX(0); }
        }
        @keyframes hit {
          0%, 100% { transform: translateX(0); filter: none; }
          25%, 75% { transform: translateX(-10px); filter: brightness(2) saturate(200%); }
          50% { transform: translateX(10px); filter: brightness(2) saturate(200%); }
        }
        @keyframes heal {
          0%, 100% { filter: none; }
          50% { filter: brightness(1.5) hue-rotate(45deg); }
        }
        .animate-attack {
          animation: attack 0.5s ease-in-out;
        }
        .animate-hit {
          animation: hit 0.3s ease-in-out;
        }
        .animate-heal {
          animation: heal 1s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default BattleUI;