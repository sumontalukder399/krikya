import React, { useState } from 'react';
import { Sparkles, Gift, HelpCircle, Trophy, RefreshCw, X, CheckCircle, Coins } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CardManiaViewProps {
  onWinReward: (amount: number, type: 'cash' | 'coin') => void;
}

export const CardManiaView: React.FC<CardManiaViewProps> = ({ onWinReward }) => {
  const [chances, setChances] = useState(3);
  const [cards, setCards] = useState<Array<{ id: number; revealed: boolean; prize: string; amount: number; type: 'cash' | 'coin' }>>([
    { id: 1, revealed: false, prize: '৳ 500 Cash', amount: 500, type: 'cash' },
    { id: 2, revealed: false, prize: '50 Coins', amount: 50, type: 'coin' },
    { id: 3, revealed: false, prize: '৳ 1,000 Cash', amount: 1000, type: 'cash' },
  ]);
  const [showTerms, setShowTerms] = useState(false);
  const [winningHistory, setWinningHistory] = useState<Array<{ date: string; prize: string }>>([
    { date: '2026-08-20 14:32', prize: '৳ 500 Cash Bonus' },
    { date: '2026-08-18 19:15', prize: '100 Reward Coins' },
  ]);

  const handleFlipCard = (index: number) => {
    if (cards[index].revealed) return;
    if (chances <= 0) {
      alert('You have 0 chances remaining. Deposit ৳500 to earn more flip chances!');
      return;
    }

    const updated = [...cards];
    updated[index].revealed = true;
    setCards(updated);
    setChances((c) => Math.max(0, c - 1));

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff5a00', '#0e5332', '#ffb700']
      });
    } catch {}

    const wonItem = updated[index];
    onWinReward(wonItem.amount, wonItem.type);
    setWinningHistory((prev) => [
      { date: new Date().toISOString().replace('T', ' ').slice(0, 16), prize: wonItem.prize },
      ...prev,
    ]);
  };

  const handleResetCards = () => {
    setCards([
      { id: 1, revealed: false, prize: '৳ 200 Cash', amount: 200, type: 'cash' },
      { id: 2, revealed: false, prize: '100 Coins', amount: 100, type: 'coin' },
      { id: 3, revealed: false, prize: '৳ 2,000 Cash', amount: 2000, type: 'cash' },
    ]);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 space-y-4 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#701a75] via-[#4a044e] to-[#ff5a00] text-white rounded-2xl p-6 shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">
            Flip & Win Daily Mystery Jackpots
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white">
            Card Mania
          </h1>
          <p className="text-xs text-fuchsia-100 mt-1 max-w-md">
            Scratch or flip mystery cards to win instant cash drops up to ৳50,000, free spins, and VIP reward coins.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTerms(true)}
            className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 transition"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Terms & Rules</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="bg-gradient-to-b from-[#180a24] to-[#0d0414] text-white rounded-2xl p-6 sm:p-8 border border-purple-900 shadow-2xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-purple-950/80 px-4 py-1.5 rounded-full border border-purple-700 text-amber-300 text-xs font-black">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>You have {chances} Chances Remaining Today</span>
        </div>

        {/* 3 Flip Cards (Exact as shown in video!) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {cards.map((card, idx) => (
            <div
              key={card.id}
              onClick={() => handleFlipCard(idx)}
              className={`relative h-56 rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-103 shadow-xl ${
                card.revealed
                  ? 'bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-amber-300 text-slate-900'
                  : 'bg-gradient-to-br from-[#0e5332] via-[#093c24] to-[#041a10] border-2 border-emerald-500/50 text-white hover:border-[#ff5a00]'
              } flex flex-col items-center justify-center p-4`}
            >
              {card.revealed ? (
                <div className="animate-scaleIn text-center space-y-2">
                  <div className="w-14 h-14 rounded-full bg-white/90 text-amber-600 flex items-center justify-center mx-auto shadow-md">
                    {card.type === 'cash' ? <Gift className="w-8 h-8" /> : <Coins className="w-8 h-8" />}
                  </div>
                  <span className="text-xs font-black uppercase text-amber-950 block">YOU WON</span>
                  <span className="text-xl font-black text-slate-900 block">{card.prize}</span>
                </div>
              ) : (
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto border border-white/20">
                    <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
                  </div>
                  <span className="text-xs font-black tracking-widest text-emerald-300 block">CARD {card.id}</span>
                  <span className="bg-[#ff5a00] hover:bg-[#e04f00] text-white font-extrabold text-[11px] px-4 py-1.5 rounded-full inline-block shadow-md">
                    FLIP NOW
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {cards.some((c) => c.revealed) && (
          <button
            onClick={handleResetCards}
            className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Cards</span>
          </button>
        )}
      </div>

      {/* Winning Record Table */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs">
        <h3 className="font-extrabold text-sm text-gray-800 mb-3 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>My Card Mania Winning Record</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-200">
              <tr>
                <th className="p-2.5">Date & Time</th>
                <th className="p-2.5">Prize Won</th>
                <th className="p-2.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {winningHistory.map((rec, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-2.5 text-gray-600 font-mono">{rec.date}</td>
                  <td className="p-2.5 font-bold text-gray-800">{rec.prize}</td>
                  <td className="p-2.5 text-right font-bold text-emerald-600">Claimed</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Terms & Conditions Modal */}
      {showTerms && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl animate-scaleIn border border-gray-200">
            <button
              onClick={() => setShowTerms(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-base text-gray-800 mb-3">Card Mania Terms & Rules</h3>
            <div className="space-y-2 text-xs text-gray-600 leading-relaxed max-h-80 overflow-y-auto pr-1">
              <p>1. Every daily deposit of ৳500 or more grants 1 free card flip attempt.</p>
              <p>2. Maximum 10 card flip chances per user per day.</p>
              <p>3. All cash bonus prizes will be credited directly to your main wallet with a 1x turnover requirement.</p>
              <p>4. Reward coins can be immediately redeemed in the Krikya Reward Store.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
