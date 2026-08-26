import React, { useState } from 'react';
import { Sparkles, Gift, Disc, RotateCw, Trophy, Coins, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FortuneSpinViewProps {
  onWinReward: (amount: number, type: 'cash' | 'coin') => void;
}

export const FortuneSpinView: React.FC<FortuneSpinViewProps> = ({ onWinReward }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [spinsLeft, setSpinsLeft] = useState(2);
  const [wonPrize, setWonPrize] = useState<string | null>(null);

  const segments = [
    { label: '৳ 1,000', amount: 1000, type: 'cash' as const, color: '#0e5332' },
    { label: '50 Coins', amount: 50, type: 'coin' as const, color: '#ff5a00' },
    { label: '৳ 200', amount: 200, type: 'cash' as const, color: '#16a34a' },
    { label: '100 Coins', amount: 100, type: 'coin' as const, color: '#d97706' },
    { label: '৳ 5,000', amount: 5000, type: 'cash' as const, color: '#7c3aed' },
    { label: '25 Coins', amount: 25, type: 'coin' as const, color: '#2563eb' },
    { label: '৳ 500', amount: 500, type: 'cash' as const, color: '#dc2626' },
    { label: '500 Coins', amount: 500, type: 'coin' as const, color: '#ca8a04' },
  ];

  const handleSpin = () => {
    if (isSpinning) return;
    if (spinsLeft <= 0) {
      alert('No more spins left today! Deposit ৳500 to get another spin.');
      return;
    }

    setIsSpinning(true);
    setWonPrize(null);

    const randomIndex = Math.floor(Math.random() * segments.length);
    const degreesPerSegment = 360 / segments.length;
    const targetDegree = 360 * 5 + (360 - randomIndex * degreesPerSegment - degreesPerSegment / 2);
    const newRotation = rotation + targetDegree;

    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const chosen = segments[randomIndex];
      setWonPrize(chosen.label);
      setSpinsLeft((s) => Math.max(0, s - 1));

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff5a00', '#0e5332', '#ffb700']
        });
      } catch {}

      onWinReward(chosen.amount, chosen.type);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 space-y-4 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#991b1b] via-[#b91c1c] to-[#ff5a00] text-white rounded-2xl p-6 shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">
            Spin the Mega Wheel of Fortune
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white">
            Fortune Spin
          </h1>
          <p className="text-xs text-red-100 mt-1 max-w-md">
            Spin daily for free to win guaranteed jackpot prizes up to ৳5,000 cash and high-value reward coins.
          </p>
        </div>
      </div>

      {/* Interactive Wheel Stage */}
      <div className="bg-gradient-to-b from-[#1c0b0b] to-[#0d0404] text-white rounded-2xl p-6 sm:p-10 border border-red-950 shadow-2xl text-center space-y-6 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 bg-red-950/80 px-4 py-1.5 rounded-full border border-red-700 text-amber-300 text-xs font-black">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>You have {spinsLeft} Free Spins Left</span>
        </div>

        {/* Wheel container */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
          {/* Top Pointer */}
          <div className="absolute -top-3 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-amber-400 drop-shadow-md"></div>

          {/* Rotating Wheel graphic */}
          <div
            className="w-full h-full rounded-full border-4 border-amber-400 shadow-2xl overflow-hidden relative transition-transform duration-[4000ms] cubic-bezier(0.17, 0.67, 0.12, 0.99)"
            style={{
              transform: `rotate(${rotation}deg)`,
              background: 'conic-gradient(#0e5332 0deg 45deg, #ff5a00 45deg 90deg, #16a34a 90deg 135deg, #d97706 135deg 180deg, #7c3aed 180deg 225deg, #2563eb 225deg 270deg, #dc2626 270deg 315deg, #ca8a04 315deg 360deg)',
            }}
          >
            {/* Center wheel pin */}
          </div>

          {/* Center Hub Button */}
          <button
            onClick={handleSpin}
            disabled={isSpinning || spinsLeft <= 0}
            className="absolute z-10 w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-xs shadow-xl border-4 border-white flex flex-col items-center justify-center hover:scale-105 transition active:scale-95 disabled:opacity-80 cursor-pointer"
          >
            <RotateCw className={`w-5 h-5 mb-0.5 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? 'SPINNING' : 'SPIN'}</span>
          </button>
        </div>

        {wonPrize && (
          <div className="animate-scaleIn bg-amber-400 text-slate-950 font-black text-sm px-6 py-2.5 rounded-full shadow-lg">
            🎉 CONGRATULATIONS! YOU WON {wonPrize}!
          </div>
        )}
      </div>
    </div>
  );
};
