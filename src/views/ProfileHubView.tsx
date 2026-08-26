import React, { useState } from 'react';
import { PageType, UserProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  X, 
  RotateCw, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Gift, 
  FileText, 
  RefreshCcw, 
  ArrowLeftRight, 
  Award, 
  CreditCard, 
  Ticket, 
  CalendarCheck, 
  Layers, 
  Disc, 
  Store, 
  User, 
  KeyRound, 
  Landmark, 
  Mail, 
  Users, 
  Headphones, 
  MessageCircle, 
  Send, 
  Facebook, 
  Smartphone, 
  LogOut,
  Shield,
  Sparkles
} from 'lucide-react';

interface ProfileHubViewProps {
  user: UserProfile;
  onNavigate: (page: PageType) => void;
  onOpenEditProfile?: () => void;
  onOpenDailyCheckIn?: () => void;
  onLogout: () => void;
}

export const ProfileHubView: React.FC<ProfileHubViewProps> = ({
  user,
  onNavigate,
  onOpenEditProfile,
  onOpenDailyCheckIn,
  onLogout,
}) => {
  const { language, t } = useLanguage();
  const [showBalance, setShowBalance] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNotice, setShowNotice] = useState(true);

  const handleRefreshBalance = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="mx-auto min-h-[calc(100vh-116px)] w-[calc(100%-1rem)] space-y-4 px-2 py-4 pb-24 text-gray-800 animate-fadeIn sm:w-[90%] sm:px-4 lg:w-[50vw] lg:max-w-[900px]">
      {/* 1. Top Dark Teal Hero Bar matching Green Screenshot */}
      <div className="bg-[#0e2a22] text-white rounded-t-xl px-4 py-3.5 flex items-center justify-between shadow-md">
        {/* User Info */}
        <div className="flex items-center gap-3">
          {/* Avatar with dark ring */}
          <div className="w-10 h-10 rounded-full bg-[#071d17] border-2 border-emerald-500/80 flex items-center justify-center font-black text-base text-emerald-400 shadow-inner">
            {user.username ? user.username.charAt(0).toUpperCase() : 'G'}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-white tracking-wide">
              {user.username || 'geaGRT5'}
            </span>
            <button
              onClick={handleRefreshBalance}
              className={`text-gray-300 hover:text-white p-0.5 transition cursor-pointer ${
                isRefreshing ? 'animate-spin' : ''
              }`}
              title="Refresh"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Close Button X (Back to Home) */}
        <button
          onClick={() => onNavigate('home')}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition cursor-pointer"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* 2. VIP Tier Metallic Progress Card matching Green Screenshot */}
      <div className="bg-gradient-to-r from-[#5f877a] via-[#70988c] to-[#97b8ad] text-white rounded-b-xl shadow-md overflow-hidden border border-emerald-800/30">
        <div className="p-4 relative">
          {/* VIP Level Title */}
          <div className="text-xs font-black text-slate-900 mb-3 tracking-wide">
            {t('profile.vip_level')} <span className="font-extrabold text-slate-900">{user.vipLevel || 'Normal'}</span>
          </div>

          {/* Grid with Progress & Medal */}
          <div className="grid grid-cols-12 gap-3 items-center">
            {/* Left Progress Columns */}
            <div className="col-span-8 sm:col-span-9 space-y-2.5">
              {/* Deposit Progress Bar */}
              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-800 mb-0.5">
                  <span>{t('profile.deposit_progress')}</span>
                  <span className="font-mono text-slate-900">
                    {user.vipDepositProgress || 0} / {user.vipDepositTarget || 500}
                  </span>
                </div>
                <div className="w-full bg-[#1e194f]/40 h-2 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="bg-gradient-to-r from-[#171340] to-[#2a2266] h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min(100, Math.max(4, ((user.vipDepositProgress || 0) / (user.vipDepositTarget || 500)) * 100))}%` 
                    }}
                  />
                </div>
              </div>

              {/* Turnover Progress Bar */}
              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-800 mb-0.5">
                  <span>{t('profile.turnover_progress')}</span>
                  <span className="font-mono text-slate-900">
                    {user.vipTurnoverProgress || 0} / {(user.vipTurnoverTarget || 5000).toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-[#1e194f]/40 h-2 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="bg-gradient-to-r from-[#171340] to-[#2a2266] h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min(100, Math.max(4, ((user.vipTurnoverProgress || 0) / (user.vipTurnoverTarget || 5000)) * 100))}%` 
                    }}
                  />
                </div>
              </div>

              {/* Upgrade Requirement Specs */}
              <div className="text-[10px] text-slate-800 font-semibold space-y-0.5 pt-1 leading-tight">
                <p className="font-bold text-slate-900">{t('profile.upgrade_club')}</p>
                <p className="text-slate-800">{t('profile.deposit_needed')} 500</p>
                <p className="text-slate-800">{t('profile.turnover_needed')} 5,000</p>
              </div>
            </div>

            {/* Right Silver/Metallic VIP Badge Emblem */}
            <div className="col-span-4 sm:col-span-3 flex justify-center items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-slate-200 via-slate-400 to-slate-500 p-1 shadow-lg flex items-center justify-center border-2 border-slate-300/80">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-slate-400 via-slate-200 to-slate-400 flex flex-col items-center justify-center text-slate-800 shadow-inner border border-slate-300">
                  <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-slate-700 fill-slate-300/60" />
                  <span className="text-[8px] font-black tracking-tighter text-slate-900 mt-0.5 uppercase">VIP NORMAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tier Privileges Link Bar */}
        <button
          onClick={() => onNavigate('vip')}
          className="w-full bg-[#4e7467]/70 hover:bg-[#43675a] px-4 py-2 flex items-center justify-between text-xs font-bold text-slate-100 transition cursor-pointer border-t border-emerald-800/20"
        >
          <span>{t('profile.view_tier_benefits')}</span>
          <ChevronRight className="w-4 h-4 text-slate-200" />
        </button>
      </div>

      {/* 3. Video Tutorial Notice Bar matching Green Screenshot */}
      {showNotice && (
        <div className="bg-white rounded-lg border border-gray-200 px-3.5 py-2 flex items-center justify-between gap-2 shadow-xs">
          <span className="text-[11px] font-medium text-gray-700 line-clamp-1">
            {t('profile.video_notice')}
          </span>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => alert('Opening Krikya Voucher Redemption Tutorial Video...')}
              className="bg-[#ff5a00] hover:bg-[#e04f00] text-white font-bold text-[11px] px-2.5 py-1 rounded-md shadow-xs transition cursor-pointer whitespace-nowrap"
            >
              {t('profile.watch_video')}
            </button>
            <button
              onClick={() => setShowNotice(false)}
              className="text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 4. Main Wallet Header Bar matching Green Screenshot */}
      <div className="bg-white rounded-lg border border-gray-200 px-4 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-gray-800">{t('profile.main_wallet')}</span>
          <button
            onClick={handleRefreshBalance}
            className={`text-emerald-700 hover:text-emerald-800 p-0.5 cursor-pointer ${
              isRefreshing ? 'animate-spin' : ''
            }`}
            title="Refresh Wallet"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-sm text-gray-800">
            {showBalance ? `৳ ${user.walletBalance.toFixed(2)}` : '৳ *.**'}
          </span>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="text-gray-500 hover:text-gray-800 cursor-pointer p-0.5"
            title={showBalance ? 'Hide Balance' : 'Show Balance'}
          >
            {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 5. Section: তহবিল (Funds) */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs">
        <div className="px-3.5 py-2 bg-gray-50/70 border-b border-gray-100 flex items-center gap-1.5">
          <span className="text-[#2e694d] font-black text-sm">|</span>
          <h4 className="text-xs font-bold text-gray-800">{t('profile.funds')}</h4>
        </div>
        <div className="grid grid-cols-3 divide-x divide-gray-100">
          {/* Deposit */}
          <button
            onClick={() => onNavigate('deposit')}
            className="flex flex-col items-center justify-center p-3 hover:bg-orange-50/50 transition cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-orange-50 text-[#ff5a00] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <ArrowDownToLine className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-semibold text-gray-700 group-hover:text-[#ff5a00] transition text-center">
              {t('profile.deposit')}
            </span>
          </button>

          {/* Withdrawal */}
          <button
            onClick={() => onNavigate('deposit')}
            className="flex flex-col items-center justify-center p-3 hover:bg-orange-50/50 transition cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-orange-50 text-[#ff5a00] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <ArrowUpFromLine className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-semibold text-gray-700 group-hover:text-[#ff5a00] transition text-center">
              {t('profile.withdrawal')}
            </span>
          </button>

          {/* Claim Voucher */}
          <button
            onClick={() => onNavigate('claim-voucher')}
            className="flex flex-col items-center justify-center p-3 hover:bg-orange-50/50 transition cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-orange-50 text-[#ff5a00] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Gift className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-semibold text-gray-700 group-hover:text-[#ff5a00] transition text-center">
              {t('profile.claim_voucher')}
            </span>
          </button>
        </div>
      </div>

      {/* 6. Section: ইতিহাস (History) */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs">
        <div className="px-3.5 py-2 bg-gray-50/70 border-b border-gray-100 flex items-center gap-1.5">
          <span className="text-[#2e694d] font-black text-sm">|</span>
          <h4 className="text-xs font-bold text-gray-800">{t('profile.history')}</h4>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 divide-x divide-y sm:divide-y-0 divide-gray-100">
          {/* Betting Record */}
          <button
            onClick={() => onNavigate('betting-history')}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 hover:bg-orange-50/50 transition cursor-pointer group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-50 text-[#ff5a00] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-700 group-hover:text-[#ff5a00] transition text-center line-clamp-1">
              {t('profile.betting_record')}
            </span>
          </button>

          {/* Turnover */}
          <button
            onClick={() => onNavigate('turnover-history')}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 hover:bg-orange-50/50 transition cursor-pointer group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-50 text-[#ff5a00] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <RefreshCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-700 group-hover:text-[#ff5a00] transition text-center line-clamp-1">
              {t('profile.turnover')}
            </span>
          </button>

          {/* Transfer Record */}
          <button
            onClick={() => onNavigate('transfer-history')}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 hover:bg-orange-50/50 transition cursor-pointer group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-50 text-[#ff5a00] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <ArrowLeftRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-700 group-hover:text-[#ff5a00] transition text-center line-clamp-1">
              {t('profile.transfer_record')}
            </span>
          </button>

          {/* Bonus */}
          <button
            onClick={() => onNavigate('bonus-history')}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 hover:bg-orange-50/50 transition cursor-pointer group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-50 text-[#ff5a00] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-700 group-hover:text-[#ff5a00] transition text-center line-clamp-1">
              {t('profile.bonus')}
            </span>
          </button>

          {/* Transaction Record */}
          <button
            onClick={() => onNavigate('transaction-history')}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 hover:bg-orange-50/50 transition cursor-pointer group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-50 text-[#ff5a00] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-700 group-hover:text-[#ff5a00] transition text-center line-clamp-1">
              {t('profile.transaction_record')}
            </span>
          </button>

          {/* Redemption Record */}
          <button
            onClick={() => onNavigate('redemption-history')}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 hover:bg-orange-50/50 transition cursor-pointer group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-50 text-[#ff5a00] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Ticket className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-700 group-hover:text-[#ff5a00] transition text-center line-clamp-1">
              {t('profile.redemption_record')}
            </span>
          </button>
        </div>
      </div>

      {/* 7. Section: বিনামূল্যে কয়েন নিন (Earn Free Coins) */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs">
        <div className="px-3.5 py-2 bg-gray-50/70 border-b border-gray-100 flex items-center gap-1.5">
          <span className="text-[#2e694d] font-black text-sm">|</span>
          <h4 className="text-xs font-bold text-gray-800">{t('profile.earn_free_coins')}</h4>
        </div>
        <div className="grid grid-cols-2 divide-x divide-gray-100">
          {/* Daily Check-in */}
          <button
            onClick={onOpenDailyCheckIn || (() => alert('Daily Check-in Modal'))}
            className="flex flex-col items-center justify-center p-3 hover:bg-orange-50/50 transition cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-orange-50 text-[#ff5a00] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <CalendarCheck className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-semibold text-gray-700 group-hover:text-[#ff5a00] transition text-center">
              {t('profile.daily_checkin')}
            </span>
          </button>

          {/* Card Mania */}
          <button
            onClick={() => onNavigate('card-mania')}
            className="flex flex-col items-center justify-center p-3 hover:bg-orange-50/50 transition cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-orange-50 text-[#ff5a00] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-semibold text-gray-700 group-hover:text-[#ff5a00] transition text-center">
              {t('profile.card_mania')}
            </span>
          </button>
        </div>
      </div>

      {/* 8. Section: অফার/ পুরষ্কার নিন (Offers & Rewards) */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs">
        <div className="px-3.5 py-2 bg-gray-50/70 border-b border-gray-100 flex items-center gap-1.5">
          <span className="text-[#2e694d] font-black text-sm">|</span>
          <h4 className="text-xs font-bold text-gray-800">{t('profile.offers_rewards')}</h4>
        </div>
        <div className="grid grid-cols-2 divide-x divide-gray-100">
          {/* Fortune Spin */}
          <button
            onClick={() => onNavigate('fortune-spin')}
            className="flex flex-col items-center justify-center p-3 hover:bg-orange-50/50 transition cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-orange-50 text-[#ff5a00] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Disc className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-semibold text-gray-700 group-hover:text-[#ff5a00] transition text-center">
              {t('profile.fortune_spin')}
            </span>
          </button>

          {/* Reward Store */}
          <button
            onClick={() => onNavigate('reward-store')}
            className="flex flex-col items-center justify-center p-3 hover:bg-orange-50/50 transition cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-orange-50 text-[#ff5a00] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Store className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-semibold text-gray-700 group-hover:text-[#ff5a00] transition text-center">
              {t('profile.reward_store')}
            </span>
          </button>
        </div>
      </div>

      {/* 9. Section: প্রোফাইল (Profile) */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs">
        <div className="px-3.5 py-2 bg-gray-50/70 border-b border-gray-100 flex items-center gap-1.5">
          <span className="text-[#2e694d] font-black text-sm">|</span>
          <h4 className="text-xs font-bold text-gray-800">{t('profile.profile_menu')}</h4>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-gray-100">
          {/* Personal Info */}
          <button
            onClick={onOpenEditProfile || (() => onNavigate('personal-info'))}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 hover:bg-orange-50/50 transition cursor-pointer group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-50 text-[#ff5a00] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-700 group-hover:text-[#ff5a00] transition text-center line-clamp-1">
              {t('profile.personal_info')}
            </span>
          </button>

          {/* Change Password */}
          <button
            onClick={() => onNavigate('change-password')}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 hover:bg-orange-50/50 transition cursor-pointer group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-50 text-[#ff5a00] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <KeyRound className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-700 group-hover:text-[#ff5a00] transition text-center line-clamp-1">
              {t('profile.change_password')}
            </span>
          </button>

          {/* Bank Details */}
          <button
            onClick={() => onNavigate('bank-details')}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 hover:bg-orange-50/50 transition cursor-pointer group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-50 text-[#ff5a00] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Landmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-700 group-hover:text-[#ff5a00] transition text-center line-clamp-1">
              {t('profile.bank_details')}
            </span>
          </button>

          {/* Inbox Messages */}
          <button
            onClick={() => onNavigate('inbox-messages')}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 hover:bg-orange-50/50 transition cursor-pointer group relative"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-50 text-[#ff5a00] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            </div>
            {user.unreadMessagesCount > 0 && (
              <span className="absolute top-2 right-4 w-4 h-4 bg-red-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                {user.unreadMessagesCount}
              </span>
            )}
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-700 group-hover:text-[#ff5a00] transition text-center line-clamp-1">
              {t('profile.inbox_messages')}
            </span>
          </button>

          {/* Referral */}
          <button
            onClick={() => onNavigate('referral-summary')}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 hover:bg-orange-50/50 transition cursor-pointer group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-50 text-[#ff5a00] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-700 group-hover:text-[#ff5a00] transition text-center line-clamp-1">
              {t('profile.referral')}
            </span>
          </button>
        </div>
      </div>

      {/* 10. Section: যোগাযোগ করুন (Contact Us) */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs">
        <div className="px-3.5 py-2 bg-gray-50/70 border-b border-gray-100 flex items-center gap-1.5">
          <span className="text-[#2e694d] font-black text-sm">|</span>
          <h4 className="text-xs font-bold text-gray-800">{t('profile.contact_us')}</h4>
        </div>
        <div className="grid grid-cols-4 divide-x divide-gray-100">
          {/* 24/7 Support */}
          <button
            onClick={() => alert('Connecting to 24/7 Customer Live Support...')}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 hover:bg-orange-50/50 transition cursor-pointer group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-50 text-[#ff5a00] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-700 group-hover:text-[#ff5a00] transition text-center line-clamp-1">
              {t('profile.support_247')}
            </span>
          </button>

          {/* WhatsApp */}
          <a
            href="https://wa.me"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 hover:bg-orange-50/50 transition cursor-pointer group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-50 text-[#ff5a00] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-700 group-hover:text-[#ff5a00] transition text-center line-clamp-1">
              {t('profile.whatsapp')}
            </span>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 hover:bg-orange-50/50 transition cursor-pointer group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-50 text-[#ff5a00] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-700 group-hover:text-[#ff5a00] transition text-center line-clamp-1">
              {t('profile.telegram')}
            </span>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 hover:bg-orange-50/50 transition cursor-pointer group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-50 text-[#ff5a00] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-700 group-hover:text-[#ff5a00] transition text-center line-clamp-1">
              {t('profile.facebook')}
            </span>
          </a>
        </div>
      </div>

      {/* 11. Section: ডাউনলোড করুন (Download) */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs">
        <div className="px-3.5 py-2 bg-gray-50/70 border-b border-gray-100 flex items-center gap-1.5">
          <span className="text-[#2e694d] font-black text-sm">|</span>
          <h4 className="text-xs font-bold text-gray-800">{t('profile.download')}</h4>
        </div>
        <div>
          <button
            onClick={() => alert('Downloading official Krikya Android APK...')}
            className="w-full flex flex-col items-center justify-center p-3.5 hover:bg-orange-50/50 transition cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-orange-50 text-[#ff5a00] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Smartphone className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-semibold text-gray-700 group-hover:text-[#ff5a00] transition text-center">
              {t('profile.download_app')}
            </span>
          </button>
        </div>
      </div>

      {/* 12. Bottom Log Out Button Card matching Green Screenshot */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs">
        <button
          onClick={onLogout}
          id="profile-logout-button"
          className="w-full py-3 px-4 flex items-center justify-center gap-2 text-xs font-bold text-gray-800 hover:text-red-600 hover:bg-red-50/40 transition cursor-pointer group"
        >
          <div className="w-6 h-6 rounded-full bg-orange-50 text-[#ff5a00] group-hover:text-red-600 flex items-center justify-center transition">
            <LogOut className="w-3.5 h-3.5 stroke-[2.2]" />
          </div>
          <span>{t('profile.logout')}</span>
        </button>
      </div>
    </div>
  );
};
