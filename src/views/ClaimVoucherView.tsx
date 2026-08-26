import React, { useState } from 'react';
import { Ticket, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ClaimVoucherViewProps {
  onClaimVoucher: (code: string) => void;
}

export const ClaimVoucherView: React.FC<ClaimVoucherViewProps> = ({ onClaimVoucher }) => {
  const [voucherCode, setVoucherCode] = useState('');
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherCode.trim()) return;

    if (voucherCode.toUpperCase() === 'KRIKYA2026' || voucherCode.toUpperCase() === 'DESHI888' || voucherCode.toUpperCase() === 'FREE500') {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#0e5332', '#ff5a00', '#ffb700']
        });
      } catch {}
      onClaimVoucher(voucherCode);
      setMessage({ text: `Voucher "${voucherCode.toUpperCase()}" successfully redeemed! +৳500 added to your bonus wallet.`, success: true });
      setVoucherCode('');
    } else {
      setMessage({ text: 'Invalid or expired voucher code. Try code: KRIKYA2026 or DESHI888', success: false });
    }
  };

  return (
    <div className="max-w-xl mx-auto px-2 sm:px-4 space-y-4 pb-12">
      <div className="bg-gradient-to-r from-[#072718] via-[#0e5332] to-[#146b41] text-white rounded-2xl p-6 shadow-md">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase mb-2">
          <Ticket className="w-3.5 h-3.5" />
          <span>Voucher Center</span>
        </div>
        <h1 className="text-2xl font-black uppercase">Claim Promo Voucher</h1>
        <p className="text-xs text-emerald-100 mt-1">
          Have an exclusive promo code from Telegram, Facebook, or SMS? Enter it below to claim instant cash bonuses or free spins.
        </p>
      </div>

      {message && (
        <div className={`p-3.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
          message.success 
            ? 'bg-emerald-50 text-[#0e5332] border border-emerald-300' 
            : 'bg-red-50 text-red-600 border border-red-200'
        }`}>
          {message.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-4 text-xs">
        <div>
          <label className="block font-bold text-gray-700 mb-1">Enter Promo Voucher Code</label>
          <input
            type="text"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            placeholder="e.g. KRIKYA2026 or DESHI888"
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm font-mono font-bold uppercase tracking-wider text-gray-900 focus:bg-white focus:outline-hidden focus:border-[#0e5332]"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#ff5a00] hover:bg-[#e04f00] text-white font-extrabold py-3 rounded-xl text-xs shadow-md transition hover:scale-101 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>REDEEM VOUCHER</span>
        </button>

        <div className="pt-2 text-[11px] text-gray-400 text-center">
          Test active codes: <strong className="text-[#0e5332]">KRIKYA2026</strong>, <strong className="text-[#0e5332]">DESHI888</strong>, <strong className="text-[#0e5332]">FREE500</strong>
        </div>
      </form>
    </div>
  );
};
