import React, { useState } from 'react';
import { MOCK_CASINO_GAMES, PROVIDERS_BY_CATEGORY } from '../data/mockData';
import { Search, Play, Tv, Users } from 'lucide-react';

interface LiveCasinoViewProps {
  onPlayGame: (title: string) => void;
}

export const LiveCasinoView: React.FC<LiveCasinoViewProps> = ({ onPlayGame }) => {
  const [selectedProvider, setSelectedProvider] = useState<string>('PP');
  const [searchQuery, setSearchQuery] = useState('');

  const providers = PROVIDERS_BY_CATEGORY.casino;

  const filteredGames = MOCK_CASINO_GAMES.filter((game) => {
    const matchesProvider = selectedProvider === 'ALL' || game.provider === selectedProvider || selectedProvider === 'PP';
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProvider && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 space-y-4 pb-12">
      {/* Category Banner */}
      <div className="bg-gradient-to-r from-[#1e1b4b] via-[#312e81] to-[#0e5332] text-white rounded-2xl p-6 shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">
            Live Dealer Games & Online Casino
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white">
            Live Casino
          </h1>
          <p className="text-xs text-emerald-100 mt-1 max-w-md">
            Stream high-definition live dealer tables 24/7 with professional croupiers in Baccarat, Blackjack VIP, Roulette, and Mega Game Shows.
          </p>
        </div>
      </div>

      {/* Search & Provider Filter Header */}
      <div className="bg-white rounded-xl p-3 shadow-xs border border-gray-200 space-y-3">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Live Tables..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:bg-white focus:outline-hidden focus:border-[#0e5332]"
          />
        </div>

        {/* Provider Chips */}
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
              
              <div className="absolute top-1.5 left-1.5 bg-red-600/90 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded shadow flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                <span>LIVE</span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                <div className="w-10 h-10 rounded-full bg-[#ff5a00] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <span className="mt-2 text-xs font-extrabold text-white uppercase tracking-wider">
                  Join Table
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-white">
              <h4 className="font-bold text-xs text-gray-800 truncate group-hover:text-[#0e5332]">
                {game.title}
              </h4>
              <div className="flex items-center justify-between mt-1 text-[10px] text-gray-400 font-semibold uppercase">
                <span>{game.provider}</span>
                <span className="text-emerald-700 font-bold">24/7 Table</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
