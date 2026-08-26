import React, { useState } from 'react';
import { MOCK_REWARD_ITEMS } from '../data/mockData';
import { RewardStoreItem } from '../types';
import { ShoppingBag, Coins, Search, Filter, Check, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RewardStoreViewProps {
  coinBalance: number;
  onRedeemReward: (item: RewardStoreItem) => void;
}

export const RewardStoreView: React.FC<RewardStoreViewProps> = ({
  coinBalance,
  onRedeemReward,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<RewardStoreItem | null>(null);
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'top', name: 'Top Redeem' },
    { id: 'data', name: 'Telco Data Plans' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'home', name: 'Home & Living' },
  ];

  const filteredItems = MOCK_REWARD_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleConfirmRedeem = () => {
    if (!selectedItem) return;
    if (coinBalance < selectedItem.costCoins) {
      setErrorMessage(`Insufficient coins. You need ${selectedItem.costCoins} coins but currently have ${coinBalance} coins.`);
      return;
    }

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff5a00', '#0e5332', '#ffb700']
      });
    } catch {}

    onRedeemReward(selectedItem);
    setRedeemSuccess(true);
    setTimeout(() => {
      setRedeemSuccess(false);
      setSelectedItem(null);
    }, 2200);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 space-y-4 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#0e5332] via-[#093c24] to-[#ff5a00] text-white rounded-2xl p-6 shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">
            Bangladesh's 1st Ever Gaming Rewards Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white">
            Reward Store
          </h1>
          <p className="text-xs text-emerald-100 mt-1 max-w-md">
            Exchange your earned gaming loyalty coins for genuine mobile data packs, top brand household electronics, and luxury prizes.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xs px-4 py-2.5 rounded-xl border border-white/20 text-center">
          <span className="text-gray-300 text-[10px] uppercase font-bold block">Available Coins</span>
          <span className="text-amber-300 font-black text-lg flex items-center justify-center gap-1">
            <Coins className="w-4 h-4 text-amber-400" />
            {coinBalance} Coins
          </span>
        </div>
      </div>

      {/* Filter and Category row */}
      <div className="bg-white rounded-xl p-3 shadow-xs border border-gray-200 space-y-3">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Reward Items..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:bg-white focus:outline-hidden focus:border-[#0e5332]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-[#0e5332] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setErrorMessage('');
              setSelectedItem(item);
            }}
            className="bg-white rounded-xl p-3 border border-gray-200 hover:border-[#ff5a00] shadow-2xs hover:shadow-lg transition flex flex-col justify-between cursor-pointer group"
          >
            {/* Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 mb-2 flex items-center justify-center p-2">
              <img
                src={item.image}
                alt={item.name}
                className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-1.5 left-1.5 bg-gray-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                {item.category.toUpperCase()}
              </span>
            </div>

            <div>
              <h4 className="font-bold text-xs text-gray-800 line-clamp-2 group-hover:text-[#0e5332]">
                {item.name}
              </h4>
            </div>

            <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-600 font-black text-xs">
                <Coins className="w-3.5 h-3.5 text-amber-500" />
                <span>{item.costCoins}</span>
              </div>

              <button
                type="button"
                className="bg-[#0e5332] group-hover:bg-[#ff5a00] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-md transition"
              >
                Redeem
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Redeem Confirmation Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl animate-scaleIn border border-gray-200">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-3 bg-gray-50 rounded-xl p-2 flex items-center justify-center">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <h3 className="font-extrabold text-sm text-gray-800">
                {selectedItem.name}
              </h3>

              <div className="my-3 flex items-center justify-center gap-1.5 text-amber-600 font-black text-base">
                <Coins className="w-5 h-5 text-amber-500" />
                <span>{selectedItem.costCoins} Coins Required</span>
              </div>

              {errorMessage && (
                <div className="mb-3 bg-red-50 text-red-600 text-xs p-2 rounded-lg border border-red-200">
                  {errorMessage}
                </div>
              )}

              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-200 text-left mb-4 space-y-1">
                <div className="flex justify-between">
                  <span>Your Balance:</span>
                  <span className="font-bold text-gray-800">{coinBalance} Coins</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Method:</span>
                  <span className="font-bold text-[#0e5332]">Instant / Courier Express</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmRedeem}
                  className="flex-1 bg-[#ff5a00] hover:bg-[#e04f00] text-white font-extrabold py-2.5 rounded-xl text-xs shadow-md transition flex items-center justify-center gap-1"
                >
                  {redeemSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Redeemed!</span>
                    </>
                  ) : (
                    <span>Confirm Redeem</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
