import React from 'react';
import { PageType, UserProfile } from '../types';
import { KrikyaLogo } from './KrikyaLogo';
import { Menu, MessagesSquare } from 'lucide-react';

interface MobileHeaderProps {
  currentPage?: PageType;
  onNavigate: (page: PageType) => void;
  user: UserProfile;
  isLoggedIn?: boolean;
  onToggleDrawer?: () => void;
  onOpenDrawer?: () => void;
  onOpenLogin: () => void;
  onOpenSignUp: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onNavigate, onToggleDrawer, onOpenDrawer }) => {
  const handleDrawerToggle = onToggleDrawer || onOpenDrawer || (() => {});

  return (
    <header className="sticky top-0 z-40 flex h-[46px] items-center justify-between border-b border-[#238865] bg-[linear-gradient(180deg,#5fc59d_0%,#3da97f_100%)] px-3 text-white shadow-sm lg:hidden">
      <button id="mobile-drawer-toggle-btn" onClick={handleDrawerToggle} className="flex h-8 w-8 cursor-pointer items-center justify-center" aria-label="Open menu">
        <Menu className="h-[18px] w-[18px]" strokeWidth={2} />
      </button>
      <button onClick={() => onNavigate('home')} className="absolute left-1/2 -translate-x-1/2 cursor-pointer">
        <KrikyaLogo size="sm" variant="white" showText className="gap-1 [&_svg]:h-6 [&_svg]:w-7 [&_span]:text-[18px] [&_span]:font-black [&_span]:text-white" />
      </button>
      <button onClick={() => onNavigate('inbox-messages')} className="relative flex h-8 w-8 cursor-pointer items-center justify-center" aria-label="Messages">
        <MessagesSquare className="h-[21px] w-[21px]" strokeWidth={1.6} />
        <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[#ff5a00]" />
      </button>
    </header>
  );
};
