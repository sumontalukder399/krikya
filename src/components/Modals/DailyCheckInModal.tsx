import React, { useState } from 'react';
import { X, CheckCircle, Gift, Sparkles, Coins } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DailyCheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaimCoins: (amount: number) => void;
  coinBalance: number;
}

export const DailyCheckInModal: React.FC<DailyCheckInModalProps> = ({
  isOpen,
  onClose,
  onClaimCoins,
  coinBalance,
}) => {
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const days = [
    { name: 'Mon', coins: 1, dayNum: 1, checked: true },
    { name: 'Tues', coins: 2, dayNum: 2, checked: true },
    { name: 'Wed', coins: 3, dayNum: 3, checked: true },
    { name: 'Thurs', coins: 4, dayNum: 4, checked: true },
    { name: 'Fri', coins: 5, dayNum: 5, checked: false, isToday: true },
    { name: 'Sat', coins: 6, dayNum: 6, checked: false },
    { name: 'Sun', coins: 8, dayNum: 7, checked: false },
  ];

  const handleCheckIn = () => {
    if (hasCheckedInToday) {
      setToastMessage('Recheck in on other day is not allow');
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff5a00', '#0e5332', '#ffb700']
      });
    } catch {
      // ignore
    }

    setHasCheckedInToday(true);
    onClaimCoins(5);
    setToastMessage('Daily check-in successful! +5 Coins added to your Reward Wallet.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl overflow-hidden animate-scaleIn border border-gray-200">
        {/* Toast alert banner if active */}
        {toastMessage && (
          <div className="absolute top-3 left-4 right-12 z-20 bg-emerald-800 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fadeIn">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-full border border-amber-200 text-amber-800 text-xs font-bold mb-2">
            <Coins className="w-3.5 h-3.5 text-amber-500" />
            <span>Daily Coin Streak</span>
          </div>

          <h3 className="text-lg font-black text-gray-800">
            Daily Check-In
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Check-in daily to earn free bonus coins for the Reward Store!
          </p>

          {/* Coin reward track */}
          <div className="my-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-4">
              <span>Day 5 of 7</span>
              <span className="text-[#0e5332]">Current Balance: {coinBalance} Coins</span>
            </div>

            {/* Daily circles */}
            <div className="grid grid-cols-7 gap-1.5">
              {days.map((d, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex flex-col items-center justify-center font-bold text-xs shadow-2xs border transition ${
                      d.checked || (d.isToday && hasCheckedInToday)
                        ? 'bg-[#0e5332] text-white border-emerald-600'
                        : d.isToday
                        ? 'bg-amber-400 text-amber-950 border-amber-500 animate-pulse'
                        : 'bg-white text-gray-500 border-gray-200'
                    }`}
                  >
                    {d.checked || (d.isToday && hasCheckedInToday) ? (
                      <CheckCircle className="w-4 h-4 text-emerald-300" />
                    ) : (
                      <span>+{d.coins}</span>
                    )}
                  </div>
                  <span className={`text-[10px] mt-1 font-semibold ${d.isToday ? 'text-[#0e5332] font-bold' : 'text-gray-500'}`}>
                    {d.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleCheckIn}
            className={`w-full font-extrabold py-3 rounded-xl text-xs shadow-md transition hover:scale-101 cursor-pointer flex items-center justify-center gap-2 ${
              hasCheckedInToday
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-[#0e5332] hover:bg-[#0a3e25] text-white'
            }`}
          >
            <Gift className="w-4 h-4 text-amber-300" />
            <span>{hasCheckedInToday ? 'Already Checked In Today' : 'Check In Today'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
