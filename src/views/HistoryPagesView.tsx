import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { PageType } from '../types';
import { errorMessage } from '../platform/api';
import { player, type LedgerEntry, type Wagering } from '../platform/player';

type HistoryType = 'betting' | 'turnover' | 'bonus' | 'transaction';
const TITLES: Record<HistoryType, string> = { betting: 'Betting Record', turnover: 'Turnover History', bonus: 'Bonus History', transaction: 'Transaction Record' };
const money = (minor: number, currency = 'BDT') => `${currency} ${(minor / 100).toFixed(2)}`;

export const HistoryPagesView: React.FC<{ type: HistoryType; onNavigate: (page: PageType) => void }> = ({ type, onNavigate }) => {
  const [rows, setRows] = useState<LedgerEntry[]>([]);
  const [wagering, setWagering] = useState<Wagering | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    const filter = type === 'bonus' ? 'BONUS' : type === 'betting' ? 'BET' : undefined;
    Promise.all([player.ledger({ type: filter }), type === 'turnover' ? player.wagering() : Promise.resolve(null)])
      .then(([ledger, progress]) => { setRows(ledger.items); setWagering(progress); })
      .catch((err) => setError(errorMessage(err, 'Could not load records.')))
      .finally(() => setLoading(false));
  }, [type]);

  return (
    <div className="mx-auto max-w-4xl space-y-4 px-2 pb-14 pt-4 sm:px-4">
      <button onClick={() => onNavigate('profile-hub')} className="flex cursor-pointer items-center gap-1 rounded-lg border bg-white px-3 py-1.5 text-xs font-bold text-gray-700"><ArrowLeft className="h-4 w-4" />Back</button>
      <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
        <h1 className="text-base font-extrabold text-gray-800">{TITLES[type]}</h1>
        {wagering && (
          <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs font-semibold text-amber-900">
            Remaining turnover before withdrawal: {money(wagering.remainingMinor)}
          </p>
        )}
        {loading && <p className="text-xs text-gray-500">Loading...</p>}
        {error && <p className="text-xs font-semibold text-red-600">{error}</p>}
        {!loading && !error && rows.length === 0 && <p className="py-6 text-center text-xs text-gray-500">No records yet.</p>}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-xs">
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-gray-100">
                  <td className="py-2 pr-3 text-gray-500">{new Date(row.createdAt).toLocaleString()}</td>
                  <td className="py-2 pr-3 font-bold text-gray-800">{row.type}</td>
                  <td className="py-2 pr-3 text-gray-600">{row.description ?? row.reference ?? ''}</td>
                  <td className="py-2 text-right font-mono font-bold text-gray-900">{money(row.amountMinor, row.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
