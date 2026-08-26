import React, { useState } from 'react';
import { PageType, UserProfile } from '../types';
import { KrikyaLogo } from './KrikyaLogo';
import { useLanguage } from '../context/LanguageContext';
import {
  Flame,
  X,
  Globe
} from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  user: UserProfile;
  isLoggedIn?: boolean;
  onOpenLogin: () => void;
  onOpenSignUp: () => void;
  onLogout: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  user,
  isLoggedIn,
  onOpenLogin,
  onOpenSignUp,
  onLogout,
}) => {
  const { language, setLanguage, t } = useLanguage();
  if (!isOpen) return null;

  const isUserLoggedIn = isLoggedIn ?? user?.isLoggedIn ?? false;

  const handleLinkClick = (page: PageType) => {
    onNavigate(page);
    onClose();
  };

  const DrawerImageIcon = ({ name, alt }: { name: string; alt: string }) => (
    <img
      src={`/sidebar%20icon%20mobilemode/${name}`}
      alt={alt}
      className="h-5 w-5 shrink-0 object-contain"
    />
  );

  /* 
   * Exact custom clean SVG line icons matching Screenshot 4 & 5
   * Color: #ff6a00 (Krikya Orange) with clean stroked outlines
   */

  const HomeIcon = () => (
    <svg className="w-5 h-5 text-[#ff6a00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );

  const PromoIcon = () => (
    <svg className="w-5 h-5 text-[#ff6a00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="16" y1="8" x2="8" y2="16" />
      <circle cx="9.5" cy="9.5" r="1.5" fill="currentColor" />
      <circle cx="14.5" cy="14.5" r="1.5" fill="currentColor" />
    </svg>
  );

  const TrophyIcon = () => (
    <svg className="w-5 h-5 text-[#ff6a00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v3h10v-3c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34" />
      <path d="M6 4h12v5c0 3.31-2.69 6-6 6s-6-2.69-6-6V4z" />
    </svg>
  );

  const StoreIcon = () => (
    <svg className="w-5 h-5 text-[#ff6a00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l1-5h16l1 5" />
      <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
      <path d="M4 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
      <path d="M9 21V13h6v8" />
    </svg>
  );

  const VipCrownIcon = () => (
    <svg className="w-5 h-5 text-[#ff6a00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l2-10 4 5 3-7 3 7 4-5 2 10H3z" />
      <path d="M3 17h18v3H3z" />
    </svg>
  );

  const ReferralIcon = () => (
    <svg className="w-5 h-5 text-[#ff6a00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="6" r="3" />
      <circle cx="5" cy="18" r="2.5" />
      <circle cx="19" cy="18" r="2.5" />
      <path d="M12 9v4m0 0l-5 2.5M12 13l5 2.5" />
    </svg>
  );

  const AffiliateIcon = () => (
    <svg className="w-5 h-5 text-[#ff6a00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="7" rx="8" ry="4" />
      <path d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7" />
      <path d="M4 12c0 2.21 3.58 4 8 4s8-1.79 8-4" />
      <text x="12" y="9" textAnchor="middle" fill="#ff6a00" fontSize="7" fontWeight="bold">৳</text>
    </svg>
  );

  const SlotIcon = () => (
    <svg className="w-5 h-5 text-[#ff6a00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <line x1="7" y1="7" x2="17" y2="7" />
      <line x1="15" y1="7" x2="10" y2="17" />
    </svg>
  );

  const CricketIcon = () => (
    <svg className="w-5 h-5 text-[#ff6a00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20l12-12m0 0l3 3-12 12-3-3z" />
      <line x1="16" y1="8" x2="21" y2="3" />
      <circle cx="19" cy="19" r="2.5" />
    </svg>
  );

  const LiveCasinoIcon = () => (
    <svg className="w-5 h-5 text-[#ff6a00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="11" height="15" rx="1.5" />
      <rect x="10" y="3" width="11" height="15" rx="1.5" />
      <circle cx="15.5" cy="10.5" r="1.5" fill="currentColor" />
    </svg>
  );

  const CrashIcon = () => (
    <svg className="w-5 h-5 text-[#ff6a00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-.5-.1-.9.1-1.2.4l-.8.8 6.5 3.8-3.4 3.4-2.5-.5-.8.8 2.5 1.5 1.5 2.5.8-.8-.5-2.5 3.4-3.4 3.8 6.5.8-.8c.3-.3.5-.7.4-1.2z" />
    </svg>
  );

  const TableGamesIcon = () => (
    <svg className="w-5 h-5 text-[#ff6a00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
      <circle cx="8" cy="16" r="1" fill="currentColor" />
      <circle cx="16" cy="16" r="1" fill="currentColor" />
    </svg>
  );

  const SportsbookIcon = () => (
    <svg className="w-5 h-5 text-[#ff6a00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 0 0 18" />
      <path d="M3 12h18" />
      <path d="M5.5 6.5l13 11" />
      <path d="M5.5 17.5l13-11" />
    </svg>
  );

  const FishingIcon = () => (
    <svg className="w-5 h-5 text-[#ff6a00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 12c-4-4-10-4-14 0 4 4 10 4 14 0z" />
      <path d="M18 12l4-3v6z" />
      <circle cx="8" cy="12" r="1" fill="currentColor" />
    </svg>
  );

  const LiveChatIcon = () => (
    <svg className="w-5 h-5 text-[#ff6a00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <circle cx="8" cy="10" r="1" fill="currentColor" />
      <circle cx="12" cy="10" r="1" fill="currentColor" />
      <circle cx="16" cy="10" r="1" fill="currentColor" />
    </svg>
  );

  const WhatsAppIcon = () => (
    <svg className="w-5 h-5 text-[#ff6a00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );

  const TelegramIcon = () => (
    <svg className="w-5 h-5 text-[#ff6a00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M17 7l-11 5 4 1.5 6-4-4.5 5.5v3l2.5-2 3-9z" />
    </svg>
  );

  const FacebookIcon = () => (
    <svg className="w-5 h-5 text-[#ff6a00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M13.5 8.5H15V6h-2a3 3 0 0 0-3 3v2H8v3h2v7h3.5v-7H16l.5-3h-3v-2a.5.5 0 0 1 .5-.5z" />
    </svg>
  );

  const LogoutIcon = () => (
    <svg className="w-5 h-5 text-[#ff6a00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer Body - Pure White Background with Dark Header matching Screenshot 4 & 5 */}
      <div className="relative z-10 flex h-full w-[280px] max-w-[85%] animate-slideRight flex-col overflow-y-auto bg-white shadow-2xl">
        {/* Drawer Header: Dark Charcoal/Black Bar matching Screenshot 4 */}
        <div className="p-3.5 bg-[#222222] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KrikyaLogo size="sm" variant="white" showText={true} />
          </div>

          {/* Bangladesh Flag & BDT Currency Tag */}
          <div className="flex items-center gap-1.5 bg-[#333333] px-2 py-1 rounded-md text-xs font-bold border border-gray-600/60">
            <div className="w-4 h-4 rounded-full bg-[#006a4e] flex items-center justify-center overflow-hidden shrink-0 border border-white/20">
              <div className="w-2 h-2 rounded-full bg-[#f42a41]"></div>
            </div>
            <span className="text-[11px] text-gray-200 font-mono">৳ BDT</span>
          </div>
        </div>

        {/* Navigation Sections List matching Screenshot 4 & 5 */}
        <div className="flex-1 space-y-4 bg-white px-3 py-2 text-xs font-semibold text-gray-800">
          {/* Main Top Navigation Items */}
          <div className="space-y-1">
            <button
              onClick={() => handleLinkClick('home')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition cursor-pointer ${
                currentPage === 'home' ? 'bg-orange-50/70 text-[#ff6a00] font-bold' : 'hover:bg-gray-50 text-gray-800'
              }`}
            >
              <DrawerImageIcon name="home.png" alt="Home" />
              <span className="text-[13px] font-bold">Home</span>
            </button>

            <button
              onClick={() => handleLinkClick('promotion')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition cursor-pointer ${
                currentPage === 'promotion' ? 'bg-orange-50/70 text-[#ff6a00] font-bold' : 'hover:bg-gray-50 text-gray-800'
              }`}
            >
              <PromoIcon />
              <span className="text-[13px] font-bold">Promotion</span>
            </button>

            <button
              onClick={() => handleLinkClick('krikbet')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition cursor-pointer ${
                currentPage === 'krikbet' ? 'bg-orange-50/70 text-[#ff6a00] font-bold' : 'hover:bg-gray-50 text-gray-800'
              }`}
            >
              <DrawerImageIcon name="krikbet challenge.jpeg" alt="Krikbet Challenge" />
              <span className="text-[13px] font-bold">Krikbet Challenge</span>
            </button>

            <button
              onClick={() => handleLinkClick('reward-store')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition cursor-pointer ${
                currentPage === 'reward-store' ? 'bg-orange-50/70 text-[#ff6a00] font-bold' : 'hover:bg-gray-50 text-gray-800'
              }`}
            >
              <StoreIcon />
              <span className="text-[13px] font-bold">Reward Store</span>
            </button>

            <button
              onClick={() => handleLinkClick('vip')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition cursor-pointer ${
                currentPage === 'vip' ? 'bg-orange-50/70 text-[#ff6a00] font-bold' : 'hover:bg-gray-50 text-gray-800'
              }`}
            >
              <DrawerImageIcon name="viptier.png" alt="VIP" />
              <span className="text-[13px] font-bold">Vip</span>
            </button>
          </div>

          {/* Section: Partner Programs (Matching Screenshot 4) */}
          <div className="pt-2 border-t border-gray-100">
            <h4 className="px-3 pb-1 text-[13px] font-black text-[#ff6a00]">
              Partner Programs
            </h4>
            <div className="space-y-1 mt-1">
              <button
                onClick={() => handleLinkClick('referral-summary')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-gray-50 text-gray-800 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <DrawerImageIcon name="referral.png" alt="Referral" />
                  <span className="text-[13px] font-bold">Referral</span>
                </div>
                {/* Red Glowing "HOT!" Badge matching Screenshot 4 */}
                <span className="rounded bg-red-600 px-1.5 py-0.5 !text-[9px] font-black uppercase italic tracking-wider text-white shadow-xs">
                  HOT!
                </span>
              </button>

              <button
                onClick={() => handleLinkClick('affiliate-apply')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-50 text-gray-800 cursor-pointer"
              >
                <AffiliateIcon />
                <span className="text-[13px] font-bold">Affiliate</span>
              </button>
            </div>
          </div>

          {/* Section: Games (Matching Screenshot 4 & 5) */}
          <div className="pt-2 border-t border-gray-100">
            <h4 className="px-3 pb-1 text-[13px] font-black text-[#ff6a00]">
              Games
            </h4>
            <div className="space-y-1 mt-1">
              <button
                onClick={() => handleLinkClick('slot')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-50 text-gray-800 cursor-pointer"
              >
                <DrawerImageIcon name="rng.png" alt="Slot games" />
                <span className="text-[13px] font-bold">Slot games</span>
              </button>

              <button
                onClick={() => handleLinkClick('cricket')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-50 text-gray-800 cursor-pointer"
              >
                <DrawerImageIcon name="cricket.png" alt="Cricket" />
                <span className="text-[13px] font-bold">Cricket</span>
              </button>

              <button
                onClick={() => handleLinkClick('casino')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-50 text-gray-800 cursor-pointer"
              >
                <DrawerImageIcon name="ld.png" alt="Live casino" />
                <span className="text-[13px] font-bold">Live casino</span>
              </button>

              <button
                onClick={() => handleLinkClick('crash')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-50 text-gray-800 cursor-pointer"
              >
                <DrawerImageIcon name="crash.jpeg" alt="Crash" />
                <span className="text-[13px] font-bold">Crash</span>
              </button>

              <button
                onClick={() => handleLinkClick('tablegames')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-50 text-gray-800 cursor-pointer"
              >
                <DrawerImageIcon name="table.png" alt="Table games" />
                <span className="text-[13px] font-bold">Table Games</span>
              </button>

              <button
                onClick={() => handleLinkClick('sportsbook')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-50 text-gray-800 cursor-pointer"
              >
                <DrawerImageIcon name="sb.png" alt="Sportsbook" />
                <span className="text-[13px] font-bold">Sportsbook</span>
              </button>

              <button
                onClick={() => handleLinkClick('fishing')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-50 text-gray-800 cursor-pointer"
              >
                <DrawerImageIcon name="fishing.png" alt="Fishing" />
                <span className="text-[13px] font-bold">Fishing</span>
              </button>
            </div>
          </div>

          {/* Section: Contact Us (Matching Screenshot 5) */}
          <div className="pt-2 border-t border-gray-100">
            <h4 className="px-3 pb-1 text-[13px] font-black text-[#ff6a00]">
              Contact Us
            </h4>
            <div className="space-y-1 mt-1">
              <button
                onClick={() => {
                  alert('Opening 24/7 Live Chat Support...');
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-50 text-gray-800 cursor-pointer"
              >
                <LiveChatIcon />
                <span className="text-[13px] font-bold">Live Chat</span>
              </button>

              <a
                href="https://wa.me"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-50 text-gray-800 cursor-pointer"
              >
                <WhatsAppIcon />
                <span className="text-[13px] font-bold">WhatsApp</span>
              </a>

              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-50 text-gray-800 cursor-pointer"
              >
                <TelegramIcon />
                <span className="text-[13px] font-bold">Telegram</span>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-50 text-gray-800 cursor-pointer"
              >
                <FacebookIcon />
                <span className="text-[13px] font-bold">Facebook</span>
              </a>
            </div>
          </div>

          {/* Logout button at bottom (Matching Screenshot 5) */}
          <div className="pt-2 pb-6 border-t border-gray-100">
            {isUserLoggedIn ? (
              <button
                onClick={() => { onLogout(); onClose(); }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-red-50 text-gray-800 cursor-pointer font-bold"
              >
                <LogoutIcon />
                <span className="text-[13px] font-bold">Logout</span>
              </button>
            ) : (
              <button
                onClick={() => { onOpenLogin(); onClose(); }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-50 text-gray-800 cursor-pointer font-bold"
              >
                <HomeIcon />
                <span className="text-[13px] font-bold">Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
