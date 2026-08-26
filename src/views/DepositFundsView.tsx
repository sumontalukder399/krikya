import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Coins, 
  Clock,
  Zap,
  CreditCard
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DepositFundsViewProps {
  user: UserProfile;
  onDepositSuccess: (amount: number) => void;
  onWithdrawSuccess: (amount: number) => void;
}

export const DepositFundsView: React.FC<DepositFundsViewProps> = ({
  user,
  onDepositSuccess,
  onWithdrawSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdrawal'>('deposit');

  // Deposit state
  const [depositChannel, setDepositChannel] = useState<'Nagad' | 'bKash' | 'Rocket' | 'USDT'>('Nagad');
  const [depositAmount, setDepositAmount] = useState('1000');
  const [selectedPromo, setSelectedPromo] = useState('8% Unlimited Instant Cash Bonus (1x TO)');
  const [depositStatus, setDepositStatus] = useState<string | null>(null);

  // Withdrawal state
  const [withdrawAmount, setWithdrawAmount] = useState('1000');
  const [withdrawAccount, setWithdrawAccount] = useState('Nagad - 01768662245 (Hridoy Sonar)');
  const [withdrawStatus, setWithdrawStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const depositPresets = ['300', '500', '1000', '2000', '5000', '10000', '25000'];

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(depositAmount);
    if (!amt || amt < 200) {
      setErrorMessage('Minimum deposit is ৳ 200');
      return;
    }
    setErrorMessage('');
    setDepositStatus('Processing automatic payment gateway...');

    setTimeout(async () => {
      try {
        const response = await fetch('/api/v1/transactions', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ type: 'deposit', amount: amt, method: depositChannel, note: selectedPromo }) });
        const json = await response.json();
        if (!response.ok) throw new Error(json.error?.message || 'Deposit failed');
      onDepositSuccess(amt);
      setDepositStatus(`Deposit of ৳ ${amt.toLocaleString()} via ${depositChannel} was successful! 8% Instant Cash added.`);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#0e5332', '#ff5a00', '#ffb700']
        });
      } catch {}
      setTimeout(() => setDepositStatus(null), 4000);
      } catch (error) { setDepositStatus(null); setErrorMessage((error as Error).message); }
    }, 1500);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(withdrawAmount);
    if (!amt || amt < 500) {
      setErrorMessage('Minimum withdrawal amount is ৳ 500');
      return;
    }
    if (amt > user.balance) {
      setErrorMessage(`Insufficient balance. Current balance is ৳ ${user.balance.toFixed(2)}`);
      return;
    }
    setErrorMessage('');
    setWithdrawStatus('Processing withdrawal request with finance department...');

    setTimeout(async () => {
      try {
        const response = await fetch('/api/v1/transactions', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ type: 'withdrawal', amount: amt, method: withdrawAccount }) });
        const json = await response.json();
        if (!response.ok) throw new Error(json.error?.message || 'Withdrawal failed');
      onWithdrawSuccess(amt);
      setWithdrawStatus(`Withdrawal of ৳ ${amt.toLocaleString()} submitted successfully! Expected processing time: 5-15 mins.`);
      setTimeout(() => setWithdrawStatus(null), 4000);
      } catch (error) { setWithdrawStatus(null); setErrorMessage((error as Error).message); }
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-4 space-y-4 pb-14">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#072718] via-[#0e5332] to-[#146b41] text-white rounded-2xl p-5 shadow-lg border border-emerald-600/30 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">
            Fast 24/7 Auto Banking
          </span>
          <h1 className="text-2xl font-black uppercase text-white">
            Funds Management
          </h1>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-gray-300 uppercase block font-semibold">Available Balance</span>
          <span className="text-lg font-black text-amber-300 font-mono">
            ৳ {user.balance.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Mode Tabs (Deposit / Withdrawal) */}
      <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1.5 rounded-xl border border-gray-200">
        <button
          onClick={() => {
            setActiveTab('deposit');
            setErrorMessage('');
          }}
          className={`py-2.5 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer ${
            activeTab === 'deposit'
              ? 'bg-[#0e5332] text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ArrowDownLeft className="w-4 h-4" />
          <span>DEPOSIT</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('withdrawal');
            setErrorMessage('');
          }}
          className={`py-2.5 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer ${
            activeTab === 'withdrawal'
              ? 'bg-[#0e5332] text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ArrowUpRight className="w-4 h-4" />
          <span>WITHDRAWAL</span>
        </button>
      </div>

      {/* Notifications / Alerts */}
      {errorMessage && (
        <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {(depositStatus || withdrawStatus) && (
        <div className="bg-emerald-50 text-[#0e5332] text-xs p-3.5 rounded-xl border border-emerald-300 flex items-center gap-2 font-bold animate-scaleIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{depositStatus || withdrawStatus}</span>
        </div>
      )}

      {/* DEPOSIT FORM */}
      {activeTab === 'deposit' && (
        <form onSubmit={handleDepositSubmit} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-4 text-xs">
          {/* Payment Method Channels (Exact as video: Nagad, bKash, Rocket, USDT) */}
          <div>
            <label className="block font-black text-gray-700 mb-2">1. Select Deposit Channel</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { name: 'Nagad', sub: 'SpeedPay 30s', color: 'border-orange-500' },
                { name: 'bKash', sub: 'AutoPay 24/7', color: 'border-pink-500' },
                { name: 'Rocket', sub: 'Direct DBBL', color: 'border-purple-500' },
                { name: 'USDT', sub: 'TRC20 / ERC20', color: 'border-emerald-500' },
              ].map((ch) => (
                <div
                  key={ch.name}
                  onClick={() => setDepositChannel(ch.name as any)}
                  className={`p-3 rounded-xl border-2 text-center cursor-pointer transition ${
                    depositChannel === ch.name
                      ? 'border-[#0e5332] bg-emerald-50/50 shadow-xs font-bold text-gray-900'
                      : 'border-gray-200 hover:border-gray-300 bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="font-extrabold text-xs">{ch.name}</div>
                  <div className="text-[10px] text-gray-400 font-medium mt-0.5">{ch.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Promotion dropdown */}
          <div>
            <label className="block font-black text-gray-700 mb-1">2. Select Bonus Promotion</label>
            <select
              value={selectedPromo}
              onChange={(e) => setSelectedPromo(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-800 focus:bg-white focus:outline-hidden focus:border-[#0e5332]"
            >
              <option value="8% Unlimited Instant Cash Bonus (1x TO)">
                🔥 8% Unlimited Instant Cash on Every Deposit (1x TO)
              </option>
              <option value="500% Super Welcome Bonus (up to ৳20,000)">
                🎁 500% Super Welcome Bonus (up to ৳20,000)
              </option>
              <option value="100% First Deposit Match on Cricket">
                🏏 100% First Deposit Match on Cricket
              </option>
              <option value="None">No Bonus (0x Turnover)</option>
            </select>
          </div>

          {/* Deposit Preset Buttons */}
          <div>
            <label className="block font-black text-gray-700 mb-2">3. Deposit Amount (৳)</label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 mb-2">
              {depositPresets.map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => setDepositAmount(preset)}
                  className={`py-1.5 rounded-lg text-xs font-mono font-bold transition border cursor-pointer ${
                    depositAmount === preset
                      ? 'bg-[#0e5332] text-white border-[#0e5332]'
                      : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'
                  }`}
                >
                  ৳{preset}
                </button>
              ))}
            </div>

            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Enter custom deposit amount"
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-900 focus:bg-white focus:outline-hidden focus:border-[#0e5332]"
              required
            />
            <span className="text-[10px] text-gray-400 mt-1 block">
              Min Deposit: ৳ 200.00 | Max Deposit: ৳ 50,000.00
            </span>
          </div>

          {/* Deposit Guarantee */}
          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold block">100% Deposit Payment Guarantee</span>
              <span>All automated deposits arrive in under 30 seconds with 0% transaction fee.</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#ff5a00] hover:bg-[#e04f00] text-white font-extrabold py-3 rounded-xl text-xs shadow-md transition hover:scale-101 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Zap className="w-4 h-4" />
            <span>SUBMIT DEPOSIT NOW</span>
          </button>
        </form>
      )}

      {/* WITHDRAWAL FORM */}
      {activeTab === 'withdrawal' && (
        <form onSubmit={handleWithdrawSubmit} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-4 text-xs">
          <div>
            <label className="block font-black text-gray-700 mb-1">1. Receiving Bank / Mobile Wallet Account</label>
            <select
              value={withdrawAccount}
              onChange={(e) => setWithdrawAccount(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-800 focus:bg-white focus:outline-hidden focus:border-[#0e5332]"
            >
              <option value="Nagad - 01768662245 (Hridoy Sonar)">Nagad - 01768662245 (Hridoy Sonar)</option>
              <option value="bKash - 01768662245 (Hridoy Sonar)">bKash - 01768662245 (Hridoy Sonar)</option>
              <option value="Rocket - 01768662245 (Hridoy Sonar)">Rocket - 01768662245 (Hridoy Sonar)</option>
            </select>
          </div>

          <div>
            <label className="block font-black text-gray-700 mb-1">2. Withdrawal Amount (৳)</label>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Enter withdrawal amount"
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-900 focus:bg-white focus:outline-hidden focus:border-[#0e5332]"
              required
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>Min: ৳ 500.00 | Max: ৳ 50,000.00</span>
              <span>Available: ৳ {user.balance.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 space-y-1">
            <div className="flex justify-between font-bold">
              <span>Estimated Payout Time:</span>
              <span className="text-[#0e5332]">5 - 15 Minutes</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Daily Free Withdrawals:</span>
              <span>10 of 10 remaining</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0e5332] hover:bg-[#0a3e25] text-white font-extrabold py-3 rounded-xl text-xs shadow-md transition hover:scale-101 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>CONFIRM WITHDRAWAL</span>
          </button>
        </form>
      )}
    </div>
  );
};
