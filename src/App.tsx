'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PageType, UserProfile } from './types';
import { errorMessage } from './platform/api';
import { player, type Game } from './platform/player';
import { LanguageProvider } from './context/LanguageContext';

// Layout components
import { Header } from './components/Header';
import { MobileHeader } from './components/MobileHeader';
import { MobileDrawer } from './components/MobileDrawer';
import { MobileFooterNav } from './components/MobileFooterNav';
import { Footer } from './components/Footer';
import { SideWidgets } from './components/SideWidgets';
import { ContactPanel } from './components/ContactPanel';

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
import { ProfileHubView } from './views/ProfileHubView';
import { DepositFundsView } from './views/DepositFundsView';
import { ClaimVoucherView } from './views/ClaimVoucherView';
import { HistoryPagesView } from './views/HistoryPagesView';
import { SettingsPagesView } from './views/SettingsPagesView';

// Modals
import { LoginModal } from './components/Modals/LoginModal';
import { SignUpModal } from './components/Modals/SignUpModal';
import { AnnouncementModal } from './components/Modals/AnnouncementModal';
import { EditProfileModal } from './components/Modals/EditProfileModal';
import { KrikyaLogoSpinner } from './components/KrikyaLogoSpinner';

import { X } from 'lucide-react';

const LOGGED_OUT_USER: UserProfile = {
  username: '', isLoggedIn: false, walletBalance: 0, balance: 0, vipLevel: 'Normal',
  vipDepositProgress: 0, vipDepositTarget: 0, vipTurnoverProgress: 0, vipTurnoverTarget: 0,
  phone: '', email: '', fullName: '', currency: 'BDT', referralCode: '', totalReferrals: 0, totalCommission: 0, unreadMessagesCount: 0,
};

/** The names the header and drawer use for a page, as the page this app renders. */
const PAGE_ALIASES: Partial<Record<PageType, PageType>> = {
  tablegames: 'table', sportsbook: 'sports', 'bank-account': 'deposit', inbox: 'inbox-messages',
};

export default function App() {
  // State
  const [user, setUser] = useState<UserProfile>(LOGGED_OUT_USER);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [fundsTab, setFundsTab] = useState<'deposit' | 'withdrawal'>('deposit');
  const [selectedProvider, setSelectedProvider] = useState<string | undefined>();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const navigationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Modal states
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // The game the player is in
  const [activeGame, setActiveGame] = useState<{ name: string; url: string } | null>(null);
  const [isGameLoading, setIsGameLoading] = useState(false);
  const [gameError, setGameError] = useState('');

  const handleLaunchGame = async (game: Game) => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
      return;
    }
    setGameError('');
    setIsGameLoading(true);
    try {
      const session = await player.launchGame(game.id);
      setActiveGame({ name: game.name, url: session.launchUrl });
    } catch (err) {
      setGameError(errorMessage(err, 'This game could not be opened. Please try again.'));
    } finally {
      setIsGameLoading(false);
    }
  };

  const handleCloseGame = async () => {
    setActiveGame(null);
    await player.syncGames();
    void refreshProfile();
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

  /** Everything the header and account pages show. Parts that fail must not log the player out. */
  const refreshProfile = async () => {
    let profile;
    try {
      profile = await player.me();
    } catch {
      setIsLoggedIn(false);
      setUser(LOGGED_OUT_USER);
      return;
    }
    const [wallet, vip, referrals, unread] = await Promise.all([
      player.wallet().catch(() => null),
      player.vip().catch(() => null),
      player.referrals().catch(() => null),
      player.unreadCount().catch(() => null),
    ]);
    const available = wallet ? (wallet.balanceMinor - wallet.heldMinor) / 100 : 0;
    setUser({
      username: profile.username,
      isLoggedIn: true,
      walletBalance: available,
      balance: available,
      vipLevel: vip?.current?.name ?? 'Normal',
      vipDepositProgress: (vip?.cumulativeDepositMinor ?? 0) / 100,
      vipDepositTarget: (vip?.next?.minDepositMinor ?? 0) / 100,
      vipTurnoverProgress: (vip?.cumulativeTurnoverMinor ?? 0) / 100,
      vipTurnoverTarget: (vip?.next?.minTurnoverMinor ?? 0) / 100,
      phone: profile.phone ?? '',
      email: profile.email ?? '',
      fullName: profile.displayName ?? '',
      currency: wallet?.currency ?? 'BDT',
      referralCode: referrals?.code ?? '',
      totalReferrals: referrals?.count ?? 0,
      totalCommission: (referrals?.rewardMinor ?? 0) / 100,
      unreadMessagesCount: unread?.count ?? 0,
    });
    setIsLoggedIn(true);
  };

  const handleNavigate = (requested: PageType) => {
    if (requested === 'withdrawal' || requested === 'deposit') setFundsTab(requested);
    const page = requested === 'withdrawal' ? 'deposit' : PAGE_ALIASES[requested] ?? requested;
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

  const handleSignUpSuccess = () => {
    void refreshProfile();
    handleNavigate('deposit');
  };

  const handleLogout = () => {
    void player.logout().catch(() => undefined);
    setIsLoggedIn(false);
    setUser(LOGGED_OUT_USER);
    setIsDrawerOpen(false);
    handleNavigate('home');
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
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* 4. Main Page View Content */}
        <main className="flex-1 w-full">
          {currentPage === 'home' && (
            <HomeView
              onNavigate={handleNavigate}
              onPlayGame={handleLaunchGame}
            />
          )}

          {currentPage === 'slot' && (
            <SlotGamesView selectedProvider={selectedProvider} onPlayGame={handleLaunchGame} />
          )}

          {currentPage === 'cricket' && (
            <CricketView onPlayGame={handleLaunchGame} />
          )}

          {currentPage === 'casino' && (
            <LiveCasinoView selectedProvider={selectedProvider} onPlayGame={handleLaunchGame} />
          )}

          {currentPage === 'crash' && (
            <CrashGamesView onPlayGame={handleLaunchGame} />
          )}

          {currentPage === 'table' && (
            <TableGamesView selectedProvider={selectedProvider} onPlayGame={handleLaunchGame} />
          )}

          {currentPage === 'sports' && (
            <SportsbookView onPlayGame={handleLaunchGame} />
          )}

          {currentPage === 'fishing' && (
            <FishingGamesView selectedProvider={selectedProvider} onPlayGame={handleLaunchGame} />
          )}

          {currentPage === 'promotion' && (
            <PromotionView onDeposit={() => handleNavigate('deposit')} />
          )}

          {currentPage === 'vip' && (
            <VipTierView isLoggedIn={isLoggedIn} />
          )}

          {currentPage === 'profile-hub' && (
            <ProfileHubView
              user={user}
              onNavigate={handleNavigate}
              onOpenEditProfile={() => setIsEditProfileOpen(true)}
              onOpenContact={() => setIsContactOpen(true)}
              onLogout={handleLogout}
            />
          )}

          {currentPage === 'deposit' && (
            <DepositFundsView
              user={user}
              isLoggedIn={isLoggedIn}
              initialTab={fundsTab}
              onChanged={() => void refreshProfile()}
              onOpenLogin={() => setIsLoginOpen(true)}
            />
          )}

          {currentPage === 'claim-voucher' && (
            <ClaimVoucherView onClaimed={() => void refreshProfile()} />
          )}

          {/* History Pages */}
          {(currentPage === 'betting-history' ||
            currentPage === 'turnover-history' ||
            currentPage === 'bonus-history' ||
            currentPage === 'transaction-history') && (
            <HistoryPagesView
              type={
                currentPage === 'betting-history'
                  ? 'betting'
                  : currentPage === 'turnover-history'
                  ? 'turnover'
                  : currentPage === 'bonus-history'
                  ? 'bonus'
                  : 'transaction'
              }
              onNavigate={handleNavigate}
            />
          )}

          {/* Settings Pages */}
          {(currentPage === 'personal-info' ||
            currentPage === 'change-password' ||
            currentPage === 'inbox-messages' ||
            currentPage === 'referral-summary' ||
            currentPage === 'affiliate-apply') && (
            <SettingsPagesView
              type={
                currentPage === 'personal-info'
                  ? 'personal'
                  : currentPage === 'change-password'
                  ? 'password'
                  : currentPage === 'inbox-messages'
                  ? 'inbox'
                  : currentPage === 'referral-summary'
                  ? 'referral'
                  : 'affiliate'
              }
              user={user}
              onNavigate={handleNavigate}
              onOpenEditProfile={() => setIsEditProfileOpen(true)}
              onInboxRead={() => void refreshProfile()}
            />
          )}
        </main>

        {/* 5. Sticky contact button */}
        <SideWidgets onOpenContact={() => setIsContactOpen(true)} />

        {/* 6. Contact links and support ticket */}
        <ContactPanel isOpen={isContactOpen} isLoggedIn={isLoggedIn} onClose={() => setIsContactOpen(false)} />

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

        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
          user={user}
          onSave={() => void refreshProfile()}
        />

        {isGameLoading && (
          <KrikyaLogoSpinner fullScreen={true} text="Launching Game..." />
        )}

        {gameError && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-sm space-y-3 rounded-2xl bg-white p-5 text-center text-sm shadow-2xl">
              <p className="font-semibold text-gray-800">{gameError}</p>
              <button onClick={() => setGameError('')} className="w-full cursor-pointer rounded-lg bg-[#ff5a00] py-2.5 text-xs font-extrabold text-white">OK</button>
            </div>
          </div>
        )}

        {activeGame && (
          <div className="fixed inset-0 z-[60] flex flex-col bg-black">
            <div className="flex items-center justify-between border-b border-gray-800 bg-[#0b131e] px-4 py-2.5 text-white">
              <span className="truncate text-sm font-bold text-amber-400">{activeGame.name}</span>
              <button onClick={() => void handleCloseGame()} className="cursor-pointer rounded-full bg-red-600/80 p-1.5 text-white transition hover:bg-red-600" aria-label="Exit game">
                <X className="h-4 w-4" />
              </button>
            </div>
            <iframe src={activeGame.url} title={activeGame.name} allow="autoplay; fullscreen" allowFullScreen className="w-full flex-1 border-0" />
          </div>
        )}
      </div>
    </LanguageProvider>
  );
}
