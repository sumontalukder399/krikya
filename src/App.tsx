'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PageType, UserProfile, RewardStoreItem } from './types';
import { MOCK_USER } from './data/mockData';
import { LanguageProvider } from './context/LanguageContext';

// Layout components
import { Header } from './components/Header';
import { MobileHeader } from './components/MobileHeader';
import { MobileDrawer } from './components/MobileDrawer';
import { MobileFooterNav } from './components/MobileFooterNav';
import { Footer } from './components/Footer';
import { SideWidgets } from './components/SideWidgets';
import { LiveChatWidget } from './components/LiveChatWidget';

// Views
import { HomeView } from './views/HomeView';
import { SlotGamesView } from './views/SlotGamesView';
import { CricketView } from './views/CricketView';
import { LiveCasinoView } from './views/LiveCasinoView';
import { CrashGamesView } from './views/CrashGamesView';
import { TableGamesView } from './views/TableGamesView';
import { SportsbookView } from './views/SportsbookView';
import { FishingGamesView } from './views/FishingGamesView';
import { PromotionView } from './views/PromotionView';
import { VipTierView } from './views/VipTierView';
import { KrikbetChallengeView } from './views/KrikbetChallengeView';
import { RewardStoreView } from './views/RewardStoreView';
import { CardManiaView } from './views/CardManiaView';
import { FortuneSpinView } from './views/FortuneSpinView';
import { ProfileHubView } from './views/ProfileHubView';
import { DepositFundsView } from './views/DepositFundsView';
import { ClaimVoucherView } from './views/ClaimVoucherView';
import { HistoryPagesView } from './views/HistoryPagesView';
import { SettingsPagesView } from './views/SettingsPagesView';

// Modals
import { LoginModal } from './components/Modals/LoginModal';
import { SignUpModal } from './components/Modals/SignUpModal';
import { AnnouncementModal } from './components/Modals/AnnouncementModal';
import { DailyCheckInModal } from './components/Modals/DailyCheckInModal';
import { EditProfileModal } from './components/Modals/EditProfileModal';
import { AddBankAccountModal } from './components/Modals/AddBankAccountModal';
import { KrikyaLogoSpinner } from './components/KrikyaLogoSpinner';

// Icons for Game launch simulation
import { X, Play, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // State
  const [user, setUser] = useState<UserProfile>({
    ...MOCK_USER,
    username: '', fullName: '', email: '', phone: '', walletBalance: 0, balance: 0, coins: 0, coinBalance: 0,
    isLoggedIn: false,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedProvider, setSelectedProvider] = useState('JILI');
  const [isPageLoading, setIsPageLoading] = useState(true);
  const navigationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Modal states
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);
  const [isDailyCheckInOpen, setIsDailyCheckInOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddBankOpen, setIsAddBankOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);

  // Active Interactive Game Modal
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [isGameLoading, setIsGameLoading] = useState(false);

  const handleLaunchGame = (gameTitle: string) => {
    setIsGameLoading(true);
    setTimeout(() => {
      setIsGameLoading(false);
      setActiveGame(gameTitle);
    }, 1200);
  };

  // Handlers
  useEffect(() => {
    void refreshProfile();
    if (new URLSearchParams(window.location.search).has('ref')) setIsSignUpOpen(true);
    navigationTimerRef.current = setTimeout(() => {
      setIsPageLoading(false);
      navigationTimerRef.current = null;
    }, 900);

    return () => {
      if (navigationTimerRef.current) clearTimeout(navigationTimerRef.current);
    };
  }, []);

  const refreshProfile = async () => {
    const response = await fetch('/api/v1/profile', { cache: 'no-store' });
    if (!response.ok) { setIsLoggedIn(false); return; }
    const { data } = await response.json();
    setUser(prev => ({ ...prev, username: data.name, fullName: data.name, email: data.email, phone: data.phone || '', balance: data.balance, walletBalance: data.balance, referralCode: data.referralCode, isLoggedIn: true }));
    setIsLoggedIn(true);
  };

  const handleNavigate = (page: PageType) => {
    if (navigationTimerRef.current) clearTimeout(navigationTimerRef.current);
    setIsPageLoading(true);
    navigationTimerRef.current = setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'auto' });
      setIsPageLoading(false);
      navigationTimerRef.current = null;
    }, 650);
  };

  const handleLoginSuccess = () => {
    void refreshProfile();
  };

  const handleSignUpSuccess = (data: { username: string; phone: string; email: string }) => {
    setIsLoggedIn(true);
    setUser((prev) => ({
      ...prev,
      username: data.username,
      phone: data.phone,
      email: data.email,
      isLoggedIn: true,
    }));
    // Open deposit page after registration as shown in video!
    handleNavigate('deposit');
    void refreshProfile();
  };

  const handleLogout = () => {
    void fetch('/api/v1/auth/logout', { method: 'POST' });
    setIsLoggedIn(false);
    setUser((prev) => ({ ...prev, isLoggedIn: false }));
    setIsDrawerOpen(false);
    handleNavigate('home');
  };

  const handleClaimCoins = (amount: number) => {
    setUser((prev) => ({ ...prev, coins: prev.coins + amount }));
  };

  const handleDepositSuccess = (_amount: number) => {
    void refreshProfile();
  };

  const handleWithdrawSuccess = (amount: number) => {
    setUser((prev) => ({ ...prev, walletBalance: Math.max(0, prev.walletBalance - amount), balance: Math.max(0, prev.balance - amount) }));
  };

  const handlePlaceBet = (match: string, team: string, odds: number) => {
    setUser((prev) => ({
      ...prev,
      walletBalance: Math.max(0, prev.walletBalance - 500),
      vipTurnoverProgress: prev.vipTurnoverProgress + 500,
    }));
  };

  const handleWinReward = (amount: number, type: 'cash' | 'coin') => {
    if (type === 'cash') {
      setUser((prev) => ({ ...prev, walletBalance: prev.walletBalance + amount }));
    } else {
      setUser((prev) => ({ ...prev, coins: prev.coins + amount }));
    }
  };

  const handleRedeemReward = (item: RewardStoreItem) => {
    setUser((prev) => ({
      ...prev,
      coins: Math.max(0, prev.coins - item.costCoins),
    }));
  };

  const handleClaimVoucher = (code: string) => {
    setUser((prev) => ({
      ...prev,
      walletBalance: prev.walletBalance + 500,
    }));
  };

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
    void refreshProfile();
  };

  return (
    <LanguageProvider>
      <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-[#f3f4f6] font-sans text-gray-900 selection:bg-[#ff5a00] selection:text-white">
        {/* 1. Header (Desktop) */}
        <Header
          user={user}
          isLoggedIn={isLoggedIn}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenLogin={() => setIsLoginOpen(true)}
          onOpenSignUp={() => setIsSignUpOpen(true)}
          onLogout={handleLogout}
          onSelectProvider={(_, code) => setSelectedProvider(code)}
        />

        {/* 2. Mobile Header */}
        <MobileHeader
          user={user}
          isLoggedIn={isLoggedIn}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onOpenLogin={() => setIsLoginOpen(true)}
          onOpenSignUp={() => setIsSignUpOpen(true)}
          onNavigate={handleNavigate}
        />

        {/* 3. Mobile Navigation Drawer */}
        <MobileDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          user={user}
          isLoggedIn={isLoggedIn}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenLogin={() => setIsLoginOpen(true)}
          onOpenSignUp={() => setIsSignUpOpen(true)}
          onLogout={handleLogout}
        />

        {/* 4. Main Page View Content */}
        <main className="flex-1 w-full">
          {currentPage === 'home' && (
            <HomeView
              onNavigate={handleNavigate}
              user={user}
              onOpenSignUp={() => setIsSignUpOpen(true)}
              onOpenLogin={() => setIsLoginOpen(true)}
            />
          )}

          {currentPage === 'slot' && (
            <SlotGamesView selectedProvider={selectedProvider} onPlayGame={(title) => handleLaunchGame(title)} />
          )}

          {currentPage === 'cricket' && (
            <CricketView onPlaceBet={handlePlaceBet} />
          )}

          {currentPage === 'casino' && (
            <LiveCasinoView onPlayGame={(title) => handleLaunchGame(title)} />
          )}

          {currentPage === 'crash' && (
            <CrashGamesView onPlayGame={(title) => handleLaunchGame(title)} />
          )}

          {currentPage === 'table' && (
            <TableGamesView onPlayGame={(title) => handleLaunchGame(title)} />
          )}

          {currentPage === 'sports' && (
            <SportsbookView onPlayGame={(title) => handleLaunchGame(title)} />
          )}

          {currentPage === 'fishing' && (
            <FishingGamesView onPlayGame={(title) => handleLaunchGame(title)} />
          )}

          {currentPage === 'promotion' && (
            <PromotionView onApplyPromo={(title) => alert(`Successfully applied for: ${title}`)} />
          )}

          {currentPage === 'vip' && (
            <VipTierView user={user} />
          )}

          {currentPage === 'krikbet-challenge' && (
            <KrikbetChallengeView
              coinBalance={user.coins}
              onClaimCoins={handleClaimCoins}
            />
          )}

          {currentPage === 'reward-store' && (
            <RewardStoreView
              coinBalance={user.coins}
              onRedeemReward={handleRedeemReward}
            />
          )}

          {currentPage === 'card-mania' && (
            <CardManiaView onWinReward={handleWinReward} />
          )}

          {currentPage === 'fortune-spin' && (
            <FortuneSpinView onWinReward={handleWinReward} />
          )}

          {currentPage === 'profile-hub' && (
            <ProfileHubView
              user={user}
              onNavigate={handleNavigate}
              onOpenEditProfile={() => setIsEditProfileOpen(true)}
              onOpenDailyCheckIn={() => setIsDailyCheckInOpen(true)}
              onLogout={handleLogout}
            />
          )}

          {currentPage === 'deposit' && (
            <DepositFundsView
              user={user}
              onDepositSuccess={handleDepositSuccess}
              onWithdrawSuccess={handleWithdrawSuccess}
            />
          )}

          {currentPage === 'claim-voucher' && (
            <ClaimVoucherView onClaimVoucher={handleClaimVoucher} />
          )}

          {/* History Pages */}
          {(currentPage === 'betting-history' ||
            currentPage === 'turnover-history' ||
            currentPage === 'transfer-history' ||
            currentPage === 'bonus-history' ||
            currentPage === 'transaction-history' ||
            currentPage === 'redemption-history') && (
            <HistoryPagesView
              type={
                currentPage === 'betting-history'
                  ? 'betting'
                  : currentPage === 'turnover-history'
                  ? 'turnover'
                  : currentPage === 'transfer-history'
                  ? 'transfer'
                  : currentPage === 'bonus-history'
                  ? 'bonus'
                  : currentPage === 'transaction-history'
                  ? 'transaction'
                  : 'redemption'
              }
              onNavigate={handleNavigate}
              user={user}
            />
          )}

          {/* Settings Pages */}
          {(currentPage === 'personal-info' ||
            currentPage === 'change-password' ||
            currentPage === 'bank-details' ||
            currentPage === 'inbox-messages' ||
            currentPage === 'referral-summary' ||
            currentPage === 'affiliate-apply') && (
            <SettingsPagesView
              type={
                currentPage === 'personal-info'
                  ? 'personal'
                  : currentPage === 'change-password'
                  ? 'password'
                  : currentPage === 'bank-details'
                  ? 'bank'
                  : currentPage === 'inbox-messages'
                  ? 'inbox'
                  : currentPage === 'referral-summary'
                  ? 'referral'
                  : 'affiliate'
              }
              user={user}
              onNavigate={handleNavigate}
              onOpenEditProfile={() => setIsEditProfileOpen(true)}
              onOpenAddBank={() => setIsAddBankOpen(true)}
            />
          )}
        </main>

        {/* 5. Sticky Floating Side Widgets (Free Coins & Contact Us) */}
        <SideWidgets
          onOpenDailyCheckIn={() => setIsDailyCheckInOpen(true)}
          onOpenLiveChat={() => setIsLiveChatOpen(true)}
          isChatOpen={isLiveChatOpen}
        />

        {/* 6. Live Chat Intercom Bubble */}
        <LiveChatWidget
          isOpen={isLiveChatOpen}
          onClose={() => setIsLiveChatOpen(false)}
          user={user}
        />

        {/* 7. Footer */}
        <Footer onNavigate={handleNavigate} />

        {/* 8. Mobile Bottom Navigation Bar */}
        <MobileFooterNav
          currentPage={currentPage}
          onNavigate={handleNavigate}
          user={user}
          isLoggedIn={isLoggedIn}
          onOpenLogin={() => setIsLoginOpen(true)}
          onOpenSignUp={() => setIsSignUpOpen(true)}
        />

        {/* 9. Global Modals */}
        {isPageLoading && <KrikyaLogoSpinner fullScreen />}
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          onSwitchToSignUp={() => {
            setIsLoginOpen(false);
            setIsSignUpOpen(true);
          }}
        />

        <SignUpModal
          isOpen={isSignUpOpen}
          onClose={() => setIsSignUpOpen(false)}
          onSignUpSuccess={handleSignUpSuccess}
          onSwitchToLogin={() => {
            setIsSignUpOpen(false);
            setIsLoginOpen(true);
          }}
        />

        <AnnouncementModal
          isOpen={isAnnouncementOpen}
          onClose={() => setIsAnnouncementOpen(false)}
        />

        <DailyCheckInModal
          isOpen={isDailyCheckInOpen}
          onClose={() => setIsDailyCheckInOpen(false)}
          onClaimCoins={handleClaimCoins}
          coinBalance={user.coins}
        />

        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
          user={user}
          onSave={handleUpdateProfile}
        />

        <AddBankAccountModal
          isOpen={isAddBankOpen}
          onClose={() => setIsAddBankOpen(false)}
          onAddAccount={(acc) => {
            alert(`Successfully linked ${acc.bankName} account (${acc.accountNumber}) for ${acc.holderName}`);
          }}
        />

        {/* Global Game Launch Spinner (Matching Screenshot 4) */}
        {isGameLoading && (
          <KrikyaLogoSpinner fullScreen={true} text="Launching Game Lobby..." />
        )}

        {/* Interactive Game Play Simulator Modal */}
        {activeGame && (
          <div className="fixed inset-0 z-60 bg-black/90 flex flex-col">
            {/* In-Game Header Bar */}
            <div className="bg-[#0b131e] px-4 py-2.5 flex items-center justify-between text-white border-b border-gray-800">
              <div className="flex items-center gap-3">
                <span className="font-bold text-sm text-amber-400">{activeGame}</span>
                <span className="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded">Real Play</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  Wallet: ৳ {user.walletBalance.toFixed(2)}
                </span>
                <button
                  onClick={() => setActiveGame(null)}
                  className="p-1.5 rounded-full bg-red-600/80 hover:bg-red-600 text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* In-Game Simulation Viewport */}
            <div className="flex-1 bg-[#070d14] flex flex-col items-center justify-center p-4 text-center text-white relative">
              <div className="max-w-md w-full bg-[#111c2a] rounded-2xl p-6 border border-slate-700 shadow-2xl space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 animate-pulse">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>

                <div>
                  <h3 className="font-black text-lg text-white">{activeGame}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Connecting to high-speed secure RNG gaming server...
                  </p>
                </div>

                <div className="bg-black/40 p-4 rounded-xl border border-gray-800 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-300">
                    <span>Balance:</span>
                    <span className="font-mono font-bold text-emerald-400">৳ {user.walletBalance.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Bet Stake:</span>
                    <span className="font-mono font-bold text-amber-400">৳ 100.00</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const won = Math.random() > 0.4;
                    const winAmt = won ? Math.floor(Math.random() * 800) + 150 : 0;
                    if (won) {
                      try {
                        confetti({
                          particleCount: 80,
                          spread: 70,
                          origin: { y: 0.6 },
                          colors: ['#ff5a00', '#0e5332', '#ffb700']
                        });
                      } catch {}
                      setUser((prev) => ({ ...prev, walletBalance: prev.walletBalance + winAmt - 100 }));
                      alert(`🎉 BIG WIN! You won ৳${winAmt.toFixed(2)} on ${activeGame}!`);
                    } else {
                      setUser((prev) => ({ ...prev, walletBalance: Math.max(0, prev.walletBalance - 100) }));
                      alert(`Round complete. Better luck on the next spin!`);
                    }
                  }}
                  className="w-full bg-[#ff5a00] hover:bg-[#e04f00] text-white font-extrabold py-3 rounded-xl text-xs shadow-lg transition hover:scale-102 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>SPIN / PLAY ROUND (৳ 100)</span>
                </button>

                <button
                  onClick={() => setActiveGame(null)}
                  className="text-xs text-gray-400 hover:text-white underline pt-1 block mx-auto cursor-pointer"
                >
                  Exit Game to Lobby
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </LanguageProvider>
  );
}
