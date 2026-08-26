import React from 'react';
import { UserProfile } from '../types';
import { Crown, Shield, Gift, Sparkles, Award, Star, CheckCircle2 } from 'lucide-react';

interface VipTierViewProps {
  user: UserProfile;
}

export const VipTierView: React.FC<VipTierViewProps> = ({ user }) => {
  const tiers = [
    { name: 'Normal', color: 'text-gray-600', bg: 'bg-gray-100', border: 'border-gray-300', deposit: '৳ 0', turnover: '৳ 0', birthday: '৳ 500', upgrade: '৳ 0', manager: 'Standard' },
    { name: 'Bronze', color: 'text-amber-700', bg: 'bg-amber-100', border: 'border-amber-400', deposit: '৳ 300', turnover: '৳ 5,000', birthday: '৳ 1,000', upgrade: '৳ 300', manager: 'Standard' },
    { name: 'Silver', color: 'text-slate-600', bg: 'bg-slate-200', border: 'border-slate-400', deposit: '৳ 2,000', turnover: '৳ 30,000', birthday: '৳ 2,500', upgrade: '৳ 1,000', manager: 'Priority' },
    { name: 'Gold', color: 'text-amber-500', bg: 'bg-amber-200', border: 'border-amber-500', deposit: '৳ 10,000', turnover: '৳ 150,000', birthday: '৳ 5,000', upgrade: '৳ 3,000', manager: 'Dedicated' },
    { name: 'Platinum', color: 'text-cyan-600', bg: 'bg-cyan-100', border: 'border-cyan-400', deposit: '৳ 50,000', turnover: '৳ 800,000', birthday: '৳ 15,000', upgrade: '৳ 10,000', manager: 'Personal 24/7' },
    { name: 'Diamond', color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-500', deposit: '৳ 200,000', turnover: '৳ 3,000,000', birthday: '৳ 50,000', upgrade: '৳ 30,000', manager: 'VIP Executive' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 space-y-5 pb-12">
      {/* VIP Header Banner */}
      <div className="bg-gradient-to-r from-[#0a1e14] via-[#0e5332] to-[#146b41] text-white rounded-2xl p-6 shadow-xl border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase mb-2 border border-amber-400/30">
            <Crown className="w-3.5 h-3.5" />
            <span>Krikya Royalty Club</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white">
            VIP Tier Benefits & Privileges
          </h1>
          <p className="text-xs text-emerald-200 mt-1 max-w-md">
            Climb the VIP ladder for higher withdrawal limits, exclusive luxury gifts, dedicated VIP manager, and weekly cash drops.
          </p>
        </div>

        {/* Current User VIP Card */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-xs min-w-[260px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300">Your VIP Level:</span>
            <span className="font-black text-amber-300 text-sm flex items-center gap-1">
              <Crown className="w-4 h-4 text-amber-400" />
              {user.vipLevel}
            </span>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between text-gray-200">
              <span>Deposit Progress:</span>
              <span className="font-bold">৳ {user.vipDepositProgress} / ৳ {user.vipDepositTarget}</span>
            </div>
            <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#ff5a00] h-full w-[10%]"></div>
            </div>
            <div className="flex justify-between text-gray-200 pt-1">
              <span>Turnover Progress:</span>
              <span className="font-bold">৳ {user.vipTurnoverProgress} / ৳ {user.vipTurnoverTarget}</span>
            </div>
            <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full w-[5%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tier Overview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {tiers.map((t, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-xl p-4 border ${t.border} shadow-2xs flex flex-col justify-between text-center`}
          >
            <div>
              <div className={`w-12 h-12 rounded-full ${t.bg} ${t.color} font-black text-base flex items-center justify-center mx-auto mb-2 shadow-xs`}>
                <Crown className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-sm text-gray-800">{t.name}</h3>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 text-[11px] space-y-1 text-gray-600 text-left">
              <div>
                <span className="text-gray-400 block text-[9px]">Upgrade Bonus:</span>
                <span className="font-bold text-[#0e5332]">{t.upgrade}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[9px]">Birthday Bonus:</span>
                <span className="font-bold text-[#ff5a00]">{t.birthday}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[9px]">VIP Manager:</span>
                <span className="font-semibold text-gray-700">{t.manager}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* VIP Upgrade Terms and Rules Box (Exact as in video!) */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs text-xs text-gray-700 space-y-3">
        <h3 className="text-sm font-extrabold text-gray-800 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-500" />
          <span>VIP Level Upgrade & Maintenance Rules</span>
        </h3>

        <div className="space-y-2 text-[11px] leading-relaxed text-gray-600">
          <p>
            1. All members will begin from VIP membership from the Normal tier. To upgrade to a higher tier, members need to satisfy both Deposit and Turnover requirements.
          </p>
          <p>
            2. Once an accumulated deposit of ৳300 and an accumulated turnover of ৳5,000 will be automatically upgraded to the Club tier.
          </p>
          <p>
            3. Members will be downgraded if their VIP tier requirement is not maintained for 3 consecutive months.
          </p>
          <p>
            4. Upgrades and maintenance bonuses are calculated on a daily basis and automatically credited to your main wallet.
          </p>
        </div>
      </div>
    </div>
  );
};
