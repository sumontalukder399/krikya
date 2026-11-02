import React, { useState } from 'react';
import { Ticket, CheckCircle2, AlertCircle } from 'lucide-react';
import { errorMessage } from '../platform/api';
import { player } from '../platform/player';

export const ClaimVoucherView: React.FC<{ onClaimed: () => void }> = ({ onClaimed }) => {
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || busy) return;
    setBusy(true);
    setMessage(null);
    try {
      const res = await player.redeemCoupon(code.trim());
      setMessage({ text: `Voucher ${res.code} redeemed. ${res.currency} ${(res.amountMinor / 100).toFixed(2)} added.`, success: true });
      setCode('');
      onClaimed();
    } catch (err) {
      setMessage({ text: errorMessage(err, 'Could not redeem this voucher.'), success: false });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-4 px-2 pb-14 pt-4 sm:px-4">
      <form onSubmit={submit} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
        <h1 className="flex items-center gap-2 text-base font-extrabold text-gray-800"><Ticket className="h-5 w-5 text-[#0e5332]" />Claim Voucher</h1>
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter voucher code" className="w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm font-bold uppercase outline-none focus:border-[#0e5332]" />
        {message && (
          <div className={`flex items-center gap-2 rounded-xl border p-3 text-xs font-semibold ${message.success ? 'border-emerald-300 bg-emerald-50 text-[#0e5332]' : 'border-red-200 bg-red-50 text-red-600'}`}>
            {message.success ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
            <span>{message.text}</span>
          </div>
        )}
        <button disabled={busy || !code.trim()} className="w-full cursor-pointer rounded-xl bg-[#ff5a00] py-3 text-xs font-extrabold text-white hover:bg-[#e04f00] disabled:opacity-50">{busy ? 'Please wait...' : 'CLAIM VOUCHER'}</button>
      </form>
    </div>
  );
};
