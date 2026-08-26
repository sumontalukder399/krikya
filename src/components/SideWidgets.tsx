import React from 'react';
import { Coins } from 'lucide-react';

interface SideWidgetsProps {
  onOpenFreeCoins?: () => void;
  onOpenDailyCheckIn?: () => void;
  onToggleChat?: () => void;
  onOpenLiveChat?: () => void;
  isChatOpen?: boolean;
}

export const SideWidgets: React.FC<SideWidgetsProps> = ({
  onOpenFreeCoins,
  onOpenDailyCheckIn,
  onToggleChat,
  onOpenLiveChat,
}) => {
  const handleFreeCoins = onOpenFreeCoins || onOpenDailyCheckIn || (() => {});
  const handleChat = onToggleChat || onOpenLiveChat || (() => {});

  return (
    <>
      <button
        id="sticky-free-coins-btn"
        onClick={handleFreeCoins}
        className="fixed left-0 top-[48%] z-30 flex h-[104px] w-[26px] -translate-y-1/2 cursor-pointer flex-col items-center gap-1 bg-[#5fc29b] pt-2 text-white shadow-md transition hover:bg-[#55b58f] lg:top-1/2 lg:h-[160px] lg:w-[40px] lg:gap-2 lg:pt-4"
        title="Get Free Coins Daily"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#fff0a5] bg-[#ffb400] text-[#fff7c7] shadow-[0_0_3px_rgba(0,0,0,.35)]">
          <Coins className="h-4 w-4" />
        </span>
        <span className="text-[10px] font-extrabold uppercase tracking-[.01em] text-white lg:text-[15px] lg:tracking-[.02em]" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          FREE COINS
        </span>
      </button>

      <button
        id="sticky-contact-us-btn"
        onClick={handleChat}
        className="fixed right-0 top-1/2 z-30 hidden h-[128px] w-[40px] -translate-y-1/2 cursor-pointer items-center justify-center bg-[#f5661b] text-white shadow-md transition hover:bg-[#e95b12] lg:flex"
        title="Contact 24/7 Support"
      >
        <span className="text-[15px] font-extrabold uppercase tracking-[.02em] text-white" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          CONTACT US
        </span>
      </button>
    </>
  );
};
