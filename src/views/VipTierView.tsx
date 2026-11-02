import React, { useEffect, useState } from 'react';
import { Crown } from 'lucide-react';
import { player, type Vip } from '../platform/player';

const taka = (minor = 0) => `৳ ${(minor / 100).toLocaleString()}`;

export const VipTierView: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const [vip, setVip] = useState<Vip | null>(null);
  const [loading, setLoading] = useState(isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) return;
    player.vip().then(setVip).catch(() => setVip(null)).finally(() => setLoading(false));
  }, [isLoggedIn]);

  return (
    <div className="mx-auto max-w-7xl space-y-5 px-2 pb-12 pt-4 sm:px-4">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-[#0a1e14] via-[#0e5332] to-[#146b41] p-6 text-white shadow-xl">
        <h1 className="text-2xl font-black uppercase sm:text-3xl">VIP</h1>
        {vip && (
          <div className="min-w-[260px] space-y-1 rounded-xl border border-white/20 bg-white/10 p-4 text-xs">
            <div className="flex items-center justify-between"><span className="text-gray-300">Your VIP Level:</span><span className="flex items-center gap-1 text-sm font-black text-amber-300"><Crown className="h-4 w-4" />{vip.current?.name ?? 'Normal'}</span></div>
            <div className="flex justify-between text-gray-200"><span>Total deposit:</span><span className="font-bold">{taka(vip.cumulativeDepositMinor)}</span></div>
            <div className="flex justify-between text-gray-200"><span>Total turnover:</span><span className="font-bold">{taka(vip.cumulativeTurnoverMinor)}</span></div>
          </div>
        )}
      </div>
      {!isLoggedIn && <p className="py-10 text-center text-sm text-gray-500">Log in to see your VIP level.</p>}
      {loading && <p className="text-xs text-gray-500">Loading...</p>}
      {vip && vip.tiers.length === 0 && <p className="py-10 text-center text-sm text-gray-500">VIP levels are not set up yet.</p>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {vip?.tiers.map((tier) => (
          <div key={tier.name} className={`space-y-1 rounded-2xl border bg-white p-5 text-xs shadow-xs ${vip.current?.name === tier.name ? 'border-[#ff5a00]' : 'border-gray-200'}`}>
            <h2 className="flex items-center gap-1 text-sm font-black text-gray-900"><Crown className="h-4 w-4 text-amber-500" />{tier.name}</h2>
            <p className="text-gray-600">Deposit needed: {taka(tier.minDepositMinor)}</p>
            <p className="text-gray-600">Turnover needed: {taka(tier.minTurnoverMinor)}</p>
            {!!tier.cashbackPercent && <p className="text-gray-600">Cashback: {tier.cashbackPercent}%</p>}
            {!!tier.bonusPercent && <p className="text-gray-600">Reload bonus: {tier.bonusPercent}%</p>}
            {!!tier.withdrawalLimitMinor && <p className="text-gray-600">Withdrawal limit: {taka(tier.withdrawalLimitMinor)}</p>}
            {tier.dedicatedManager && <p className="text-gray-600">Dedicated VIP manager</p>}
          </div>
        ))}
      </div>
    </div>
  );
};
