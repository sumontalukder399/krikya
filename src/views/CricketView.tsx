import React, { useState } from 'react';
import { MOCK_CRICKET_MATCHES } from '../data/mockData';
import { Search, PlayCircle, Activity, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface CricketViewProps {
  onPlaceBet: (match: string, team: string, odds: number) => void;
}

export const CricketView: React.FC<CricketViewProps> = ({ onPlaceBet }) => {
  const [selectedExchange, setSelectedExchange] = useState<'BETSWIZ' | '9WICKET'>('BETSWIZ');
  const [betModalData, setBetModalData] = useState<{ match: string; team: string; odds: number } | null>(null);
  const [stakeAmount, setStakeAmount] = useState('500');
  const [betSuccess, setBetSuccess] = useState(false);

  const handleBetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!betModalData) return;
    onPlaceBet(betModalData.match, betModalData.team, betModalData.odds);
    setBetSuccess(true);
    setTimeout(() => {
      setBetSuccess(false);
      setBetModalData(null);
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 space-y-4 pb-12">
      {/* Category Banner */}
      <div className="bg-gradient-to-r from-[#072718] via-[#0e5332] to-[#146b41] text-white rounded-2xl p-6 shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">
            Official Cricket Exchange Bangladesh
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white">
            Cricket Betting
          </h1>
          <p className="text-xs text-emerald-100 mt-1 max-w-md">
            Place back & lay bets with real-time live cricket exchange odds on BPL, IPL, CPL, ICC World Cup, and Test Series.
          </p>
        </div>
      </div>

      {/* Video Guide Notification Bar (Exact as in video!) */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs">
        <span className="text-amber-900 font-semibold">
          Need guide on how to play Cricket? Click the button to know more.
        </span>
        <button
          onClick={() => alert('Opening Cricket Betting Tutorial Guide on YouTube...')}
          className="bg-[#ff5a00] hover:bg-[#e04f00] text-white font-bold text-[10px] px-3 py-1 rounded-md flex items-center gap-1 shadow-2xs cursor-pointer"
        >
          <PlayCircle className="w-3 h-3" />
          <span>WATCH VIDEO</span>
        </button>
      </div>

      {/* Exchange Provider Tabs (BETSWIZ & 9Wicket) */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSelectedExchange('BETSWIZ')}
          className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer shadow-xs ${
            selectedExchange === 'BETSWIZ'
              ? 'bg-[#0e5332] text-white border-2 border-emerald-500'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-[10px]">
            BW
          </div>
          <span>BETSWIZ</span>
          <span className="bg-emerald-800 text-emerald-200 text-[10px] px-1.5 py-0.2 rounded">Exchange</span>
        </button>

        <button
          onClick={() => setSelectedExchange('9WICKET')}
          className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer shadow-xs ${
            selectedExchange === '9WICKET'
              ? 'bg-[#0e5332] text-white border-2 border-emerald-500'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-amber-500 text-gray-900 flex items-center justify-center font-bold text-[10px]">
            9W
          </div>
          <span>9wicket</span>
          <span className="bg-emerald-800 text-emerald-200 text-[10px] px-1.5 py-0.2 rounded">Live Odds</span>
        </button>
      </div>

      {/* Match Odds List */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xs space-y-3">
        <h3 className="text-sm font-extrabold text-gray-800 flex items-center gap-2">
          <Activity className="w-4 h-4 text-red-600 animate-pulse" />
          <span>Active Match Exchanges</span>
        </h3>

        <div className="space-y-3">
          {MOCK_CRICKET_MATCHES.map((match) => (
            <div
              key={match.id}
              className="bg-gray-50 hover:bg-emerald-50/40 p-4 rounded-xl border border-gray-200 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-[#0e5332]">{match.tournament}</span>
                  <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    LIVE
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  Start: {match.dateText}
                </div>
              </div>

              {/* Teams & Odds Selection Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setBetModalData({ match: match.tournament, team: match.team1.name, odds: match.team1.odds })}
                  className="flex-1 sm:flex-none flex items-center justify-between sm:justify-start gap-3 bg-white hover:bg-emerald-50 border border-gray-300 hover:border-[#0e5332] px-3.5 py-2 rounded-lg text-xs transition cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{match.team1.flag}</span>
                    <span className="font-bold text-gray-800">{match.team1.name}</span>
                  </div>
                  <span className="bg-[#0e5332] text-white font-mono font-bold text-xs px-2 py-0.5 rounded">
                    {match.team1.odds.toFixed(2)}
                  </span>
                </button>

                <button
                  onClick={() => setBetModalData({ match: match.tournament, team: match.team2.name, odds: match.team2.odds })}
                  className="flex-1 sm:flex-none flex items-center justify-between sm:justify-start gap-3 bg-white hover:bg-emerald-50 border border-gray-300 hover:border-[#0e5332] px-3.5 py-2 rounded-lg text-xs transition cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{match.team2.flag}</span>
                    <span className="font-bold text-gray-800">{match.team2.name}</span>
                  </div>
                  <span className="bg-[#0e5332] text-white font-mono font-bold text-xs px-2 py-0.5 rounded">
                    {match.team2.odds.toFixed(2)}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cricket Bet Slip Modal */}
      {betModalData && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl animate-scaleIn border border-gray-200">
            <h3 className="font-bold text-sm text-gray-800 mb-1">Cricket Bet Slip</h3>
            <p className="text-xs text-gray-500 mb-3">{betModalData.match}</p>

            <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs mb-4">
              <div className="flex justify-between font-bold text-gray-800">
                <span>Selection:</span>
                <span className="text-[#0e5332]">{betModalData.team}</span>
              </div>
              <div className="flex justify-between mt-1 text-gray-600">
                <span>Odds:</span>
                <span className="font-mono font-bold">{betModalData.odds.toFixed(2)}</span>
              </div>
            </div>

            <form onSubmit={handleBetSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Stake Amount (BDT)</label>
                <input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-bold text-gray-800 focus:bg-white focus:outline-hidden focus:border-[#0e5332]"
                  required
                />
              </div>

              <div className="flex justify-between text-xs font-bold text-gray-700 pt-1">
                <span>Potential Win:</span>
                <span className="text-[#ff5a00] text-sm">
                  ৳ {(Number(stakeAmount || 0) * betModalData.odds).toFixed(2)}
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setBetModalData(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#ff5a00] hover:bg-[#e04f00] text-white font-extrabold py-2.5 rounded-xl shadow-md transition flex items-center justify-center gap-1"
                >
                  {betSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Bet Placed!</span>
                    </>
                  ) : (
                    <span>Place Bet</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
