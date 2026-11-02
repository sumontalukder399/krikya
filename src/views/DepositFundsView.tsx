import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AlertCircle, ArrowDownLeft, ArrowUpRight, CheckCircle2, Copy, Zap } from 'lucide-react';
import { UserProfile } from '../types';
import { errorMessage } from '../platform/api';
import { player, type PaymentAccount, type PaymentMethod, type Promotion } from '../platform/player';

const PRESETS = [300, 500, 1000, 2000, 5000, 10000, 25000];
const taka = (minor: number) => `৳ ${(minor / 100).toLocaleString()}`;

/** A method's limit check, in the player's own units. Empty when the amount is fine. */
function limitError(amount: number, minMinor: number, maxMinor: number): string {
  const minor = Math.round(amount * 100);
  if (!minor || minor <= 0) return 'Enter a valid amount';
  if (minMinor > 0 && minor < minMinor) return `Minimum is ${taka(minMinor)}`;
  if (maxMinor > 0 && minor > maxMinor) return `Maximum is ${taka(maxMinor)}`;
  return '';
}

const MethodPicker: React.FC<{ methods: PaymentMethod[]; selected: string; onSelect: (id: string) => void }> = ({ methods, selected, onSelect }) => (
  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
    {methods.map((method) => (
      <button type="button" key={method.id} onClick={() => onSelect(method.id)} className={`cursor-pointer rounded-xl border-2 p-3 text-center transition ${selected === method.id ? 'border-[#0e5332] bg-emerald-50/50 font-bold text-gray-900 shadow-xs' : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'}`}>
        {method.iconUrl && <img src={method.iconUrl} alt="" className="mx-auto mb-1 h-7 object-contain" />}
        <span className="block text-xs font-extrabold">{method.name}</span>
      </button>
    ))}
  </div>
);

const Notice: React.FC<{ kind: 'error' | 'ok'; text: string }> = ({ kind, text }) => (
  <div className={`flex items-center gap-2 rounded-xl border p-3.5 text-xs font-semibold ${kind === 'ok' ? 'border-emerald-300 bg-emerald-50 text-[#0e5332]' : 'border-red-200 bg-red-50 text-red-600'}`}>
    {kind === 'ok' ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
    <span>{text}</span>
  </div>
);

const DepositForm: React.FC<{ onCredited: () => void }> = ({ onCredited }) => {
  const [methods, setMethods] = useState<PaymentMethod[] | null>(null);
  const [methodId, setMethodId] = useState('');
  const [accounts, setAccounts] = useState<PaymentAccount[]>([]);
  const [accountId, setAccountId] = useState('');
  const [channel, setChannel] = useState('');
  const [promos, setPromos] = useState<Promotion[]>([]);
  const [promotionId, setPromotionId] = useState('none');
  const [amount, setAmount] = useState('1000');
  const [trx, setTrx] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const poll = useRef<ReturnType<typeof setInterval> | null>(null);

  const method = useMemo(() => methods?.find((m) => m.id === methodId) ?? null, [methods, methodId]);
  const isGateway = Boolean(method?.isGateway);
  const channels = method?.gatewayChannels ?? [];

  useEffect(() => {
    player.paymentMethods('deposit').then((list) => {
      const usable = list.filter((m) => m.isDepositEnabled);
      setMethods(usable);
      setMethodId(usable[0]?.id ?? '');
    }).catch((err) => { setMethods([]); setError(errorMessage(err, 'Could not load deposit methods.')); });
    player.promotions().then((list) => setPromos(list.filter((p) => p.type === 'deposit_bonus'))).catch(() => setPromos([]));
    return () => { if (poll.current) clearInterval(poll.current); };
  }, []);

  useEffect(() => {
    setAccounts([]);
    setAccountId('');
    setChannel(channels.length === 1 ? channels[0].key : '');
    if (!methodId || isGateway) return;
    player.paymentAccounts(methodId).then((list) => {
      setAccounts(list);
      setAccountId(list[0]?.id ?? '');
    }).catch((err) => setError(errorMessage(err, 'Could not load the payment number.')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methodId, isGateway]);

  const account = accounts.find((a) => a.id === accountId) ?? null;

  /** Nothing is credited here: the wallet moves only when the provider confirms the payment. */
  const watch = (depositId: string) => {
    setStatus('Waiting for your payment. Keep this page open.');
    let tries = 0;
    if (poll.current) clearInterval(poll.current);
    poll.current = setInterval(async () => {
      tries += 1;
      const res = await player.gatewayStatus(depositId).catch(() => null);
      const state = res?.status?.toUpperCase();
      if (state === 'APPROVED' || state === 'SUCCESS' || state === 'CREDITED') {
        if (poll.current) clearInterval(poll.current);
        setStatus('Payment received. Your balance has been updated.');
        onCredited();
      } else if (state === 'REJECTED' || state === 'FAILED' || state === 'CANCELLED') {
        if (poll.current) clearInterval(poll.current);
        setStatus('');
        setError('The payment was not completed.');
      } else if (tries >= 120) {
        if (poll.current) clearInterval(poll.current);
        setStatus('Your payment is still being checked. Your balance will update when it is confirmed.');
      }
    }, 5000);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!method || busy) return;
    setError('');
    setStatus('');
    const value = Number(amount);
    const limit = limitError(value, method.minDepositMinor, method.maxDepositMinor);
    if (limit) { setError(limit); return; }
    const minor = Math.round(value * 100);

    if (isGateway) {
      if (channels.length > 1 && !channel) { setError('Choose how you will pay.'); return; }
      // Opened inside the click so it is not blocked as a popup, then pointed at the checkout.
      const checkout = window.open('', '_blank');
      setBusy(true);
      try {
        const res = await player.startGatewayDeposit({ paymentMethodId: method.id, amount: minor, currency: method.currency, ...(channel ? { channelKey: channel } : {}) });
        if (checkout && !checkout.closed) checkout.location.href = res.paymentUrl;
        else window.location.href = res.paymentUrl;
        watch(res.id);
      } catch (err) {
        if (checkout && !checkout.closed) checkout.close();
        setError(errorMessage(err, 'Could not start the payment.'));
      } finally {
        setBusy(false);
      }
      return;
    }

    if (!account) { setError('No payment number is available for this method right now.'); return; }
    if (!trx.trim()) { setError('Enter the Transaction ID from your payment.'); return; }
    setBusy(true);
    try {
      await player.deposit({ paymentMethodId: method.id, paymentAccountId: account.id, amount: minor, currency: method.currency, transactionReference: trx.trim(), promotionId });
      setStatus('Deposit submitted. It will be added after it is checked.');
      setTrx('');
    } catch (err) {
      setError(errorMessage(err, 'Could not submit the deposit.'));
    } finally {
      setBusy(false);
    }
  };

  if (methods === null) return <p className="rounded-2xl border border-gray-200 bg-white p-5 text-xs text-gray-500">Loading...</p>;

  return (
    <form onSubmit={submit} className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5 text-xs shadow-xs">
      {status && <Notice kind="ok" text={status} />}
      {error && <Notice kind="error" text={error} />}
      {methods.length === 0 ? <p className="py-6 text-center text-gray-500">No deposit methods are available right now.</p> : (
        <>
          <div>
            <label className="mb-2 block font-black text-gray-700">1. Select Deposit Channel</label>
            <MethodPicker methods={methods} selected={methodId} onSelect={setMethodId} />
          </div>

          {channels.length > 1 && (
            <div>
              <label className="mb-1 block font-black text-gray-700">How will you pay?</label>
              <div className="flex flex-wrap gap-2">
                {channels.map((ch) => (
                  <button type="button" key={ch.key} onClick={() => setChannel(ch.key)} className={`cursor-pointer rounded-lg border px-3 py-2 font-bold ${channel === ch.key ? 'border-[#0e5332] bg-[#0e5332] text-white' : 'border-gray-200 bg-gray-50 text-gray-700'}`}>{ch.label}</button>
                ))}
              </div>
            </div>
          )}

          {!isGateway && (
            <div>
              <label className="mb-1 block font-black text-gray-700">2. Select Bonus Promotion</label>
              <select value={promotionId} onChange={(e) => setPromotionId(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 font-bold outline-none">
                <option value="none">Regular Deposit</option>
                {promos.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
            </div>
          )}

          <div>
            <label className="mb-2 block font-black text-gray-700">{isGateway ? '2' : '3'}. Deposit Amount (৳)</label>
            <div className="mb-2 grid grid-cols-4 gap-1.5 sm:grid-cols-7">
              {PRESETS.map((preset) => (
                <button type="button" key={preset} onClick={() => setAmount(String(preset))} className={`cursor-pointer rounded-lg border py-1.5 font-mono font-bold transition ${amount === String(preset) ? 'border-[#0e5332] bg-[#0e5332] text-white' : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'}`}>৳{preset}</button>
              ))}
            </div>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter deposit amount" className="w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm font-bold outline-none" required />
            {method && <span className="mt-1 block text-[10px] text-gray-400">Min: {taka(method.minDepositMinor)}{method.maxDepositMinor > 0 ? ` | Max: ${taka(method.maxDepositMinor)}` : ''}</span>}
          </div>

          {!isGateway && account && (
            <div className="space-y-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-900">
              {accounts.length > 1 && (
                <select value={accountId} onChange={(e) => setAccountId(e.target.value)} className="w-full rounded-lg border border-amber-300 bg-white px-2 py-1.5 font-bold">
                  {accounts.map((a) => <option key={a.id} value={a.id}>{a.displayName ?? a.accountNumberMasked}</option>)}
                </select>
              )}
              <div className="flex items-center justify-between gap-2">
                <span>Send money to: <b className="font-mono text-sm">{account.accountNumberMasked}</b>{account.accountType ? ` (${account.accountType})` : ''}</span>
                <button type="button" onClick={() => void navigator.clipboard?.writeText(account.accountNumberMasked)} className="cursor-pointer rounded-md bg-white p-1.5" aria-label="Copy number"><Copy className="h-3.5 w-3.5" /></button>
              </div>
              {account.instructions && <p className="whitespace-pre-line">{account.instructions}</p>}
              <input value={trx} onChange={(e) => setTrx(e.target.value)} placeholder="Transaction ID" className="w-full rounded-lg border border-amber-300 bg-white px-3 py-2 font-mono font-bold outline-none" />
            </div>
          )}

          <button disabled={busy} className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#ff5a00] py-3 font-extrabold text-white transition hover:bg-[#e04f00] disabled:opacity-50">
            <Zap className="h-4 w-4" /><span>{busy ? 'Please wait...' : isGateway ? 'PAY NOW' : 'SUBMIT DEPOSIT'}</span>
          </button>
        </>
      )}
    </form>
  );
};

const WithdrawForm: React.FC<{ user: UserProfile; onRequested: () => void }> = ({ user, onRequested }) => {
  const [methods, setMethods] = useState<PaymentMethod[] | null>(null);
  const [methodId, setMethodId] = useState('');
  const [accountNumber, setAccountNumber] = useState(user.phone || '');
  const [amount, setAmount] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    player.paymentMethods('withdrawal').then((list) => {
      const usable = list.filter((m) => m.isWithdrawalEnabled);
      setMethods(usable);
      setMethodId(usable[0]?.id ?? '');
    }).catch((err) => { setMethods([]); setError(errorMessage(err, 'Could not load withdrawal methods.')); });
  }, []);

  const method = methods?.find((m) => m.id === methodId) ?? null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!method || busy) return;
    setError('');
    setStatus('');
    const value = Number(amount);
    const limit = limitError(value, method.minWithdrawalMinor, method.maxWithdrawalMinor);
    if (limit) { setError(limit); return; }
    if (value > user.balance) { setError(`Insufficient balance. Available: ৳ ${user.balance.toFixed(2)}`); return; }
    if (!accountNumber.trim()) { setError('Enter the number to receive the money.'); return; }
    setBusy(true);
    try {
      await player.withdraw({ paymentMethodId: method.id, amount: Math.round(value * 100), currency: method.currency, accountNumber: accountNumber.trim() });
      setStatus('Withdrawal request submitted. It will be paid after it is checked.');
      setAmount('');
      onRequested();
    } catch (err) {
      setError(errorMessage(err, 'Could not submit the withdrawal.'));
    } finally {
      setBusy(false);
    }
  };

  if (methods === null) return <p className="rounded-2xl border border-gray-200 bg-white p-5 text-xs text-gray-500">Loading...</p>;

  return (
    <form onSubmit={submit} className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5 text-xs shadow-xs">
      {status && <Notice kind="ok" text={status} />}
      {error && <Notice kind="error" text={error} />}
      {methods.length === 0 ? <p className="py-6 text-center text-gray-500">No withdrawal methods are available right now.</p> : (
        <>
          <div>
            <label className="mb-2 block font-black text-gray-700">1. Receive With</label>
            <MethodPicker methods={methods} selected={methodId} onSelect={setMethodId} />
          </div>
          <div>
            <label className="mb-1 block font-black text-gray-700">2. Your Account Number</label>
            <input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="01XXXXXXXXX" className="w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 font-mono text-sm font-bold outline-none" required />
          </div>
          <div>
            <label className="mb-1 block font-black text-gray-700">3. Withdrawal Amount (৳)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter withdrawal amount" className="w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm font-bold outline-none" required />
            <div className="mt-1 flex justify-between text-[10px] text-gray-400">
              {method && <span>Min: {taka(method.minWithdrawalMinor)}{method.maxWithdrawalMinor > 0 ? ` | Max: ${taka(method.maxWithdrawalMinor)}` : ''}</span>}
              <span>Available: ৳ {user.balance.toFixed(2)}</span>
            </div>
          </div>
          <button disabled={busy} className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0e5332] py-3 font-extrabold text-white transition hover:bg-[#0a3e25] disabled:opacity-50">
            <ArrowUpRight className="h-4 w-4" /><span>{busy ? 'Please wait...' : 'CONFIRM WITHDRAWAL'}</span>
          </button>
        </>
      )}
    </form>
  );
};

export const DepositFundsView: React.FC<{ user: UserProfile; isLoggedIn: boolean; initialTab?: 'deposit' | 'withdrawal'; onChanged: () => void; onOpenLogin: () => void }> = ({ user, isLoggedIn, initialTab = 'deposit', onChanged, onOpenLogin }) => {
  const [tab, setTab] = useState<'deposit' | 'withdrawal'>(initialTab);
  useEffect(() => setTab(initialTab), [initialTab]);

  return (
    <div className="mx-auto max-w-3xl space-y-4 px-2 pb-14 pt-4 sm:px-4">
      <div className="flex items-center justify-between rounded-2xl border border-emerald-600/30 bg-gradient-to-r from-[#072718] via-[#0e5332] to-[#146b41] p-5 text-white shadow-lg">
        <h1 className="text-2xl font-black uppercase">Funds</h1>
        <div className="text-right text-xs"><span className="block text-emerald-200">Balance</span><span className="font-mono text-lg font-black">৳ {user.balance.toFixed(2)}</span></div>
      </div>
      {!isLoggedIn ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-xs text-gray-600">
          <p className="mb-3">Log in to deposit or withdraw.</p>
          <button onClick={onOpenLogin} className="cursor-pointer rounded-lg bg-[#ff5a00] px-5 py-2 font-extrabold text-white">Log In</button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-gray-200 bg-white p-1.5 text-xs font-extrabold">
            <button onClick={() => setTab('deposit')} className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-lg py-2.5 ${tab === 'deposit' ? 'bg-[#0e5332] text-white' : 'text-gray-600'}`}><ArrowDownLeft className="h-4 w-4" />Deposit</button>
            <button onClick={() => setTab('withdrawal')} className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-lg py-2.5 ${tab === 'withdrawal' ? 'bg-[#0e5332] text-white' : 'text-gray-600'}`}><ArrowUpRight className="h-4 w-4" />Withdraw</button>
          </div>
          {tab === 'deposit' ? <DepositForm onCredited={onChanged} /> : <WithdrawForm user={user} onRequested={onChanged} />}
        </>
      )}
    </div>
  );
};
