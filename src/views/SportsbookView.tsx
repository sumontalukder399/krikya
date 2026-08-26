import React, { useState } from 'react';
import { PROVIDERS_BY_CATEGORY, MOCK_CRICKET_MATCHES } from '../data/mockData';
import { Search, Activity, Trophy, ShieldCheck, ArrowRight, Play } from 'lucide-react';

interface SportsbookViewProps {
  onPlayGame: (title: string) => void;
}

export const SportsbookView: React.FC<SportsbookViewProps> = ({ onPlayGame }) => {
  const [selectedSport, setSelectedSport] = useState<string>('ALL');

  const sportsbooks = [
    { name: 'SABA Sports', code: 'SABA', desc: 'Asia’s largest sportsbook platform with over 20,000 monthly live events.', liveCount: 420 },
    { name: 'BTI Sports', code: 'BTI', desc: 'European & Asian handicap markets with ultra-high betting limits.', liveCount: 310 },
    { name: 'CMD368', code: 'CMD', desc: 'Comprehensive coverage of international football, basketball, and tennis.', liveCount: 280 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 space-y-4 pb-12">
      {/* Category Banner */}
      <div className="bg-gradient-to-r from-[#1e3a8a] via-[#1d4ed8] to-[#0e5332] text-white rounded-2xl p-6 shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">
            Global Sports & In-Play Betting
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white">
            Sportsbook
          </h1>
          <p className="text-xs text-blue-100 mt-1 max-w-md">
            Bet on Premier League, UEFA Champions League, NBA, Tennis, and eSports with guaranteed early cashout and live match streaming.
          </p>
        </div>
      </div>

      {/* Sportsbook Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sportsbooks.map((sb) => (
          <div
            key={sb.code}
            onClick={() => onPlayGame(sb.name)}
            className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-[#ff5a00] shadow-2xs hover:shadow-lg transition cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 font-black text-sm flex items-center justify-center border border-blue-200 group-hover:bg-[#ff5a00] group-hover:text-white transition">
                  {sb.code}
                </div>
                <span className="bg-emerald-50 text-[#0e5332] text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                  {sb.liveCount} Live Matches
                </span>
              </div>

              <h3 className="font-extrabold text-base text-gray-800 group-hover:text-[#0e5332]">
                {sb.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                {sb.desc}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#ff5a00]">
              <span>Enter Sportsbook</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
