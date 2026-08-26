import React from 'react';
import { KrikyaLogo } from './KrikyaLogo';

interface KrikyaLogoSpinnerProps {
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const KrikyaLogoSpinner: React.FC<KrikyaLogoSpinnerProps> = ({ 
  fullScreen = false, 
  size = 'lg',
  text
}) => {
  const containerClass = fullScreen 
    ? 'fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1b1f1d]/76 animate-fadeIn' 
    : 'flex flex-col items-center justify-center p-8';

  const badgeDimensions = {
    sm: 'w-28 h-28',
    md: 'w-36 h-36',
    lg: 'w-[148px] h-[148px]',
  };

  const logoSizes: Record<'sm' | 'md' | 'lg', 'sm' | 'md' | 'lg'> = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
  };

  return (
    <div className={containerClass}>
      {fullScreen && <div className="krikya-loading-progress absolute inset-x-0 top-0 h-[2px] bg-[#18d98b] shadow-[0_0_8px_rgba(24,217,139,.9)]" />}
      {/* Exact Circular Glowing Krikya Loading Badge from Screenshot 4 */}
      <div className="relative flex items-center justify-center">
        {/* Pulsing & Rotating Neon Green Glow Ring */}
        <div 
          className="absolute inset-0 animate-pulse rounded-full bg-[#19d98a]/20 blur-xl"
          style={{ transform: 'scale(1.15)' }}
        ></div>

        {/* Outer Circular Container */}
        <div 
          className={`${badgeDimensions[size]} relative flex items-center justify-center rounded-full border-2 border-[#1ed58b] bg-[#1d2925] shadow-[0_0_22px_rgba(30,213,139,.72),inset_0_0_18px_rgba(30,213,139,.12)]`}
        >
          {/* Subtle spinning glow accent line */}
          <div className="absolute inset-[-2px] animate-spin rounded-full border-2 border-transparent border-r-[#70f1bd] border-t-[#70f1bd]"></div>

          {/* Centered Krikya Logo & Branding */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4">
            <KrikyaLogo size={logoSizes[size]} variant="white" showText={true} />
          </div>
        </div>
      </div>

      {text && (
        <p className="mt-4 text-xs sm:text-sm font-bold tracking-wider text-emerald-300 uppercase animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};
