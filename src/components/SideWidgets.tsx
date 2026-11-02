import React from 'react';

export const SideWidgets: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => (
  <button
    id="sticky-contact-us-btn"
    onClick={onOpenContact}
    className="fixed right-0 top-1/2 z-30 hidden h-[128px] w-[40px] -translate-y-1/2 cursor-pointer items-center justify-center bg-[#f5661b] text-white shadow-md transition hover:bg-[#e95b12] lg:flex"
    title="Contact Support"
  >
    <span className="text-[15px] font-extrabold uppercase tracking-[.02em] text-white" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
      CONTACT US
    </span>
  </button>
);
