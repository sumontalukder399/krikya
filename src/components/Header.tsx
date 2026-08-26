import React, { useState } from 'react';
import { PageType, UserProfile } from '../types';
import { KrikyaLogo } from './KrikyaLogo';
import { PROVIDERS_BY_CATEGORY } from '../data/mockData';
import { PROVIDER_CARDS_BY_CATEGORY } from '../data/providerCatalog';
import { useLanguage } from '../context/LanguageContext';
import { 
  Home, 
  ChevronDown, 
  RotateCw, 
  Mail, 
  User, 
  CloudDownload,
  X
} from 'lucide-react';

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  user: UserProfile;
  isLoggedIn?: boolean;
  onOpenLogin: () => void;
  onOpenSignUp: () => void;
  onLogout: () => void;
  onRefreshBalance?: () => void;
  isRefreshingBalance?: boolean;
  onOpenAppDownload?: () => void;
  onSelectProvider?: (category: string, code: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  user,
  isLoggedIn,
  onOpenLogin,
  onOpenSignUp,
  onLogout,
  onRefreshBalance = () => {},
  isRefreshingBalance = false,
  onOpenAppDownload = () => {},
  onSelectProvider = () => {},
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  const isUserLoggedIn = isLoggedIn ?? user?.isLoggedIn ?? false;

  const navItems = [
    {
      id: 'slot',
      label: t('nav.slot'),
      page: 'slot' as PageType,
      hasDropdown: true,
      category: 'slot',
    },
    {
      id: 'cricket',
      label: t('nav.cricket'),
      page: 'cricket' as PageType,
      hasDropdown: true,
      category: 'cricket',
    },
    {
      id: 'casino',
      label: t('nav.casino'),
      page: 'casino' as PageType,
      hasDropdown: true,
      category: 'casino',
    },
    {
      id: 'crash',
      label: t('nav.crash'),
      page: 'crash' as PageType,
      hasDropdown: true,
      category: 'crash',
    },
    {
      id: 'tablegames',
      label: t('nav.table'),
      page: 'tablegames' as PageType,
      hasDropdown: true,
      category: 'table',
    },
    {
      id: 'sportsbook',
      label: t('nav.sports'),
      page: 'sportsbook' as PageType,
      hasDropdown: true,
      category: 'sports',
    },
    {
      id: 'fishing',
      label: t('nav.fishing'),
      page: 'fishing' as PageType,
      hasDropdown: true,
      category: 'fishing',
    },
    {
      id: 'promotion',
      label: t('nav.promotion'),
      page: 'promotion' as PageType,
      hasDropdown: false,
    },
    {
      id: 'vip',
      label: t('nav.vip'),
      page: 'vip' as PageType,
      hasDropdown: false,
    },
    {
      id: 'krikbet',
      label: t('nav.krikbet'),
      page: 'krikbet' as PageType,
      hasDropdown: false,
      isChallenge: true,
    },
  ];

  return (
    <>
      <header className="hidden lg:block sticky top-0 z-40 shadow-md">
        {/* 1. Top Bar: Exact Krikya Deep Emerald Green from Screenshot 1 & 4 */}
        <div className="bg-[linear-gradient(110deg,#5fc29b_0%,#4eb48c_48%,#359870_100%)] text-white">
          <div className="max-w-[1240px] mx-auto px-4 h-[70px] flex items-center justify-between">
            {/* Logo */}
            <div onClick={() => onNavigate('home')} className="flex items-center cursor-pointer">
              <KrikyaLogo size="xl" variant="white" showText={true} />
            </div>

            {/* Right Action Section */}
            <div className="flex items-center gap-3 text-[14px] font-semibold">
              {isUserLoggedIn ? (
                <>
                  {/* User Profile Avatar */}
                  <button
                    id="header-user-profile-btn"
                    onClick={() => onNavigate('profile-hub')}
                    className="p-1 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition cursor-pointer"
                    title={user.username}
                  >
                    <div className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </button>

                  {/* Mail / Inbox Icon with red notification dot */}
                  <button
                    id="header-inbox-btn"
                    onClick={() => onNavigate('inbox')}
                    className="relative p-1 text-white/90 hover:text-white transition cursor-pointer"
                    title="Inbox"
                  >
                    <div className="relative">
                      <Mail className="w-5 h-5" />
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-[#2e694d]">
                        {user.unreadMessagesCount || 0}
                      </span>
                    </div>
                  </button>

                  {/* Vertical separator */}
                  <div className="h-4 w-px bg-white/30"></div>

                  {/* Main Wallet Balance */}
                  <div className="flex items-center gap-1.5 text-white">
                    <span className="text-white/80 font-normal">{t('nav.main_wallet')}</span>
                    <span className="font-bold text-sm tracking-wide">৳ {user.walletBalance.toFixed(2)}</span>
                    <button
                      id="header-refresh-balance-btn"
                      onClick={onRefreshBalance}
                      className={`text-[#faa61a] hover:text-amber-300 transition p-0.5 cursor-pointer ${
                        isRefreshingBalance ? 'animate-spin' : ''
                      }`}
                      title="Refresh Balance"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Deposit Button: Exact Golden Yellow from Screenshot 1 */}
                  <button
                    id="header-deposit-btn"
                    onClick={() => onNavigate('deposit')}
                    className="bg-[#faa61a] hover:bg-[#e69512] text-[#111] font-black px-4 py-1.5 rounded-md shadow-xs transition hover:scale-102 flex items-center gap-1 cursor-pointer text-xs uppercase"
                  >
                    {t('nav.deposit')}
                  </button>

                  {/* Logout Button */}
                  <button
                    id="header-logout-btn"
                    onClick={onLogout}
                    className="hover:text-amber-300 text-white font-medium px-2 py-1.5 rounded-md transition flex items-center gap-1 cursor-pointer"
                  >
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <>
                  {/* Logged Out Mode: Exact as Screenshot 4 */}
                  <button
                    id="header-login-btn"
                    onClick={onOpenLogin}
                    className="bg-[#ff5722] hover:bg-[#e64a19] text-white font-bold px-4 py-1.5 rounded-md shadow-xs transition hover:scale-102 cursor-pointer text-xs"
                  >
                    {t('nav.login')}
                  </button>

                  <button
                    id="header-signup-btn"
                    onClick={onOpenSignUp}
                    className="bg-[#245840] hover:bg-[#1d4633] text-white border border-emerald-400/30 font-bold px-4 py-1.5 rounded-md shadow-xs transition hover:scale-102 cursor-pointer text-xs"
                  >
                    {t('nav.signup')}
                  </button>
                </>
              )}

              {/* Language Selector (Triggering Modal from Screenshot 5) */}
              <button
                id="header-language-btn"
                onClick={() => setIsLangModalOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-white hover:bg-white/10 transition cursor-pointer border border-white/20"
              >
                {/* BD Flag Circle */}
                <div className="w-4 h-4 rounded-full bg-emerald-700 flex items-center justify-center overflow-hidden border border-white/40">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                </div>
                <span className="font-medium text-xs">
                  {language === 'bn' ? '৳ BDT Bengali' : '৳ BDT English'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Secondary Navigation Bar: Exact Vibrant Orange from Screenshot 1 & 4 */}
        <nav className="h-[46px] bg-[#ff6500] text-white border-t border-[#ff7a1f]">
          <div className="mx-auto flex h-full w-full items-center px-2">
            <div className="flex h-full w-full items-stretch">
              {/* App Download Cloud Button */}
              <button
                id="nav-app-download-btn"
                onClick={onOpenAppDownload}
                className="flex h-full w-[98px] shrink-0 items-center justify-center border-r border-white/45 text-white transition hover:bg-black/10 cursor-pointer"
                title={t('nav.download_app')}
              >
                <CloudDownload className="w-5 h-5" />
              </button>

              {/* Home Icon */}
              <button
                id="nav-home-btn"
                onClick={() => onNavigate('home')}
                className={`relative flex h-full w-[98px] shrink-0 items-center justify-center border-r border-white/45 transition cursor-pointer ${
                  currentPage === 'home' 
                    ? 'text-white after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-[#ffe600]' 
                    : 'text-white/90 hover:bg-black/10 hover:text-white'
                }`}
                title={t('nav.home')}
              >
                <Home className="w-4 h-4" />
              </button>

              {/* Menu Items with Dropdowns */}
              {navItems.map((item) => {
                const isActive = currentPage === item.page;
                const providers = item.category ? PROVIDERS_BY_CATEGORY[item.category] || [] : [];
                const providerCategory = {
                  slot: 'Slot', cricket: 'Cricket', casino: 'Casino', crash: 'Crash',
                  tablegames: 'Table Games', sportsbook: 'Sports', fishing: 'Fishing',
                }[item.id];
                const providerCards = PROVIDER_CARDS_BY_CATEGORY[providerCategory] || [];

                return (
                  <div
                    key={item.id}
                    className="relative group flex min-w-0 flex-1 border-r border-white/45"
                    onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.id)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      id={`nav-item-${item.id}`}
                      onClick={() => onNavigate(item.page)}
                      className={`relative flex h-full w-full items-center justify-center gap-1 whitespace-nowrap px-1 text-[clamp(11px,1vw,14px)] font-bold tracking-[.01em] transition cursor-pointer ${
                        isActive 
                          ? 'text-white after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-[#ffe600]' 
                          : 'text-white hover:bg-black/10'
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.hasDropdown && (
                        <ChevronDown className="w-3 h-3 text-white/80 group-hover:rotate-180 transition-transform" />
                      )}
                    </button>

                    {/* Dropdown Mega Menu */}
                    {item.hasDropdown && activeDropdown === item.id && providerCards.length > 0 && (
                      <div className="fixed inset-x-0 top-[116px] z-50 min-h-[240px] border-t border-white/80 bg-white/90 px-6 py-3 text-gray-900 shadow-[0_12px_22px_rgba(0,0,0,.22)] backdrop-blur-[2px] animate-fadeIn">
                        <div className="mx-auto max-w-[1190px]">
                        <div className="sr-only">{t('nav.select_provider')}</div>
                        <div className="grid grid-cols-6 gap-x-10 gap-y-5">
                          {providerCards.map((card, providerIndex) => {
                            const prov = providers[providerIndex];
                            return (
                            <button
                              type="button"
                              key={card.id}
                              onClick={() => {
                                if (item.category && prov) onSelectProvider(item.category, prov.code);
                                onNavigate(item.page);
                                setActiveDropdown(null);
                              }}
                              className="group/prov flex min-w-0 cursor-pointer flex-col items-center justify-start text-center"
                            >
                              <div className="relative h-[152px] w-[136px] overflow-hidden rounded-[15px] bg-[#ff6500] shadow-sm ring-1 ring-black/5 transition duration-200 group-hover/prov:-translate-y-0.5 group-hover/prov:shadow-lg group-hover/prov:ring-2 group-hover/prov:ring-[#ff6500]">
                                <img src={card.image} alt={card.title} className="h-full w-full object-cover" />
                              </div>
                              <span className="mt-2 flex max-w-[155px] items-center gap-1 text-[14px] font-extrabold leading-tight text-[#111] group-hover/prov:text-[#ff5a00]">
                                {card.title}
                                {card.isHot && <img src="/hotfave/hot-icon.webp" alt="Hot" className="h-4 w-auto object-contain" />}
                                {card.isNew && <span className="skew-x-[-8deg] bg-[#39dc3c] px-1 py-px text-[10px] font-black italic text-white">NEW</span>}
                              </span>
                            </button>
                          )})}
                        </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </nav>
      </header>

      {/* 3. Language and Currency Modal: Exact from Screenshot 5 */}
      {isLangModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
            {/* Header: Green background #2e694d */}
            <div className="bg-[#2e694d] text-white px-4 py-3 flex items-center justify-between">
              <h3 className="font-bold text-sm">{t('nav.currency_lang')}</h3>
              <button
                onClick={() => setIsLangModalOpen(false)}
                className="p-1 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="flex items-center justify-between gap-4 p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center overflow-hidden shadow-xs border border-white">
                    <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-medium">{t('register.currency')}</span>
                    <p className="font-black text-sm text-gray-800">৳ BDT</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setIsLangModalOpen(false);
                    }}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                      language === 'en'
                        ? 'bg-[#2e694d] text-white shadow-xs'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    English
                  </button>

                  <button
                    onClick={() => {
                      setLanguage('bn');
                      setIsLangModalOpen(false);
                    }}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                      language === 'bn'
                        ? 'bg-[#2e694d] text-white shadow-xs'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    Bengali
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
