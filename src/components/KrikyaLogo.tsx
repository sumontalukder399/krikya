import React from 'react';

interface KrikyaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'white' | 'dark' | 'green';
}

export const KrikyaLogo: React.FC<KrikyaLogoProps> = ({ 
  className = '', 
  size = 'md', 
  showText = true,
  variant = 'white'
}) => {
  const iconDimensions = {
    sm: 'w-6 h-5',
    md: 'w-8 h-7',
    lg: 'w-10 h-9',
    xl: 'w-16 h-14',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl',
  };

  const textColorClass = 
    variant === 'white' 
      ? 'text-white' 
      : variant === 'green' 
        ? 'text-[#2e694d]' 
        : 'text-gray-900';

  return (
    <div className={`inline-flex items-center gap-2 font-black tracking-wider select-none cursor-pointer ${className}`}>
      {/* Exact Krikya 3-Blade Geometric Orange/Yellow Angled Wings */}
      <svg 
        viewBox="0 0 48 36" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={`${iconDimensions[size]} shrink-0 drop-shadow-sm`}
      >
        {/* Blade 1 (Left - Darker Orange) */}
        <polygon 
          points="6,34 16,34 26,4 16,4" 
          fill="url(#krikya-grad-1)" 
        />
        {/* Blade 2 (Center - Bright Orange) */}
        <polygon 
          points="18,34 28,34 38,4 28,4" 
          fill="url(#krikya-grad-2)" 
        />
        {/* Blade 3 (Right - Golden Yellow) */}
        <polygon 
          points="30,34 40,34 46,12 36,12" 
          fill="url(#krikya-grad-3)" 
        />

        <defs>
          <linearGradient id="krikya-grad-1" x1="6" y1="34" x2="26" y2="4" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e64a19" />
            <stop offset="100%" stopColor="#ff5722" />
          </linearGradient>
          <linearGradient id="krikya-grad-2" x1="18" y1="34" x2="38" y2="4" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff5722" />
            <stop offset="100%" stopColor="#ff9800" />
          </linearGradient>
          <linearGradient id="krikya-grad-3" x1="30" y1="34" x2="46" y2="12" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff9800" />
            <stop offset="100%" stopColor="#ffc107" />
          </linearGradient>
        </defs>
      </svg>
      
      {showText && (
        <span className={`font-black uppercase tracking-tight font-sans ${textSizes[size]} ${textColorClass}`}>
          KRIKYA
        </span>
      )}
    </div>
  );
};

