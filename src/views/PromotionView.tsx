import React, { useState } from 'react';
import { MOCK_PROMOTIONS } from '../data/mockData';
import { PromotionItem } from '../types';
import { Flame, Clock, Gift, ArrowRight, X, Check } from 'lucide-react';

interface PromotionViewProps {
  onApplyPromo: (promoTitle: string) => void;
}

export const PromotionView: React.FC<PromotionViewProps> = ({ onApplyPromo }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'slots' | 'casino' | 'sports'>('all');
  const [selectedPromo, setSelectedPromo] = useState<PromotionItem | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const filteredPromos = MOCK_PROMOTIONS.filter((p) => {
    if (activeTab === 'all') return true;
    return p.category === activeTab || p.category === 'all';
  });

  const handleApply = (promo: PromotionItem) => {
    onApplyPromo(promo.title);
    setAppliedPromo(promo.id);
    setTimeout(() => {
      setAppliedPromo(null);
      setSelectedPromo(null);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 space-y-4 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#0e5332] via-[#093c24] to-[#ff5a00] text-white rounded-2xl p-6 shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">
            Exclusive Promotions & Bonuses
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white">
            Promotions
          </h1>
          <p className="text-xs text-emerald-100 mt-1 max-w-md">
            Boost your bankroll with generous welcome bonuses, daily deposit reloads, loss cashbacks, and exclusive tournament prize pools.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-gray-200 shadow-xs overflow-x-auto no-scrollbar">
        {[
          { id: 'all', label: 'All Promotions' },
          { id: 'slots', label: 'Slots' },
          { id: 'casino', label: 'Live Casino' },
          { id: 'sports', label: 'Sports' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#0e5332] text-white shadow-xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Promotions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPromos.map((promo) => (
          <div
            key={promo.id}
            className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#ff5a00] shadow-2xs hover:shadow-lg transition flex flex-col justify-between"
          >
            {/* Promo Banner Image */}
            <div className="relative h-44 overflow-hidden bg-gray-900">
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-[#0e5332] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow uppercase tracking-wider">
                {promo.badge}
              </div>
              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-amber-300 text-xs font-black px-2.5 py-1 rounded-md border border-amber-400/30">
                {promo.reward}
              </div>
            </div>

            {/* Promo Content */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-extrabold text-sm text-gray-800 line-clamp-1">
                  {promo.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                  {promo.description}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1 text-[11px] text-gray-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{promo.endDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPromo(promo)}
                    className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-xs transition"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleApply(promo)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#ff5a00] hover:bg-[#e04f00] text-white font-extrabold text-xs shadow-xs transition"
                  >
                    {appliedPromo === promo.id ? 'Claimed!' : 'Apply Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Details Modal */}
      {selectedPromo && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl animate-scaleIn border border-gray-200">
            <button
              onClick={() => setSelectedPromo(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-block bg-[#0e5332] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-2">
              {selectedPromo.badge}
            </div>

            <h3 className="font-extrabold text-base text-gray-800">
              {selectedPromo.title}
            </h3>

            <div className="my-4 bg-amber-50 p-3.5 rounded-xl border border-amber-200">
              <span className="text-xs text-gray-500 block">Bonus Reward Value:</span>
              <span className="text-lg font-black text-amber-700">{selectedPromo.reward}</span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              {selectedPromo.description}
            </p>

            <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs text-gray-700 space-y-1.5 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Validity:</span>
                <span className="font-bold">{selectedPromo.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Turnover Requirement:</span>
                <span className="font-bold text-[#0e5332]">1x - 15x TO</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Max Withdrawal:</span>
                <span className="font-bold">Unlimited</span>
              </div>
            </div>

            <button
              onClick={() => handleApply(selectedPromo)}
              className="w-full bg-[#ff5a00] hover:bg-[#e04f00] text-white font-extrabold py-3 rounded-xl text-xs shadow-md transition flex items-center justify-center gap-1.5"
            >
              {appliedPromo === selectedPromo.id ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Promotion Claimed!</span>
                </>
              ) : (
                <span>Claim Bonus Now</span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
