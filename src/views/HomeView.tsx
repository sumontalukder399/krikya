import React, { useState, useEffect, useRef } from 'react';
import { PageType, UserProfile } from '../types';
import { 
  MOCK_LIVE_WINNERS, 
  MOCK_CRICKET_MATCHES,
  MOCK_SLOT_GAMES,
  MOCK_CASINO_GAMES,
  MOCK_CRASH_GAMES,
  MOCK_TABLE_GAMES,
  PROVIDERS_BY_CATEGORY 
} from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { 
  Volume2, 
  Flame, 
  ChevronRight, 
  ChevronLeft, 
  ChevronDown,
  Share2,
  QrCode,
  ArrowRight,
  Copy,
  Check,
  Megaphone,
  Gift
} from 'lucide-react';
import { KrikyaLogoSpinner } from '../components/KrikyaLogoSpinner';
import { ReferralProgram } from '../components/ReferralProgram';
import { PROVIDER_CARDS_BY_CATEGORY } from '../data/providerCatalog';

interface HomeViewProps {
  onNavigate: (page: PageType) => void;
  user: UserProfile;
  onOpenSignUp: () => void;
  onOpenLogin: () => void;
}

const MOBILE_HOT_GAMES = [
  { id: 'hot-aviator', title: 'Aviator', image: '/mobilevewHot/687f2f1323d94.webp', isHot: true },
  { id: 'hot-exchange', title: 'Exchange', image: providerImage('WhatsApp Image 2026-08-25 at 1.03.23 AM (1).jpeg'), isHot: true },
  { id: 'hot-high-flyer', title: 'Krikya High Flyer', image: providerImage('WhatsApp Image 2026-08-25 at 1.03.27 AM (3).jpeg'), isHot: true },
  { id: 'hot-money', title: 'Money Coming', image: '/mobilevewHot/51_0.webp', isHot: true },
  { id: 'hot-crazy-time', title: 'Crazy Time (20,000x)', image: '/mobilevewHot/thumb.png', isHot: true },
  { id: 'hot-lightning', title: 'Lightning Roulette', image: '/mobilevewHot/thumb.webp', isHot: true },
  { id: 'hot-super-ace', title: 'Super Ace', image: '/mobilevewHot/49_0.webp', isHot: true },
  { id: 'hot-boxing', title: 'Boxing King', image: '/mobilevewHot/64e6c8f343a89.png', isHot: true },
  { id: 'hot-funky-time', title: 'Evo Funky Time', image: providerImage('WhatsApp Image 2026-08-25 at 1.03.24 AM (1).jpeg'), isHot: true },
  { id: 'hot-olympus', title: 'Gates of Olympus POP', image: '/mobilevewHot/6a677668d3a33.webp', isHot: true },
  { id: 'hot-fortune', title: 'Fortune Gems 500', image: '/mobilevewHot/6891f7e784044.webp', isHot: true },
  { id: 'hot-sicbo', title: 'Sic Bo', image: '/mobilevewHot/125_0.webp', isHot: true },
];

function providerImage(file: string) { return `/game%20proveider/${encodeURIComponent(file)}`; }

const MOBILE_PROVIDER_GAMES = PROVIDER_CARDS_BY_CATEGORY;
/*
  Slot: [
    provider('jili', 'JILI', 'WhatsApp Image 2026-08-25 at 1.03.29 AM (1).jpeg'),
    provider('pragmatic', 'Pragmatic', 'WhatsApp Image 2026-08-25 at 1.03.20 AM (2).jpeg'),
    provider('pp-pop', 'PP POP', 'WhatsApp Image 2026-08-25 at 1.03.30 AM (1).jpeg'),
    provider('pg-soft', 'PG Soft', 'WhatsApp Image 2026-08-25 at 1.03.28 AM (3).jpeg'),
    provider('playtech', 'PT', 'WhatsApp Image 2026-08-25 at 1.03.30 AM.jpeg', true),
    provider('netent', 'NetEnt', 'WhatsApp Image 2026-08-25 at 1.03.22 AM.jpeg'),
    provider('booongo', 'Booongo', 'WhatsApp Image 2026-08-25 at 1.03.29 AM (2).jpeg'),
    provider('jdb', 'JDB', 'WhatsApp Image 2026-08-25 at 1.03.31 AM (1).jpeg'),
    provider('spade', 'Spade', 'WhatsApp Image 2026-08-25 at 1.03.23 AM.jpeg'),
    provider('red-tiger', 'Red Tiger', 'WhatsApp Image 2026-08-25 at 1.03.19 AM.jpeg'),
    provider('playngo', "Play N'GO", 'WhatsApp Image 2026-08-25 at 1.03.18 AM (1).jpeg'),
    provider('fachai', 'Fa Chai', 'WhatsApp Image 2026-08-25 at 1.03.30 AM (2).jpeg'),
    provider('microgaming', 'Microgaming', 'WhatsApp Image 2026-08-25 at 1.03.20 AM.jpeg'),
  ],
  Cricket: [
    provider('betswiz', 'BetSwiz', 'betswiz.webp'),
    provider('9wicket', '9Wicket', 'wicketspro.webp'),
  ],
  Casino: [
    provider('casino-pragmatic', 'Pragmatic', 'WhatsApp Image 2026-08-25 at 1.03.20 AM (2).jpeg'),
    provider('evolution', 'Evolution', 'WhatsApp Image 2026-08-25 at 1.03.23 AM (1).jpeg'),
    provider('ezugi', 'Ezugi', 'WhatsApp Image 2026-08-25 at 1.03.32 AM (2).jpeg'),
    provider('casino-playtech', 'PT', 'WhatsApp Image 2026-08-25 at 1.03.25 AM.jpeg', true),
    provider('casino-netent', 'NetEnt', 'WhatsApp Image 2026-08-25 at 1.03.24 AM.jpeg'),
    provider('sexy', 'Sexy Casino', 'WhatsApp Image 2026-08-25 at 1.03.33 AM.jpeg'),
  ],
  Crash: [
    provider('crash-pragmatic', 'Pragmatic', 'WhatsApp Image 2026-08-25 at 1.03.19 AM (1).jpeg'),
    provider('aviator', 'Aviator Studio', 'WhatsApp Image 2026-08-25 at 1.03.27 AM (3).jpeg'),
    provider('crash-evolution', 'Evolution', 'WhatsApp Image 2026-08-25 at 1.03.23 AM (1).jpeg'),
    provider('spribe', 'Spribe', 'WhatsApp Image 2026-08-25 at 1.03.21 AM (1).jpeg'),
    provider('crash-jili', 'JILI', 'WhatsApp Image 2026-08-25 at 1.03.20 AM (1).jpeg'),
    provider('aviatrix', 'Aviatrix', 'WhatsApp Image 2026-08-25 at 1.03.31 AM.jpeg', true),
    provider('crash-jdb', 'JDB', 'WhatsApp Image 2026-08-25 at 1.03.31 AM (1).jpeg', true),
    provider('smartsoft', 'Smart', 'WhatsApp Image 2026-08-25 at 1.03.21 AM.jpeg'),
    provider('crash-microgaming', 'Microgaming', 'WhatsApp Image 2026-08-25 at 1.03.29 AM.jpeg'),
  ],
  'Table Games': [
    provider('table-jili', 'JILI', 'WhatsApp Image 2026-08-25 at 1.03.29 AM (1).jpeg'),
    provider('table-pp', 'PP', 'WhatsApp Image 2026-08-25 at 1.03.32 AM.jpeg'),
    provider('table-spribe', 'Spribe', 'WhatsApp Image 2026-08-25 at 1.03.33 AM (1).jpeg'),
    provider('table-playtech', 'PT', 'WhatsApp Image 2026-08-25 at 1.03.32 AM (1).jpeg', true),
    provider('table-netent', 'NetEnt', 'WhatsApp Image 2026-08-25 at 1.03.33 AM (2).jpeg'),
    provider('table-king-midas', 'AE King Midas', 'WhatsApp Image 2026-08-25 at 1.03.19 AM (2).jpeg'),
    provider('table-jdb', 'JDB', 'WhatsApp Image 2026-08-25 at 1.03.22 AM (2).jpeg'),
    provider('table-red-tiger', 'Red Tiger', 'WhatsApp Image 2026-08-25 at 1.03.28 AM (1).jpeg'),
  ],
  Sports: [
    provider('sports-betswiz', 'BetSwiz', 'betswiz.webp'),
    provider('sports-9wicket', '9Wicket', 'wicketspro.webp'),
  ],
  Fishing: [
    provider('fishing-jili', 'JILI', 'WhatsApp Image 2026-08-25 at 1.03.29 AM (1).jpeg'),
    provider('fishing-spade', 'Spadegame', 'WhatsApp Image 2026-08-25 at 1.03.23 AM.jpeg'),
  ],
}; */

const MOBILE_CATEGORY_PAGES: Record<string, PageType> = {
  Games: 'slot', Slot: 'slot', Cricket: 'cricket', Casino: 'casino', Crash: 'crash',
  'Table Games': 'tablegames', Sports: 'sportsbook', Fishing: 'fishing',
};

const WINNER_CATEGORY_PAGES: Record<'SLOTS' | 'CASINO' | 'CRASH' | 'TABLE', PageType> = {
  SLOTS: 'slot', CASINO: 'casino', CRASH: 'crash', TABLE: 'tablegames',
};

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  user,
  onOpenSignUp,
  onOpenLogin,
}) => {
  const { language, t } = useLanguage();

  // Hero Carousel Banners
  const banners = [
    {
      id: 1,
      tag: language === 'bn' ? '— দেশি KRIKYA, বেশি জয়!' : '— Deshi KRIKYA, Beshi Joy!',
      title: language === 'bn' ? 'CPL Top 50 Challenge' : 'CPL Top 50 Challenge',
      subTitle: language === 'bn' ? '৳৮৮৭,০০০ প্রাইজ পুল' : '৳887,000 Prize Pool',
      cta: language === 'bn' ? 'চ্যালেঞ্জে যোগ দিন' : 'Join Challenge',
      bgColor: 'from-[#072a1a] via-[#0e5332] to-[#146b41]',
      accentColor: 'text-[#ffb700]',
      action: () => onNavigate('krikbet'),
      badge: 'TOP 50 CHALLENGE',
      image: '/banners/cricket-gold.png',
      align: 'left',
    },
    {
      id: 2,
      tag: language === 'bn' ? 'KRIKYA সাপ্তাহিক আয় অফার!' : 'KRIKYA Weekly Income Offer!',
      title: language === 'bn' ? 'আমরা শর্ত কমিয়েছি। আর বোনাস বাড়িয়েছি।' : 'Lower Wagering. Higher Cash Bonuses.',
      subTitle: language === 'bn' ? 'সাপ্তাহিক লাইফটাইম ক্যাশব্যাক ও কমিশন' : 'Weekly Lifetime Cashback & Rev-share',
      cta: language === 'bn' ? 'এখনই শেয়ার করুন' : 'Share Now',
      bgColor: 'from-[#041d12] via-[#094127] to-[#d95204]',
      accentColor: 'text-amber-300',
      action: () => onNavigate('referral-summary'),
      badge: 'WEEKLY PAYOUT',
      image: '/banners/casino-gold.png',
      align: 'right',
    },
    {
      id: 3,
      tag: 'SPECIAL BONUS EVENT',
      title: 'DEPOSIT WITH BKASH / NAGAD / USDT',
      subTitle: language === 'bn' ? '৮% আনলিমিটেড ইন্সট্যান্ট ক্যাশ বোনাস প্রতি ডিপোজিটে!' : '8% Unlimited Instant Cash on Every Deposit!',
      cta: language === 'bn' ? 'ডিপোজিট করুন' : 'Deposit Now',
      bgColor: 'from-[#170a2a] via-[#3b1261] to-[#7e22ce]',
      accentColor: 'text-amber-300',
      action: () => onNavigate('deposit'),
      badge: 'INSTANT BONUS',
      image: '/banners/deposit-bonus.png',
      align: 'right',
    },
  ];

  const [activeBanner, setActiveBanner] = useState(0);
  const [winnerTab, setWinnerTab] = useState<'SLOTS' | 'CASINO' | 'CRASH' | 'TABLE'>('SLOTS');
  const [isGameLoading, setIsGameLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const [mobileQuickCategory, setMobileQuickCategory] = useState('Games');
  const [showMoreMobileGames, setShowMoreMobileGames] = useState(false);

  const activeMobileGames = mobileQuickCategory === 'Games'
    ? MOBILE_HOT_GAMES
    : MOBILE_PROVIDER_GAMES[mobileQuickCategory as keyof typeof MOBILE_PROVIDER_GAMES];

  const winnerTitlesByCategory = {
    SLOTS: ['Super Ace', 'Boxing King', 'Fortune Gems', 'Crazy777', 'Ali Baba', 'Money Coming'],
    CASINO: ['Lightning Sic Bo', 'Ice Fishing', 'Speed Super Sic Bo', 'Evo Funky Time', 'Crazy Balls', 'Roulette Live'],
    CRASH: ['Aviator', 'Krikya High Flyer', 'JetX', 'Crash Goal', 'Money Coming', 'Space XY'],
    TABLE: ['Dragon Tiger', 'Teen Patti', 'Andar Bahar', 'Sic Bo', 'Blackjack', 'Baccarat'],
  } as const;
  const winnerImagesByCategory = {
    SLOTS: [
      providerImage('WhatsApp Image 2026-08-25 at 1.03.28 AM (2).jpeg'),
      providerImage('WhatsApp Image 2026-08-25 at 1.03.25 AM (2).jpeg'),
      providerImage('WhatsApp Image 2026-08-25 at 1.03.27 AM (2).jpeg'),
      '/mobilevewHot/thumb.png',
      '/mobilevewHot/6a677668d3a33.webp',
      providerImage('WhatsApp Image 2026-08-25 at 1.03.26 AM.jpeg'),
    ],
    CASINO: [
      '/mobilevewHot/thumb.webp',
      providerImage('WhatsApp Image 2026-08-25 at 1.03.23 AM (2).jpeg'),
      '/mobilevewHot/125_0.webp',
      providerImage('WhatsApp Image 2026-08-25 at 1.03.24 AM (1).jpeg'),
      providerImage('WhatsApp Image 2026-08-25 at 1.03.27 AM (1).jpeg'),
      providerImage('WhatsApp Image 2026-08-25 at 1.03.32 AM.jpeg'),
    ],
    CRASH: [
      '/mobilevewHot/687f2f1323d94.webp',
      providerImage('WhatsApp Image 2026-08-25 at 1.03.27 AM (3).jpeg'),
      providerImage('WhatsApp Image 2026-08-25 at 1.03.31 AM.jpeg'),
      providerImage('WhatsApp Image 2026-08-25 at 1.03.21 AM (1).jpeg'),
      '/mobilevewHot/51_0.webp',
      providerImage('WhatsApp Image 2026-08-25 at 1.03.30 AM (2).jpeg'),
    ],
    TABLE: [
      providerImage('WhatsApp Image 2026-08-25 at 1.03.29 AM (1).jpeg'),
      providerImage('WhatsApp Image 2026-08-25 at 1.03.32 AM.jpeg'),
      providerImage('WhatsApp Image 2026-08-25 at 1.03.33 AM (1).jpeg'),
      providerImage('WhatsApp Image 2026-08-25 at 1.03.23 AM (2).jpeg'),
      providerImage('WhatsApp Image 2026-08-25 at 1.03.32 AM (1).jpeg'),
      providerImage('WhatsApp Image 2026-08-25 at 1.03.33 AM (2).jpeg'),
    ],
  } as const;
  const activeWinnerGames = MOCK_LIVE_WINNERS.map((winner, index) => ({
    ...winner,
    id: `${winnerTab.toLowerCase()}-${winner.id}`,
    category: winnerTab,
    gameTitle: winnerTitlesByCategory[winnerTab][index % winnerTitlesByCategory[winnerTab].length],
    gameImage: winnerImagesByCategory[winnerTab][index % winnerImagesByCategory[winnerTab].length],
  }));
  
  const winnersScrollRef = useRef<HTMLDivElement>(null);
  const cricketScrollRef = useRef<HTMLDivElement>(null);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(user.referralCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1800);
  };

  // Auto rotate top banners
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  // Smooth Automatic Scroll to the Right for Real-Time Winners (as requested by user!)
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    let scrollPosition = winnersScrollRef.current?.scrollLeft ?? 0;

    const smoothScroll = (currentTime: number) => {
      if (winnersScrollRef.current && !isAutoScrollPaused) {
        const delta = (currentTime - lastTime) / 1000;
        // Keep our own sub-pixel position. Some mobile browsers round tiny
        // scrollLeft increments, which otherwise makes the track look frozen.
        scrollPosition += 28 * delta;

        // The content is duplicated. Rewind by exactly one copy so the loop
        // continues at the same visual position without a visible jump.
        const oneCopyWidth = winnersScrollRef.current.scrollWidth / 2;
        if (scrollPosition >= oneCopyWidth) {
          scrollPosition -= oneCopyWidth;
        }
        winnersScrollRef.current.scrollLeft = scrollPosition;
      } else if (winnersScrollRef.current) {
        scrollPosition = winnersScrollRef.current.scrollLeft;
      }
      lastTime = currentTime;
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    animationFrameId = requestAnimationFrame(smoothScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoScrollPaused, winnerTab]);

  useEffect(() => {
    if (winnersScrollRef.current) winnersScrollRef.current.scrollLeft = 0;
  }, [winnerTab]);


  const handleGameLaunch = (category: PageType) => {
    setIsGameLoading(true);
    setTimeout(() => {
      setIsGameLoading(false);
      onNavigate(category);
    }, 1000);
  };

  const scrollWinners = (direction: 'left' | 'right') => {
    if (winnersScrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      winnersScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollCricket = (direction: 'left' | 'right') => {
    if (cricketScrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      cricketScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Team Logo Emblem Helper
  const getTeamIcon = (name: string, fallback: string) => {
    if (name.includes('Falcons')) {
      return (
        <div className="w-12 h-12 rounded-full bg-[#1b0826] border-2 border-purple-500/60 p-1 flex items-center justify-center shadow-lg">
          <span className="text-xl">🦅</span>
        </div>
      );
    }
    if (name.includes('Knight Riders')) {
      return (
        <div className="w-12 h-12 rounded-full bg-[#2a1348] border-2 border-amber-400/80 p-1 flex items-center justify-center shadow-lg">
          <span className="text-xl">🛡️</span>
        </div>
      );
    }
    if (name.includes('Sri Lanka')) {
      return (
        <div className="w-12 h-12 rounded-full bg-amber-600 border-2 border-amber-300 overflow-hidden flex items-center justify-center shadow-lg text-lg">
          🦁
        </div>
      );
    }
    if (name.includes('India')) {
      return (
        <div className="w-12 h-12 rounded-full bg-blue-600 border-2 border-blue-300 overflow-hidden flex items-center justify-center shadow-lg text-lg">
          🇮🇳
        </div>
      );
    }
    if (name.includes('Queens')) {
      return (
        <div className="w-12 h-12 rounded-full bg-pink-700 border-2 border-pink-400 p-1 flex items-center justify-center shadow-lg">
          <span className="text-xl">👑</span>
        </div>
      );
    }
    return (
      <div className="w-12 h-12 rounded-full bg-emerald-800 border-2 border-emerald-400 flex items-center justify-center text-xl shadow-lg">
        {fallback || '🏏'}
      </div>
    );
  };

  return (
    <div className="space-y-0 pb-20 animate-fadeIn lg:space-y-6 lg:pb-6">
      {/* Loading Overlay */}
      {isGameLoading && (
        <KrikyaLogoSpinner fullScreen={true} text={language === 'bn' ? 'গেম লবিতে যুক্ত করা হচ্ছে...' : 'Connecting to Game Lobby...'} />
      )}

      {/* Top Banner Carousel */}
      <section className="relative w-full overflow-hidden bg-[#0d6848] px-5 sm:bg-transparent sm:px-0">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 z-20 h-[10px] sm:hidden">
          <span className="block h-[5px] bg-gradient-to-r from-[#16835f] via-[#45b78d] to-[#16835f] shadow-[inset_0_-1px_rgba(0,0,0,.22)]" />
          <span className="block h-[5px] bg-gradient-to-r from-[#075d43] via-[#23956f] to-[#075d43] shadow-[inset_0_1px_rgba(255,255,255,.18)]" />
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 top-[10px] w-6 bg-cover bg-center opacity-55 blur-[1px] transition-all duration-700 sm:hidden"
          style={{ backgroundImage: `url(${banners[(activeBanner - 1 + banners.length) % banners.length].image})` }}
        />
        <div className="pointer-events-none absolute bottom-0 left-0 top-[10px] z-[1] w-6 bg-gradient-to-r from-white/15 via-emerald-950/10 to-black/35 backdrop-blur-[1px] sm:hidden" />
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0 top-[10px] w-6 bg-cover bg-center opacity-55 blur-[1px] transition-all duration-700 sm:hidden"
          style={{ backgroundImage: `url(${banners[(activeBanner + 1) % banners.length].image})` }}
        />
        <div className="pointer-events-none absolute bottom-0 right-0 top-[10px] z-[1] w-6 bg-gradient-to-l from-white/15 via-emerald-950/10 to-black/35 backdrop-blur-[1px] sm:hidden" />
        <div className="relative z-10 mt-[10px] h-[130px] overflow-hidden rounded-[10px] bg-black shadow-xl sm:mt-0 sm:h-[340px] sm:rounded-none lg:h-[420px]">
          {banners.map((b, idx) => (
            <div
              key={b.id}
              className={`absolute inset-0 text-white transition-all duration-700 ${
                idx === activeBanner 
                  ? 'opacity-100 scale-100 z-10' 
                  : 'opacity-0 scale-95 z-0 pointer-events-none'
              }`}
            >
              <img src={b.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className={`absolute inset-0 ${b.align === 'right' ? 'bg-gradient-to-r from-transparent via-black/10 to-black/90' : 'bg-gradient-to-r from-black/85 via-black/20 to-transparent'}`}></div>

              <div className={`absolute inset-0 z-10 mx-auto hidden w-full max-w-[1240px] flex-col justify-center px-12 sm:flex sm:px-16 lg:px-20 ${b.align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
                <div className="max-w-[590px]">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-black tracking-wider text-white uppercase mb-2 border border-white/20">
                  <Flame className="w-3.5 h-3.5 text-[#ff5a00] animate-bounce" />
                  <span>{b.tag}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.98] uppercase drop-shadow-[0_3px_2px_rgba(0,0,0,.8)]">
                  {b.title}
                </h1>

                {b.subTitle && (
                  <p className="mt-1 text-sm sm:text-lg font-bold text-amber-300 drop-shadow-xs">
                    {b.subTitle}
                  </p>
                )}

                <div className="mt-3 sm:mt-5">
                  <button
                    onClick={b.action}
                    className="bg-[#ff5a00] hover:bg-[#e04f00] text-white font-black px-5 py-2.5 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 text-xs sm:text-sm flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                  >
                    <span>{b.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-4 text-[10px] sm:text-xs font-black tracking-[.2em] text-amber-300">{b.badge}</div>
                </div>
              </div>

              <div className="hidden z-10 items-center justify-between text-xs text-emerald-200">
                <span className="font-bold tracking-widest text-amber-300">{b.badge}</span>
                <span className="text-[11px] opacity-90 font-semibold">
                  {language === 'bn' ? '— দেশি KRIKYA, বেশি জয়!' : '— Deshi KRIKYA, Beshi Joy!'}
                </span>
              </div>
            </div>
          ))}

          {/* Carousel Arrows */}
          <button
            onClick={() => setActiveBanner((prev) => (prev - 1 + banners.length) % banners.length)}
            className="absolute left-3 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition hover:bg-black/70 sm:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveBanner((prev) => (prev + 1) % banners.length)}
            className="absolute right-3 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition hover:bg-black/70 sm:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Mobile carousel rail and dark lower edge */}
          <div className="absolute inset-x-0 bottom-0 z-[15] h-[14px] border-b-2 border-[#06372a] bg-[#287f63] shadow-[inset_0_1px_rgba(255,255,255,.12)] sm:hidden" />

          {/* Carousel Dots */}
          <div className="absolute bottom-[6px] left-1/2 z-20 flex -translate-x-1/2 gap-1.5 sm:bottom-3">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveBanner(i)}
                aria-label={`Show banner ${i + 1}`}
                className={`h-[3px] cursor-pointer rounded-full transition-all sm:h-2 ${
                  i === activeBanner ? 'w-[18px] bg-[#ff6500] sm:w-6' : 'w-3 bg-[#0d5a43] sm:w-2 sm:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="mx-auto max-w-[1400px] px-0 sm:px-4">
        <div className="flex h-[34px] items-center gap-1.5 overflow-hidden bg-[#26956f] px-2 text-white shadow-xs sm:h-auto sm:gap-3 sm:rounded-xl sm:border sm:border-gray-200 sm:bg-white sm:px-3 sm:py-2">
          <div className="flex shrink-0 items-center gap-1.5 text-[11px] font-black text-white sm:rounded-md sm:border sm:border-orange-200 sm:bg-orange-50 sm:px-2.5 sm:py-1 sm:text-xs sm:text-[#ff5a00]">
            <Volume2 className="h-[22px] w-[22px] shrink-0 animate-pulse text-white sm:h-3.5 sm:w-3.5 sm:text-[#ff5a00]" strokeWidth={2.5} />
            <span>{t('home.announcement_title')}</span>
          </div>

          <div className="flex-1 overflow-hidden whitespace-nowrap text-[11px] font-semibold text-white sm:text-xs sm:text-gray-700">
            <div className="animate-marquee inline-block">
              {t('home.announcement_text')}
            </div>
          </div>
        </div>
      </div>

      {/* Screenshot-matched mobile quick categories and game strip */}
      <section className="bg-white lg:hidden">
        <div className="flex h-[84px] w-full max-w-full touch-pan-x overscroll-x-contain overflow-x-auto overflow-y-hidden border-b-2 border-[#ff5a00] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            { label: 'Hot Games', value: 'Games', image: '/sidebar%20icon%20mobilemode/Hot.jpeg' },
            { label: 'Slot', value: 'Slot', image: '/sidebar%20icon%20mobilemode/rng.png' },
            { label: 'Cricket', value: 'Cricket', image: '/sidebar%20icon%20mobilemode/cricket.png' },
            { label: 'Casino', value: 'Casino', image: '/sidebar%20icon%20mobilemode/ld.png' },
            { label: 'Crash', value: 'Crash', image: '/sidebar%20icon%20mobilemode/crash.jpeg' },
            { label: 'Table Games', value: 'Table Games', image: '/sidebar%20icon%20mobilemode/table.png' },
            { label: 'Sports', value: 'Sports', image: '/sidebar%20icon%20mobilemode/sb.png' },
            { label: 'Fishing', value: 'Fishing', image: '/sidebar%20icon%20mobilemode/fishing.png' },
          ].map(({ label, value, image }) => (
            <button key={value} onClick={() => {
              setMobileQuickCategory(value);
              setShowMoreMobileGames(false);
            }} className={`flex h-full min-w-[20%] cursor-pointer flex-col items-center justify-center gap-2 border-r border-[#f1ddd3] text-[#ff5a00] ${mobileQuickCategory === value ? 'bg-[#ff6500] text-white' : 'bg-white'}`}>
              <span className={`flex h-10 w-10 items-center justify-center rounded-md ${mobileQuickCategory === value ? 'bg-white shadow-sm' : ''}`}>
                <img src={image} alt="" className="h-9 w-9 object-contain opacity-100" />
              </span>
              <span className="text-[11px] font-extrabold leading-none">{label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-x-2 gap-y-3 px-3 pb-3 pt-3">
          {activeMobileGames.slice(0, showMoreMobileGames ? activeMobileGames.length : 4).map((game) => (
            <button key={game.id} onClick={() => handleGameLaunch(MOBILE_CATEGORY_PAGES[mobileQuickCategory])} className="group relative min-w-0 cursor-pointer text-center">
              <img src="/hotfave/hot-icon.webp" alt="Hot" className="absolute -right-0.5 -top-1.5 z-20 h-auto w-5 object-contain drop-shadow-sm" />
              <span className="relative mx-auto block aspect-[.88] w-full overflow-hidden rounded-[9px] bg-slate-900 shadow-[0_2px_7px_rgba(0,0,0,.2)] ring-1 ring-black/5 transition group-active:scale-95">
                <img src={game.image} alt={game.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              </span>
              <span className="mt-1.5 block truncate text-[8px] font-bold text-[#e95600]">{game.title}</span>
            </button>
          ))}
        </div>
        <button onClick={() => setShowMoreMobileGames((value) => !value)} className="flex h-[28px] w-full cursor-pointer items-center justify-center gap-1 bg-[#dedede] text-[10px] font-semibold text-[#222]">
          {showMoreMobileGames ? 'View Less' : 'View More'} <ChevronDown className={`h-3.5 w-3.5 transition ${showMoreMobileGames ? 'rotate-180' : ''}`} />
        </button>
      </section>

      {/* ========================================================================= */}
      {/* 🔴 STEP 1: Referral Program Banner (Matching Screenshot 1) */}
      {/* ========================================================================= */}
      <section className="hidden">
        <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
          Referral Program
        </h3>

        <div className="relative bg-gradient-to-r from-[#031c12] via-[#093d28] to-[#041f14] rounded-xl overflow-hidden shadow-xl border border-emerald-800/50 p-4 sm:p-6 text-white">
          <div className="mb-3 rounded-sm bg-[#ff6500] px-3 py-2 text-center text-[10px] font-black leading-tight text-white lg:hidden">
            <span className="block">We Made It Easier For You To Earn!</span>
            <span className="block font-semibold">You get ৳700, Your friend get ৳600!</span>
          </div>
          {/* Ambient Lighting & 3D Elements in Background */}
          <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Floating Megaphone on Right (Matching Screenshot 1) */}
          <div className="hidden lg:block absolute right-4 bottom-2 pointer-events-none select-none opacity-90 drop-shadow-2xl">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-500 to-amber-300 p-2 flex items-center justify-center transform rotate-12 shadow-2xl border-2 border-emerald-300/40">
              <Megaphone className="w-12 h-12 text-emerald-950 fill-amber-300" />
            </div>
          </div>

          {/* Floating Gift Box on Bottom Left (Matching Screenshot 1) */}
          <div className="hidden sm:block absolute left-2 bottom-1 pointer-events-none select-none opacity-90">
            <div className="w-10 h-10 rounded-lg bg-amber-400 border border-amber-200 flex items-center justify-center shadow-lg text-emerald-950">
              <Gift className="w-6 h-6" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            {/* Left Frosted Card: QR Code & Code Inputs (Matching Screenshot 1) */}
            <div className="lg:col-span-6 bg-[#d7e5de]/95 backdrop-blur-md text-gray-900 rounded-xl p-4 sm:p-5 shadow-2xl border border-white/60">
              <div className="grid grid-cols-12 gap-3 items-center sm:gap-4">
                {/* Left QR Code Container */}
                <div className="col-span-5 flex justify-center">
                  <div className="bg-white p-2.5 rounded-lg border-2 border-gray-300 shadow-md flex flex-col items-center justify-center">
                    <QrCode className="h-20 w-20 text-slate-900 sm:h-32 sm:w-32" />
                  </div>
                </div>

                {/* Right Form Fields & Buttons */}
                <div className="col-span-7 space-y-2.5">
                  {/* Referral Code Field */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Referral Code <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center bg-[#b8c9c0] rounded-md border border-gray-400 overflow-hidden px-2.5 py-1.5">
                      <input
                        type="text"
                        readOnly
                        value={user.referralCode || 'GM06P458436'}
                        className="w-full bg-transparent font-bold text-xs text-gray-900 outline-hidden font-mono"
                      />
                      <button
                        onClick={handleCopyCode}
                        className="text-gray-700 hover:text-black p-0.5 cursor-pointer transition"
                        title="Copy Referral Code"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Today Commission Field */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Today Commission <span className="text-red-500">*</span>
                    </label>
                    <div className="bg-[#b8c9c0] rounded-md border border-gray-400 px-2.5 py-1.5 font-bold text-xs text-gray-900 font-mono">
                      {user.todayCommission ? user.todayCommission.toFixed(2) : '0'}
                    </div>
                  </div>

                  {/* Action Buttons: Share Now (Orange) & Referral Report (Navy) */}
                  <div className="space-y-1.5 pt-1">
                    <button
                      onClick={() => {
                        const code = user.referralCode || 'GM06P458436';
                        navigator.clipboard?.writeText(`https://krikya.club/register?ref=${code}`);
                        alert(language === 'bn' ? 'রেফারেল লিংক কপি হয়েছে!' : 'Referral invitation link copied to clipboard!');
                      }}
                      className="w-full bg-[#ff5a00] hover:bg-[#e04f00] text-white font-bold text-xs py-2 px-3 rounded-md shadow-md flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Now</span>
                    </button>

                    <button
                      onClick={() => onNavigate('referral-summary')}
                      className="w-full bg-[#0a1e27] hover:bg-[#123140] text-white font-bold text-xs py-2 px-3 rounded-md shadow-md flex items-center justify-center transition cursor-pointer"
                    >
                      <span>Referral Report</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Promotional Typography & Big Button (Matching Screenshot 1) */}
            <div className="hidden lg:col-span-6 lg:flex lg:flex-col lg:justify-center lg:text-left space-y-3 px-2">
              <div className="space-y-0.5">
                <p className="text-sm sm:text-base italic font-extrabold text-[#faa61a]">
                  Same Invite. <span className="not-italic text-white">Half the Effort.</span>
                </p>
                <p className="text-sm sm:text-base font-black text-[#faa61a]">
                  Double the <span className="text-[#faa61a]">Reward.</span>
                </p>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#faa61a] leading-tight drop-shadow-md">
                Share once. Get paid every weekly.
              </h2>

              <div className="pt-2 flex justify-center lg:justify-start">
                <button
                  onClick={() => onNavigate('referral-summary')}
                  className="bg-gradient-to-b from-[#ff8400] to-[#ff4e00] hover:from-[#ff9624] hover:to-[#ff5c12] text-white font-black text-sm sm:text-base px-8 py-2.5 rounded-full shadow-2xl border-2 border-amber-300/80 transition-transform hover:scale-105 active:scale-95 cursor-pointer italic uppercase tracking-wider"
                >
                  Share Now!
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReferralProgram user={user} onNavigate={onNavigate} onOpenLogin={onOpenLogin} />

      {/* ========================================================================= */}
      {/* 🔴 STEP 2: Live Betting: Real Time Winners (Matching Screenshot 2) */}
      {/* Automatically slides smoothly to the right */}
      {/* ========================================================================= */}
      <section className="mx-auto max-w-[1320px] px-2 sm:px-4">
        <div className="bg-[#ececec] px-3 pb-2 pt-3 sm:px-4">
          {/* Header Row & Category Tabs */}
          <div className="mb-3 flex flex-col items-start gap-2">
            <h3 className="text-sm font-extrabold text-gray-900 sm:text-[16px]">
              Live Betting: Real Time Winners Happening Right Now
            </h3>

            {/* Filter Tabs & Navigation Arrows */}
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-5">
                {(['SLOTS', 'CASINO', 'CRASH', 'TABLE'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setWinnerTab(tab)}
                    className={`min-w-[78px] cursor-pointer rounded-full px-3.5 py-1.5 text-[11px] font-black transition sm:min-w-[82px] ${
                      winnerTab === tab
                        ? 'bg-[#ff9f0a] text-white shadow-xs'
                        : 'text-gray-700 hover:text-gray-900 bg-transparent'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => scrollWinners('left')}
                  className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition cursor-pointer"
                  title="Scroll Left"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => scrollWinners('right')}
                  className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition cursor-pointer"
                  title="Scroll Right"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Smooth Auto-Scrolling Winners Track (Duplicates list for infinite seamless loop) */}
          <div
            ref={winnersScrollRef}
            onTouchStart={() => setIsAutoScrollPaused(true)}
            onTouchEnd={() => setIsAutoScrollPaused(false)}
            className="live-winners-scroll flex select-none gap-1.5 overflow-x-scroll pb-5 pt-1"
            style={{ scrollbarWidth: 'auto' }}
          >
            {[...activeWinnerGames, ...activeWinnerGames].map((winner, idx) => (
              <div
                key={`${winner.id}-${idx}`}
                onClick={() => handleGameLaunch(WINNER_CATEGORY_PAGES[winnerTab])}
                className="group flex w-[142px] shrink-0 cursor-pointer flex-col justify-between rounded-[4px] border border-[#d5d5d5] bg-white p-2 shadow-sm transition hover:border-[#ff6500] hover:shadow-md sm:w-[172px]"
              >
                {/* Game Artwork Box with Provider Badge (Matching Screenshot 2) */}
                <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-[3px] bg-slate-900">
                  <img
                    src={winner.gameImage}
                    alt={winner.gameTitle}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Provider Brand Badge (JL, PG, etc.) */}
                  <span className="absolute top-1 right-1 bg-black/70 backdrop-blur-xs text-amber-300 font-black text-[9px] px-1 py-0.5 rounded-xs">
                    {winner.id.includes('2') ? 'PG' : winner.id.includes('4') ? 'PGT' : 'JL'}
                  </span>
                </div>

                {/* Game Title */}
                <h4 className="truncate px-1 text-[13px] font-extrabold text-gray-900 transition group-hover:text-[#ff5a00] sm:text-[14px]">
                  {winner.gameTitle}
                </h4>

                {/* User Name */}
                <p className="mt-2 text-center font-mono text-[11px] text-[#333]">
                  {winner.username}
                </p>

                {/* Orange Timestamp */}
                <p className="mt-1 whitespace-nowrap font-mono text-[10px] font-bold text-[#ff6500]">
                  {winner.time}
                </p>

                {/* Bet Amount */}
                <p className="mt-1 text-[11px] font-medium text-[#333]">
                  Bet Amount : {winner.betAmount.toFixed(2)}
                </p>

                {/* Won Amount with Orange BDT Badge (Matching Screenshot 2) */}
                <div className="mt-3 flex items-center gap-1 px-1 pb-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#ff5a00] text-white text-[9px] font-black flex items-center justify-center shrink-0">
                    ৳
                  </span>
                  <span className="font-black text-xs text-gray-900">
                    {winner.winAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🔴 STEP 3: Live Sports & Cricket Matches (Matching Screenshot 3) */}
      {/* ========================================================================= */}
      <section className="max-w-[1400px] mx-auto px-2 sm:px-4">
        <div 
          ref={cricketScrollRef}
          className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
          style={{ scrollbarWidth: 'thin' }}
        >
          {MOCK_CRICKET_MATCHES.map((match) => (
            <div key={match.id} className="w-84 sm:w-96 shrink-0 space-y-1">
              {/* Top Live NOW Badge (Matching Screenshot 3) */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 pl-1">
                <span>Live</span>
                <span className="bg-[#00c04b] text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                  NOW
                </span>
              </div>

              {/* Deep Dark Green Card (Matching Screenshot 3) */}
              <div
                onClick={() => onNavigate('cricket')}
                className="bg-gradient-to-b from-[#063321] via-[#042417] to-[#02180f] text-white rounded-xl p-4 border border-emerald-700/60 shadow-xl hover:border-emerald-400 transition cursor-pointer flex flex-col justify-between h-72"
              >
                {/* Header: Tournament Title */}
                <div className="text-center pb-2">
                  <h4 className="text-sm font-black text-white tracking-wide truncate">
                    {match.tournament}
                  </h4>
                </div>

                {/* Match Teams, Logos, VS, and Odds */}
                <div className="grid grid-cols-12 gap-2 items-center py-2">
                  {/* Team 1 */}
                  <div className="col-span-5 flex flex-col items-center text-center space-y-1">
                    {getTeamIcon(match.team1.name, match.team1.flag)}
                    <span className="text-xs font-bold text-gray-100 line-clamp-2 h-8 flex items-center justify-center">
                      {match.team1.name}
                    </span>
                    <span className="font-mono font-black text-sm text-white">
                      {match.team1.odds.toFixed(2)}
                    </span>
                  </div>

                  {/* Golden 3D VS Badge */}
                  <div className="col-span-2 flex flex-col items-center justify-center">
                    <span className="text-amber-400 font-black text-lg italic tracking-wider drop-shadow-md">
                      VS
                    </span>
                  </div>

                  {/* Team 2 */}
                  <div className="col-span-5 flex flex-col items-center text-center space-y-1">
                    {getTeamIcon(match.team2.name, match.team2.flag)}
                    <span className="text-xs font-bold text-gray-100 line-clamp-2 h-8 flex items-center justify-center">
                      {match.team2.name}
                    </span>
                    <span className="font-mono font-black text-sm text-white">
                      {match.team2.odds.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Bottom Date & Big White Time (Matching Screenshot 3) */}
                <div className="text-center pt-2 border-t border-emerald-800/40">
                  <p className="text-[11px] font-mono text-emerald-300/80">
                    2026-08-23
                  </p>
                  <p className="text-2xl sm:text-3xl font-black text-white tracking-wider font-mono">
                    {match.id === 'cm1' ? '05:00' : match.id === 'cm2' ? '12:30' : '16:00'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Bar Track Indicator */}
        <div className="flex items-center gap-2 mt-2 px-1">
          <button
            onClick={() => scrollCricket('left')}
            className="text-gray-400 hover:text-gray-700 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex-1 bg-gray-300 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gray-600 h-full w-1/3 rounded-full"></div>
          </div>
          <button
            onClick={() => scrollCricket('right')}
            className="text-gray-400 hover:text-gray-700 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
