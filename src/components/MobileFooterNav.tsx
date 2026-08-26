import React from 'react';
import { PageType, UserProfile } from '../types';
import { Home, Flame, Wallet, User, FileSpreadsheet } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MobileFooterNavProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  user?: UserProfile;
  isLoggedIn?: boolean;
  onOpenLogin?: () => void;
  onOpenSignUp?: () => void;
}

export const MobileFooterNav: React.FC<MobileFooterNavProps> = ({
  currentPage,
  onNavigate,
  user,
  isLoggedIn = false,
  onOpenLogin = () => {},
  onOpenSignUp = () => {},
}) => {
  const { language, setLanguage, t } = useLanguage();
  const isUserLoggedIn = isLoggedIn ?? user?.isLoggedIn ?? false;

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      page: 'home' as PageType,
      icon: Home,
    },
    {
      id: 'promotion',
      label: 'Promotion',
      page: 'promotion' as PageType,
      icon: Flame,
    },
    {
      id: 'deposit',
      label: 'Deposit',
      page: 'deposit' as PageType,
      icon: Wallet,
      isSpecial: true,
    },
    {
      id: 'referral',
      label: 'Inbox',
      page: 'inbox-messages' as PageType,
      icon: FileSpreadsheet,
    },
    {
      id: 'account',
      label: 'Profile',
      page: 'profile-hub' as PageType,
      icon: User,
      requiresAuth: true,
    },
  ];

  if (!isUserLoggedIn) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 flex h-[calc(52px+env(safe-area-inset-bottom))] border-t border-[#d9d9d9] bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_8px_rgba(0,0,0,.18)] lg:hidden">
        <div className="flex w-[34%] items-center justify-center gap-1 px-1 text-[#1f1f1f]" aria-label="Language and currency">
          <span className="h-4 w-4 shrink-0 rounded-full border-[4px] border-[#008f72] bg-[#ef3340]" />
          <span className="mr-0.5 text-[8px] font-black">৳ BDT</span>
          <button
            type="button"
            onClick={() => setLanguage('bn')}
            aria-pressed={language === 'bn'}
            className={`h-7 px-1 text-[9px] font-black transition ${language === 'bn' ? 'bg-[#2d9d78] text-white' : 'bg-[#ededed] text-[#555]'}`}
          >
            বাংলা
          </button>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            aria-pressed={language === 'en'}
            className={`h-7 px-1.5 text-[9px] font-black transition ${language === 'en' ? 'bg-[#2d9d78] text-white' : 'bg-[#ededed] text-[#555]'}`}
          >
            EN
          </button>
        </div>
        <button
          type="button"
          onClick={onOpenLogin}
          className="flex w-[33%] items-center justify-center bg-[#45b98e] text-[12px] font-extrabold text-white transition active:brightness-95"
        >
          {t('nav.login')}
        </button>
        <button
          type="button"
          onClick={onOpenSignUp}
          className="flex w-[33%] items-center justify-center bg-[#ff5a00] text-[12px] font-extrabold text-white transition active:brightness-95"
        >
          {t('nav.signup')}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex h-[48px] items-center justify-around border-t border-[#83d4b4] bg-[#45b98e] px-1 text-white shadow-[0_-2px_8px_rgba(0,0,0,.18)] lg:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.page;

        if (item.isSpecial) {
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.page)}
              className="flex flex-col items-center justify-center -mt-5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[#45b98e] text-white shadow-md transition active:scale-95">
                <Icon className="h-6 w-6" />
              </div>
              <span className="mt-0.5 text-[9px] font-bold text-white">
                {item.label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => {
              if (item.requiresAuth && !isUserLoggedIn) {
                onOpenLogin();
              } else {
                onNavigate(item.page);
              }
            }}
            className={`flex flex-1 flex-col items-center justify-center py-1 text-white transition ${
              isActive ? 'font-bold' : 'text-white/90'
            }`}
          >
            <Icon className="h-5 w-5 text-white" />
            <span className="mt-0.5 text-[9px] font-semibold leading-none">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
