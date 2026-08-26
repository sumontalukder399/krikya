import React, { useState } from 'react';
import { Coins, CheckCircle, Flame, Gift, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface KrikbetChallengeViewProps {
  onClaimCoins: (amount: number) => void;
  coinBalance: number;
}

export const KrikbetChallengeView: React.FC<KrikbetChallengeViewProps> = ({
  onClaimCoins,
  coinBalance,
}) => {
  const [claimedTasks, setClaimedTasks] = useState<number[]>([]);

  const missions = [
    { id: 1, title: 'Complete Account Verification', reward: 50, progress: 100, isDone: true, desc: 'Verify your phone number and email address.' },
    { id: 2, title: 'Make Your First Deposit (Min ৳500)', reward: 100, progress: 100, isDone: true, desc: 'Deposit funds using Nagad, bKash, Rocket, or USDT.' },
    { id: 3, title: 'Daily Slot Turnover (৳3,000 / ৳3,000)', reward: 50, progress: 100, isDone: true, desc: 'Play any of our 2,000+ top slot games today.' },
    { id: 4, title: 'Bet on Live Cricket Match', reward: 80, progress: 60, isDone: false, desc: 'Place a minimum ৳500 bet on any live cricket match.' },
    { id: 5, title: 'Refer 1 Active Depositing Friend', reward: 500, progress: 33, isDone: false, desc: 'Your friend registers and makes a deposit.' },
  ];

  const handleClaim = (id: number, amount: number) => {
    if (claimedTasks.includes(id)) return;
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff5a00', '#0e5332', '#ffb700']
      });
    } catch {}
    setClaimedTasks((prev) => [...prev, id]);
    onClaimCoins(amount);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 space-y-4 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#0e5332] via-[#093c24] to-[#ff5a00] text-white rounded-2xl p-6 shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">
            Play Missions, Earn Free Coins
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white">
            Krikbet Challenge
          </h1>
          <p className="text-xs text-emerald-100 mt-1 max-w-md">
            Complete daily and weekly missions to collect reward coins and redeem real electronics, mobile packages, and cash vouchers.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xs px-4 py-2.5 rounded-xl border border-white/20 text-center">
          <span className="text-gray-300 text-[10px] uppercase font-bold block">Wallet Balance</span>
          <span className="text-amber-300 font-black text-lg flex items-center justify-center gap-1">
            <Coins className="w-4 h-4 text-amber-400" />
            {coinBalance} Coins
          </span>
        </div>
      </div>

      {/* Free Coin Boxes Row (Exact as shown in video: FREE 50, FREE 100, FREE 500) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl p-4 shadow-md flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider block opacity-90">Daily Login Reward</span>
            <h3 className="text-xl font-black">FREE 50 COINS</h3>
          </div>
          <Coins className="w-10 h-10 text-amber-200 opacity-80" />
        </div>

        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-xl p-4 shadow-md flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider block opacity-90">Turnover Booster</span>
            <h3 className="text-xl font-black">FREE 100 COINS</h3>
          </div>
          <Gift className="w-10 h-10 text-emerald-200 opacity-80" />
        </div>

        <div className="bg-gradient-to-br from-[#ff5a00] to-[#e04f00] text-white rounded-xl p-4 shadow-md flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider block opacity-90">Mega Referral</span>
            <h3 className="text-xl font-black">FREE 500 COINS</h3>
          </div>
          <Sparkles className="w-10 h-10 text-amber-200 opacity-80" />
        </div>
      </div>

      {/* Mission Tasks List */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xs space-y-3">
        <h3 className="text-sm font-extrabold text-gray-800">
          Daily & Weekly Mission List
        </h3>

        <div className="space-y-3">
          {missions.map((m) => {
            const isClaimed = claimedTasks.includes(m.id);
            return (
              <div
                key={m.id}
                className="bg-gray-50 hover:bg-emerald-50/40 p-4 rounded-xl border border-gray-200 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-xs sm:text-sm text-gray-800">
                      {m.title}
                    </h4>
                    <span className="bg-amber-100 text-amber-900 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 border border-amber-300">
                      <Coins className="w-3 h-3 text-amber-600" />
                      +{m.reward} Coins
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{m.desc}</p>
                  
                  {/* Progress bar */}
                  <div className="w-full max-w-xs bg-gray-200 h-2 rounded-full overflow-hidden mt-2">
                    <div
                      className={`h-full ${m.progress === 100 ? 'bg-emerald-500' : 'bg-[#ff5a00]'}`}
                      style={{ width: `${m.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  {isClaimed ? (
                    <button
                      disabled
                      className="bg-gray-200 text-gray-500 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1 cursor-not-allowed"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Claimed</span>
                    </button>
                  ) : m.isDone ? (
                    <button
                      onClick={() => handleClaim(m.id, m.reward)}
                      className="bg-[#0e5332] hover:bg-[#0a3e25] text-white text-xs font-black px-5 py-2.5 rounded-xl shadow-md transition hover:scale-102 cursor-pointer flex items-center gap-1.5 animate-pulse"
                    >
                      <Gift className="w-4 h-4 text-amber-300" />
                      <span>Claim Reward</span>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="bg-gray-100 text-gray-400 text-xs font-bold px-4 py-2 rounded-xl border border-gray-200 cursor-not-allowed"
                    >
                      In Progress ({m.progress}%)
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
