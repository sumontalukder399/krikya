import React, { useState } from 'react';
import { PageType, UserProfile } from '../types';
import { 
  User, 
  KeyRound, 
  CreditCard, 
  Mail, 
  Briefcase, 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  Copy, 
  Share2, 
  Plus, 
  Trash2,
  Lock,
  Building2,
  DollarSign
} from 'lucide-react';

interface SettingsPagesViewProps {
  type: 'personal' | 'password' | 'bank' | 'inbox' | 'referral' | 'affiliate';
  user: UserProfile;
  onNavigate: (page: PageType) => void;
  onOpenEditProfile: () => void;
  onOpenAddBank: () => void;
  onUpdatePassword?: (newPass: string) => void;
}

export const SettingsPagesView: React.FC<SettingsPagesViewProps> = ({
  type,
  user,
  onNavigate,
  onOpenEditProfile,
  onOpenAddBank,
}) => {
  // Password change state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Bank accounts
  const [bankAccounts, setBankAccounts] = useState([
    { id: 1, bank: 'Nagad', name: user.fullName || 'Hridoy Sonar', account: user.phone || '01768662245', isDefault: true },
    { id: 2, bank: 'bKash', name: user.fullName || 'Hridoy Sonar', account: '01768662245', isDefault: false },
  ]);

  // Affiliate application form
  const [trafficSource, setTrafficSource] = useState('Telegram Channel / Facebook Group');
  const [experience, setExperience] = useState('2+ years in sports betting marketing');
  const [affiliateSubmitted, setAffiliateSubmitted] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    setPasswordError('');
    const response = await fetch('/api/v1/profile', { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'password', oldPassword, newPassword }) });
    const json = await response.json();
    if (!response.ok) { setPasswordError(json.error?.message || 'Could not update password'); return; }
    setPasswordSuccess(true);
    setTimeout(() => {
      setPasswordSuccess(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 2500);
  };

  const handleAffiliateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAffiliateSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-4 space-y-4 pb-16">
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('profile-hub')}
          className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Account Hub</span>
        </button>
      </div>

      {/* 1. PERSONAL INFO VIEW */}
      {type === 'personal' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-base font-extrabold text-gray-800 flex items-center gap-2">
              <User className="w-5 h-5 text-[#0e5332]" />
              <span>Personal Information</span>
            </h2>
            <button
              onClick={onOpenEditProfile}
              className="bg-[#0e5332] hover:bg-[#0a3e25] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-2xs transition"
            >
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Username</span>
              <span className="text-sm font-bold text-gray-800 font-mono mt-0.5 block">{user.username}</span>
            </div>

            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Full Name</span>
              <span className="text-sm font-bold text-gray-800 mt-0.5 block">{user.fullName || 'Hridoy Sonar'}</span>
            </div>

            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Email Address</span>
              <span className="text-sm font-bold text-gray-800 mt-0.5 block">{user.email}</span>
            </div>

            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Phone Number</span>
              <span className="text-sm font-bold text-gray-800 font-mono mt-0.5 block">{user.phone}</span>
            </div>

            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Date of Birth</span>
              <span className="text-sm font-bold text-gray-800 mt-0.5 block">{user.dateOfBirth || '1998-05-14'}</span>
            </div>

            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Currency</span>
              <span className="text-sm font-bold text-[#0e5332] mt-0.5 block">BDT (৳)</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. CHANGE PASSWORD VIEW */}
      {type === 'password' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-base font-extrabold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-3">
            <Lock className="w-5 h-5 text-[#0e5332]" />
            <span>Reset & Change Password</span>
          </h2>

          {passwordSuccess && (
            <div className="bg-emerald-50 text-[#0e5332] text-xs p-3 rounded-xl border border-emerald-300 font-bold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Password successfully updated!</span>
            </div>
          )}
          {passwordError && <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-bold text-red-600">{passwordError}</div>}

          <form onSubmit={handlePasswordSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs focus:bg-white focus:outline-hidden focus:border-[#0e5332]"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min 6 characters"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs focus:bg-white focus:outline-hidden focus:border-[#0e5332]"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs focus:bg-white focus:outline-hidden focus:border-[#0e5332]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#ff5a00] hover:bg-[#e04f00] text-white font-extrabold py-3 rounded-xl text-xs shadow-md transition cursor-pointer mt-2"
            >
              Update Password
            </button>
          </form>
        </div>
      )}

      {/* 3. BANK DETAILS VIEW */}
      {type === 'bank' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-base font-extrabold text-gray-800 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#0e5332]" />
              <span>Saved Bank & Mobile Accounts</span>
            </h2>
            <button
              onClick={onOpenAddBank}
              className="bg-[#0e5332] hover:bg-[#0a3e25] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-2xs transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Account</span>
            </button>
          </div>

          <div className="space-y-3">
            {bankAccounts.map((acc) => (
              <div
                key={acc.id}
                className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-gray-900">{acc.bank}</span>
                    {acc.isDefault && (
                      <span className="bg-emerald-100 text-[#0e5332] text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Holder: {acc.name}</div>
                  <div className="text-xs font-mono font-bold text-gray-800">{acc.account}</div>
                </div>

                <button
                  onClick={() => setBankAccounts((prev) => prev.filter((a) => a.id !== acc.id))}
                  className="text-gray-400 hover:text-red-600 p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. INBOX MESSAGES VIEW */}
      {type === 'inbox' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-base font-extrabold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-3">
            <Mail className="w-5 h-5 text-[#0e5332]" />
            <span>Inbox Notifications</span>
          </h2>

          <div className="space-y-3">
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-black text-gray-900">Important: BKASH Scheduled Maintenance</span>
                <span className="text-[10px] text-gray-400">2026-08-23 09:00</span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                BKASH wallet is undergoing daily scheduled maintenance from 12AM-7AM (+GMT+6). Instant deposits and withdrawals remain active via Nagad-SpeedPay and Rocket.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-black text-gray-900">Welcome to Krikya VIP Club</span>
                <span className="text-[10px] text-gray-400">2026-08-22 10:30</span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Your account is now registered! Make your first deposit to enjoy our 500% Super Welcome Bonus up to ৳20,000.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. REFERRAL SUMMARY VIEW (Exact as shown in video!) */}
      {type === 'referral' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-[#072718] via-[#0e5332] to-[#146b41] text-white rounded-2xl p-6 shadow-md">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">
              Deshi Krikya, Beshi Rewards!
            </span>
            <h1 className="text-2xl font-black uppercase text-white">Referral Program Summary</h1>
            <p className="text-xs text-emerald-100 mt-1">
              Invite players and earn weekly lifetime commissions with 55% rev-share rates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs text-center">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Total Referrals</span>
              <span className="text-2xl font-black text-gray-900 mt-1 block">{user.totalReferrals}</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs text-center">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Today Commission</span>
              <span className="text-2xl font-black text-[#0e5332] mt-1 block">৳ {user.todayCommission.toFixed(2)}</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs text-center">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Total Commission Earned</span>
              <span className="text-2xl font-black text-[#ff5a00] mt-1 block">৳ {user.totalCommission.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3">
            <h3 className="font-extrabold text-sm text-gray-800">Your Unique Referral Link</h3>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={`https://krikya11.club/register?ref=${user.referralCode}`}
                className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-mono text-gray-700"
              />
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(`https://krikya11.club/register?ref=${user.referralCode}`);
                  alert('Referral link copied!');
                }}
                className="bg-[#ff5a00] hover:bg-[#e04f00] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1 transition"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. AFFILIATE APPLICATION VIEW */}
      {type === 'affiliate' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-base font-extrabold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-3">
            <Briefcase className="w-5 h-5 text-[#0e5332]" />
            <span>Krikya Master Affiliate Program</span>
          </h2>

          {affiliateSubmitted ? (
            <div className="bg-emerald-50 text-[#0e5332] p-4 rounded-xl border border-emerald-300 text-xs space-y-1 font-bold">
              <p>🎉 Affiliate Application Submitted!</p>
              <p className="font-normal text-gray-600">Our affiliate manager will review your submission and contact you via Telegram or Email within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleAffiliateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Telegram / WhatsApp Contact *</label>
                <input
                  type="text"
                  placeholder="@your_telegram_id or +88017XXXXXXXX"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs focus:bg-white focus:outline-hidden focus:border-[#0e5332]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Primary Traffic Source</label>
                <input
                  type="text"
                  value={trafficSource}
                  onChange={(e) => setTrafficSource(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs focus:bg-white focus:outline-hidden focus:border-[#0e5332]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Marketing Experience</label>
                <textarea
                  rows={3}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:border-[#0e5332]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0e5332] hover:bg-[#0a3e25] text-white font-extrabold py-3 rounded-xl text-xs shadow-md transition cursor-pointer"
              >
                Submit Affiliate Application (Up to 55% Rev-Share)
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
