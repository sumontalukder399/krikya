import React, { useEffect, useState } from 'react';
import { Gift, X } from 'lucide-react';
import { errorMessage } from '../platform/api';
import { player, type Promotion } from '../platform/player';

const taka = (minor = 0) => `৳ ${(minor / 100).toLocaleString()}`;

function summary(p: Promotion): string {
  const parts: string[] = [];
  if (p.bonusPercent) parts.push(`${p.bonusPercent}% bonus`);
  else if (p.rewardAmountMinor) parts.push(`${taka(p.rewardAmountMinor)} bonus`);
  if (p.minDepositMinor) parts.push(`min deposit ${taka(p.minDepositMinor)}`);
  if (p.wagerMultiplier) parts.push(`${p.wagerMultiplier}x turnover`);
  return parts.join(' · ');
}

export const PromotionView: React.FC<{ onDeposit: () => void }> = ({ onDeposit }) => {
  const [promos, setPromos] = useState<Promotion[]>([]);
  const [selected, setSelected] = useState<Promotion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    player.promotions().then(setPromos).catch((err) => setError(errorMessage(err, 'Could not load promotions.'))).finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-4 px-2 pb-12 pt-4 sm:px-4">
      <div className="rounded-2xl bg-gradient-to-r from-[#0e5332] via-[#093c24] to-[#ff5a00] p-6 text-white shadow-md">
        <h1 className="text-2xl font-black uppercase sm:text-3xl">Promotions</h1>
      </div>
      {loading && <p className="text-xs text-gray-500">Loading...</p>}
      {error && <p className="text-xs font-semibold text-red-600">{error}</p>}
      {!loading && !error && promos.length === 0 && <p className="py-10 text-center text-sm text-gray-500">No promotions right now.</p>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {promos.map((promo) => (
          <button key={promo.id} onClick={() => setSelected(promo)} className="cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-xs transition hover:shadow-lg">
            {promo.bannerUrl ? <img src={promo.bannerUrl} alt={promo.title} className="aspect-[2/1] w-full object-cover" /> : <span className="flex aspect-[2/1] items-center justify-center bg-[#0e5332] text-white"><Gift className="h-10 w-10" /></span>}
            <span className="block p-4">
              <span className="block text-sm font-extrabold text-gray-900">{promo.title}</span>
              <span className="mt-1 block text-xs text-gray-500">{summary(promo)}</span>
            </span>
          </button>
        ))}
      </div>
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-[#0e5332] p-4 text-white">
              <h2 className="text-sm font-bold">{selected.title}</h2>
              <button onClick={() => setSelected(null)} className="cursor-pointer" aria-label="Close"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3 p-5 text-xs text-gray-700">
              <p className="font-bold text-gray-900">{summary(selected)}</p>
              <p className="whitespace-pre-line leading-relaxed">{selected.description}</p>
              <button onClick={() => { setSelected(null); onDeposit(); }} className="w-full cursor-pointer rounded-xl bg-[#ff5a00] py-3 font-extrabold text-white hover:bg-[#e04f00]">DEPOSIT NOW</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
