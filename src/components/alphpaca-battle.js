"use client";
import React, { useState } from 'react';
import { Shield, Sword, Heart, X } from 'lucide-react';

const BattleUI = () => {
  const [enemyHP, setEnemyHP] = useState(100);
  const [playerHP, setPlayerHP] = useState(50);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDefending, setIsDefending] = useState(false);
  const [isHealing, setIsHealing] = useState(false);

  const handleMainMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleAttack = () => {
    setIsAnimating(true);
    setActiveMenu(null);
    setTimeout(() => {
      setEnemyHP(prevHP => Math.max(prevHP - 20, 0));
      setIsAnimating(false);
    }, 1000);
  };

  const handleDefend = () => {
    setIsDefending(true);
    setActiveMenu(null);
    setTimeout(() => setIsDefending(false), 3000);
  };

  const handleHeal = (amount) => {
    setIsHealing(true);
    setActiveMenu(null);
    setTimeout(() => {
      setPlayerHP(prevHP => Math.min(prevHP + amount, 100));
      setIsHealing(false);
    }, 1000);
  };

  const renderSubMenu = () => {
    switch (activeMenu) {
      case 'attack':
        return (
          <div className="grid grid-cols-2 gap-2 p-4 bg-gray-800 border-t-2 border-gray-700">
            <button onClick={handleAttack} className="bg-red-900 hover:bg-red-800 text-white rounded p-4 text-lg">Tackle</button>
            <button onClick={handleAttack} className="bg-red-900 hover:bg-red-800 text-white rounded p-4 text-lg">Scratch</button>
            <button onClick={handleAttack} className="bg-red-900 hover:bg-red-800 text-white rounded p-4 text-lg">Bite</button>
            <button onClick={handleAttack} className="bg-red-900 hover:bg-red-800 text-white rounded p-4 text-lg">Slam</button>
          </div>
        );
      case 'defend':
        return (
          <div className="grid grid-cols-2 gap-2 p-4 bg-gray-800 border-t-2 border-gray-700">
            <button onClick={handleDefend} className="bg-blue-900 hover:bg-blue-800 text-white rounded p-4 text-lg">Protect</button>
            <button onClick={handleDefend} className="bg-blue-900 hover:bg-blue-800 text-white rounded p-4 text-lg">Barrier</button>
            <button onClick={handleDefend} className="bg-blue-900 hover:bg-blue-800 text-white rounded p-4 text-lg">Deflect</button>
            <button onClick={handleDefend} className="bg-blue-900 hover:bg-blue-800 text-white rounded p-4 text-lg">Shield</button>
          </div>
        );
      case 'heal':
        return (
          <div className="grid grid-cols-2 gap-2 p-4 bg-gray-800 border-t-2 border-gray-700">
            <button onClick={() => handleHeal(20)} className="bg-green-900 hover:bg-green-800 text-white rounded p-4 text-lg">Potion (+20 HP)</button>
            <button onClick={() => handleHeal(50)} className="bg-green-900 hover:bg-green-800 text-white rounded p-4 text-lg">Super Potion (+50 HP)</button>
            <button onClick={() => handleHeal(100)} className="bg-green-900 hover:bg-green-800 text-white rounded p-4 text-lg">Hyper Potion (+100 HP)</button>
            <button onClick={() => handleHeal(25)} className="bg-green-900 hover:bg-green-800 text-white rounded p-4 text-lg">Berry (+25 HP)</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-5xl h-[800px] bg-gray-800 relative overflow-hidden border-4 border-gray-700 rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900"></div>
        
        <div className={`absolute top-32 right-32 w-64 h-64 bg-yellow-600 rounded-full ${isAnimating ? 'enemy-hit' : ''}`}>
        </div>
        
        <div className="absolute top-16 left-16 w-96 h-12 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-600 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${enemyHP}%` }}
          ></div>
        </div>
        
        <div 
          className={`absolute bottom-80 left-32 w-80 h-80 bg-purple-600 rounded-full transition-all duration-300 ease-in-out 
            ${isAnimating ? 'player-attack' : ''}
            ${isDefending ? 'defend-animation' : ''}
            ${isHealing ? 'heal-animation' : ''}
          `}
        >
          {isDefending && (
            <div className="absolute inset-[-5px] rounded-full bg-blue-400 opacity-15 shadow-lg animate-pulse"></div>
          )}
          {isHealing && (
            <div className="absolute inset-[-10px] rounded-full bg-green-400 opacity-30 animate-pulse"></div>
          )}
        </div>
        
        <div className="absolute bottom-64 right-16 w-96 h-12 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-600 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${playerHP}%` }}
          ></div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gray-800 border-t-2 border-gray-700">
          <div className="flex">
            <button 
              onClick={() => handleMainMenuClick('attack')} 
              className={`flex-1 flex flex-col items-center justify-center p-4 ${activeMenu === 'attack' ? 'bg-red-900' : 'hover:bg-gray-700'}`}
            >
              <Sword className="w-16 h-16 text-red-500" />
              <span className="text-xl mt-2">Attack</span>
            </button>
            <button 
              onClick={() => handleMainMenuClick('defend')} 
              className={`flex-1 flex flex-col items-center justify-center p-4 ${activeMenu === 'defend' ? 'bg-blue-900' : 'hover:bg-gray-700'}`}
            >
              <Shield className="w-16 h-16 text-blue-500" />
              <span className="text-xl mt-2">Defend</span>
            </button>
            <button 
              onClick={() => handleMainMenuClick('heal')} 
              className={`flex-1 flex flex-col items-center justify-center p-4 ${activeMenu === 'heal' ? 'bg-green-900' : 'hover:bg-gray-700'}`}
            >
              <Heart className="w-16 h-16 text-green-500" />
              <span className="text-xl mt-2">Heal</span>
            </button>
          </div>
          {renderSubMenu()}
        </div>

        {activeMenu && (
          <button 
            onClick={() => setActiveMenu(null)} 
            className="absolute top-8 right-8 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600"
          >
            <X className="w-10 h-10" />
          </button>
        )}
      </div>
      <style jsx>{`
        @keyframes defend {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .defend-animation {
          animation: defend 2s ease-in-out infinite;
        }
        @keyframes heal {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.5); }
        }
        .heal-animation {
          animation: heal 1s ease-in-out;
        }
        @keyframes playerAttack {
          0% { transform: translate(0, 0); }
          45% { transform: translate(270px, -90px); }
          50% { transform: translate(300px, -100px); }
          55% { transform: translate(270px, -90px); }
          100% { transform: translate(0, 0); }
        }
        .player-attack {
          animation: playerAttack 1s ease-in-out;
        }
        @keyframes enemyHit {
          0%, 44%, 100% { background-color: #ca8a04; transform: translate(0, 0); }
          45%, 47%, 49%, 51%, 53%, 55% { background-color: #dc2626; }
          46%, 50%, 54% { transform: translate(-5px, -5px); }
          48%, 52% { transform: translate(5px, 5px); }
        }
        .enemy-hit {
          animation: enemyHit 1s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default BattleUI;