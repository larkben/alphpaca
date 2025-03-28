import React from "react";

const Terminal = () => {
  return (
    <aside className="bg-black text-white p-6 rounded-lg w-full max-w-lg font-mono">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 text-red-500">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <p className="text-sm">alphpaca-stats</p>
      </div>
      <div className="mt-4">
        <p className="text-green-400">$ npm run information </p>
        <p className="text-white">$ 11 Million PACA         </p>
        <p className="text-white">$ 333 ALPHpacas           </p>
        <p className="text-white">$ 7 ALPH Mint             </p>
        <p className="text-white">$ NO ICO; AIRDROPPED      </p>
        <p className="text-green-400">$                     </p>
      </div>
    </aside>
  )
}

export default Terminal;