import React, { useState, useEffect, useRef } from 'react';
import { PageType, UserProfile } from '../types';
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
import { PROVIDER_CARDS_BY_CATEGORY } from '../data/providerCatalog';
import { GameTile } from '../components/GameGrid';
import { player, type Game } from '../platform/player';
import { useTenant } from '../platform/tenant';

interface HomeViewProps {
  onNavigate: (page: PageType) => void;
  onPlayGame: (game: Game) => void;
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

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onPlayGame }) => {
  const { t } = useLanguage();
  const tenant = useTenant();

  // The admin panel's slider when it has one, otherwise the site's own artwork.
  const banners = tenant.sliderEnabled && tenant.sliderImages.length > 0
    ? tenant.sliderImages.map((slide) => ({ image: slide.imageUrl, link: slide.link }))
    : ['/banners/cricket-gold.png', '/banners/casino-gold.png', '/banners/deposit-bonus.png'].map((image) => ({ image, link: null as string | null }));

  const [activeBanner, setActiveBanner] = useState(0);
  const [mobileQuickCategory, setMobileQuickCategory] = useState('Games');
  const [showMoreMobileGames, setShowMoreMobileGames] = useState(false);
  const [sections, setSections] = useState<{ title: string; page: PageType; games: Game[] }[]>([]);

  const activeMobileGames = mobileQuickCategory === 'Games'
    ? MOBILE_HOT_GAMES
    : MOBILE_PROVIDER_GAMES[mobileQuickCategory as keyof typeof MOBILE_PROVIDER_GAMES];

  useEffect(() => {
    const timer = setInterval(() => setActiveBanner((prev) => (prev + 1) % banners.length), 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  useEffect(() => {
    const wanted: { title: string; page: PageType; category: string }[] = [
      { title: 'Slot Games', page: 'slot', category: 'slots' },
      { title: 'Live Casino', page: 'casino', category: 'live casino' },
      { title: 'Table Games', page: 'table', category: 'table games' },
    ];
    Promise.all(wanted.map((w) => player.games({ category: w.category, limit: 10 }).then((res) => ({ title: w.title, page: w.page, games: res.items })).catch(() => null)))
      .then((rows) => setSections(rows.filter((row): row is NonNullable<typeof row> => Boolean(row && row.games.length))));
  }, []);

  return (
    <div className="space-y-0 pb-20 animate-fadeIn lg:space-y-6 lg:pb-6">
      {/* Top Banner Carousel */}
      <section className="relative w-full overflow-hidden bg-[#0d6848] px-5 sm:bg-transparent sm:px-0">
        <div className="relative z-10 mt-[10px] h-[130px] overflow-hidden rounded-[10px] bg-black shadow-xl sm:mt-0 sm:h-[340px] sm:rounded-none">
          {banners.map((banner, index) => (
            <a key={banner.image} href={banner.link ?? undefined} aria-hidden={index !== activeBanner} className={`absolute inset-0 transition-opacity duration-500 ${index === activeBanner ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
              <img src={banner.image} alt="" className="h-full w-full object-cover" />
            </a>
          ))}
          <button onClick={() => setActiveBanner((activeBanner - 1 + banners.length) % banners.length)} aria-label="Previous banner" className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white"><ChevronLeft className="h-5 w-5" /></button>
          <button onClick={() => setActiveBanner((activeBanner + 1) % banners.length)} aria-label="Next banner" className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white"><ChevronRight className="h-5 w-5" /></button>
          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
            {banners.map((banner, index) => (
              <button key={banner.image} onClick={() => setActiveBanner(index)} aria-label={`Banner ${index + 1}`} className={`h-2 w-2 cursor-pointer rounded-full ${index === activeBanner ? 'bg-[#ff6500]' : 'bg-white/70'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      {tenant.announcementEnabled && tenant.announcementText && (
        <div className="mx-auto max-w-[1400px] px-0 sm:px-4">
          <div className="flex h-[34px] items-center gap-1.5 overflow-hidden bg-[#26956f] px-2 text-white shadow-xs">
            <div className="flex shrink-0 items-center gap-1.5 text-[11px] font-black">
              <Volume2 className="h-[22px] w-[22px] shrink-0 animate-pulse sm:h-3.5 sm:w-3.5" />
              <span>{t('home.announcement_title')}</span>
            </div>
            <div className="flex-1 overflow-hidden whitespace-nowrap text-[11px] font-semibold sm:text-xs">
              <div className="animate-marquee inline-block">{tenant.announcementText}</div>
            </div>
          </div>
        </div>
      )}

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
            <button key={game.id} onClick={() => onNavigate(MOBILE_CATEGORY_PAGES[mobileQuickCategory])} className="group relative min-w-0 cursor-pointer text-center">
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


      {sections.map((section) => (
        <section key={section.title} className="mx-auto max-w-[1320px] px-3 pt-4 sm:px-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-black text-gray-900">{section.title}</h2>
            <button onClick={() => onNavigate(section.page)} className="flex cursor-pointer items-center text-xs font-bold text-[#ff5a00]">View All<ChevronRight className="h-4 w-4" /></button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {section.games.map((game) => <GameTile key={game.id} game={game} onPlay={onPlayGame} />)}
          </div>
        </section>
      ))}
    </div>
  );
};
