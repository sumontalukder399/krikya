import React, { useState, useEffect } from 'react';
import { MOCK_CRASH_GAMES, PROVIDERS_BY_CATEGORY } from '../data/mockData';
import { Search, Play, Zap, Flame, Rocket, ArrowUpRight } from 'lucide-react';

interface CrashGamesViewProps {
  onPlayGame: (title: string) => void;
}

export const CrashGamesView: React.FC<CrashGamesViewProps> = ({ onPlayGame }) => {
  const [selectedProvider, setSelectedProvider] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Aviator Live Simulation state
  const [multiplier, setMultiplier] = useState(1.00);
  const [isFlying, setIsFlying] = useState(true);
  const [hasCrashed, setHasCrashed] = useState(false);
  const [betPlaced, setBetPlaced] = useState(false);
  const [cashedOutAt, setCashedOutAt] = useState<number | null>(null);

  useEffect(() => {
    let interval: any;
    if (isFlying && !hasCrashed) {
      interval = setInterval(() => {
        setMultiplier((prev) => {
          const next = +(prev + 0.04 * (prev * 0.5)).toFixed(2);
          if (next > 4.85) {
            setHasCrashed(true);
            setIsFlying(false);
            return next;
          }
          return next;
        });
      }, 100);
    } else if (hasCrashed) {
      const resetTimeout = setTimeout(() => {
        setMultiplier(1.00);
        setHasCrashed(false);
        setIsFlying(true);
        setBetPlaced(false);
        setCashedOutAt(null);
      }, 2500);
      return () => clearTimeout(resetTimeout);
    }
    return () => clearInterval(interval);
  }, [isFlying, hasCrashed]);

  const providers = PROVIDERS_BY_CATEGORY.crash;

  const filteredGames = MOCK_CRASH_GAMES.filter((game) => {
    const matchesProvider = selectedProvider === 'ALL' || game.provider === selectedProvider;
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProvider && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 space-y-4 pb-12">
      {/* Category Banner */}
      <div className="bg-gradient-to-r from-[#881337] via-[#9f1239] to-[#ff5a00] text-white rounded-2xl p-6 shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">
            Fast Multipliers & Instant Cashout
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white">
            Crash Games
          </h1>
          <p className="text-xs text-rose-100 mt-1 max-w-md">
            Test your nerves in Aviator, Spaceman, and High Flyer. Cash out before the rocket crashes to multiply your stake by up to 10,000x!
          </p>
        </div>
      </div>

      {/* Interactive Aviator Live Arena Widget */}
      <div className="bg-[#0f172a] text-white rounded-2xl p-4 sm:p-6 border border-rose-950 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-rose-500 animate-bounce" />
            <h3 className="font-extrabold text-sm sm:text-base text-white">
              Aviator Live Arena (Real-time Demo)
            </h3>
          </div>
          <span className="bg-rose-900/60 text-rose-300 text-[10px] font-mono px-2 py-0.5 rounded border border-rose-700">
            Provably Fair SHA-256
          </span>
        </div>

        {/* Flight stage */}
        <div className="relative h-44 sm:h-56 bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-xl flex flex-col items-center justify-center border border-slate-700 overflow-hidden">
          <div className="text-center z-10">
            {hasCrashed ? (
              <div className="animate-scaleIn">
                <span className="text-red-500 font-black text-3xl sm:text-5xl block">
                  FLEW AWAY!
                </span>
                <span className="text-gray-400 text-xs font-mono mt-1 block">
                  @ {multiplier.toFixed(2)}x
                </span>
              </div>
            ) : (
              <div>
                <span className="text-white font-black text-4xl sm:text-6xl font-mono tracking-tight drop-shadow-md text-amber-400">
                  {multiplier.toFixed(2)}x
                </span>
                {cashedOutAt && (
                  <span className="bg-emerald-500 text-black font-extrabold text-xs px-2.5 py-1 rounded-full mt-2 block shadow-lg animate-bounce">
                    CASHED OUT @ {cashedOutAt.toFixed(2)}x (+৳{(500 * cashedOutAt).toFixed(2)})
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Stake: <span className="font-bold text-white font-mono">৳ 500.00</span>
            </div>

            {!betPlaced ? (
              <button
                onClick={() => setBetPlaced(true)}
                disabled={hasCrashed}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-6 py-2 rounded-lg shadow-lg transition cursor-pointer disabled:opacity-50"
              >
                BET ৳ 500
              </button>
            ) : (
              <button
                onClick={() => {
                  setCashedOutAt(multiplier);
                  setBetPlaced(false);
                }}
                disabled={hasCrashed || !!cashedOutAt}
                className="bg-[#ff5a00] hover:bg-[#e04f00] text-white font-black text-xs px-6 py-2 rounded-lg shadow-lg transition cursor-pointer animate-pulse"
              >
                CASH OUT (৳ {(500 * multiplier).toFixed(2)})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Provider Filter Header */}
      <div className="bg-white rounded-xl p-3 shadow-xs border border-gray-200 space-y-3">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Crash Games..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:bg-white focus:outline-hidden focus:border-[#0e5332]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setSelectedProvider('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
              selectedProvider === 'ALL'
                ? 'bg-[#0e5332] text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Providers
          </button>
          {providers.map((prov) => (
            <button
              key={prov.code}
              onClick={() => setSelectedProvider(prov.code)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition flex items-center gap-1 ${
                selectedProvider === prov.code
                  ? 'bg-[#0e5332] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{prov.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            onClick={() => onPlayGame(game.title)}
            className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#ff5a00] shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-gray-900">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              
              {game.isHot && (
                <span className="absolute top-1.5 right-1.5 bg-red-600 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded shadow">
                  HOT
                </span>
              )}

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                <div className="w-10 h-10 rounded-full bg-[#ff5a00] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <span className="mt-2 text-xs font-extrabold text-white uppercase tracking-wider">
                  Launch Crash
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-white">
              <h4 className="font-bold text-xs text-gray-800 truncate group-hover:text-[#0e5332]">
                {game.title}
              </h4>
              <div className="flex items-center justify-between mt-1 text-[10px] text-gray-400 font-semibold uppercase">
                <span>{game.provider}</span>
                <span className="text-[#ff5a00] font-bold">10,000x Max</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
