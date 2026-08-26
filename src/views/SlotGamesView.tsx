import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MOCK_SLOT_GAMES, PROVIDERS_BY_CATEGORY } from '../data/mockData';
import { Check, ChevronDown, Flame, Play, Search, SlidersHorizontal } from 'lucide-react';

interface SlotGamesViewProps {
  onPlayGame: (gameTitle: string) => void;
  selectedProvider?: string;
}

export const SlotGamesView: React.FC<SlotGamesViewProps> = ({ onPlayGame, selectedProvider: initialProvider = 'JILI' }) => {
  const [selectedProvider, setSelectedProvider] = useState(initialProvider);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMoreProviders, setHasMoreProviders] = useState(false);
  const providerScrollerRef = useRef<HTMLDivElement>(null);
  const providers = PROVIDERS_BY_CATEGORY.slot;

  useEffect(() => setSelectedProvider(initialProvider), [initialProvider]);

  const updateMoreProvidersVisibility = useCallback(() => {
    const scroller = providerScrollerRef.current;
    if (!scroller) return;

    const remainingScroll = scroller.scrollWidth - scroller.clientWidth - scroller.scrollLeft;
    setHasMoreProviders(remainingScroll > 2);
  }, []);

  useEffect(() => {
    const scroller = providerScrollerRef.current;
    if (!scroller) return;

    updateMoreProvidersVisibility();
    const resizeObserver = new ResizeObserver(updateMoreProvidersVisibility);
    resizeObserver.observe(scroller);
    if (scroller.firstElementChild) resizeObserver.observe(scroller.firstElementChild);

    return () => resizeObserver.disconnect();
  }, [providers.length, updateMoreProvidersVisibility]);

  const showMoreProviders = () => {
    const scroller = providerScrollerRef.current;
    if (!scroller) return;

    scroller.scrollBy({ left: Math.max(180, scroller.clientWidth * 0.7), behavior: 'smooth' });
  };

  const games = useMemo(() => {
    const searched = MOCK_SLOT_GAMES.filter((game) => game.title.toLowerCase().includes(searchQuery.toLowerCase()));
    const providerGames = searched.filter((game) => game.provider === selectedProvider);
    return providerGames.length >= 5 ? providerGames : searched;
  }, [searchQuery, selectedProvider]);

  return (
    <div className="min-h-screen bg-white pb-14">
      <section className="relative h-[158px] overflow-hidden bg-[#102769] sm:h-[190px]">
        <img src="/slots/slot-provider-banner.png" alt="Slot Games" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-8 mx-auto max-w-[1370px] px-7">
          <h1 className="text-xl font-black text-white drop-shadow-md sm:text-2xl">Slot Games</h1>
        </div>
      </section>

      <section className="border-b border-[#e3e3e3] bg-white">
        <div className="mx-auto flex h-[62px] max-w-[1250px] items-center px-3">
          <Search className="mr-3 h-5 w-5 shrink-0 text-[#65717d]" />
          <div className="relative w-full max-w-[420px]">
            <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search Games" className="h-[40px] w-full rounded-[4px] border border-[#c8cdd2] bg-white px-4 pr-10 text-[14px] font-semibold text-[#555] outline-none focus:border-[#08765c]" />
            <ChevronDown className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#68727d]" />
          </div>
        </div>
      </section>

      <section className="bg-[#08765c] text-white shadow-[0_4px_9px_rgba(0,0,0,.28)]">
        <div className="relative mx-auto max-w-[1250px]">
          <div ref={providerScrollerRef} onScroll={updateMoreProvidersVisibility} className={`h-[56px] overflow-x-auto no-scrollbar ${hasMoreProviders ? 'pr-[132px]' : ''}`}>
            <div className="flex h-full w-max items-center px-5">
              {providers.map((provider) => {
                const active = selectedProvider === provider.code;
                return (
                  <button key={provider.code} onClick={() => setSelectedProvider(provider.code)} className="flex h-full shrink-0 cursor-pointer items-center gap-2 border-r border-white/15 px-4 text-[14px] font-extrabold uppercase tracking-wide first:pl-0">
                    <span className={`flex h-[18px] w-[18px] items-center justify-center border-2 ${active ? 'border-[#ff6500] bg-[#ff6500]' : 'border-[#043e31] bg-transparent'}`}>
                      {active && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
                    </span>
                    {provider.code}
                  </button>
                );
              })}
            </div>
          </div>
          {hasMoreProviders && (
            <button type="button" onClick={showMoreProviders} aria-label="Show more provider filters" className="absolute right-2 top-1/2 flex h-[42px] -translate-y-1/2 cursor-pointer items-center gap-2 rounded bg-[#0b6856] px-4 text-[14px] font-black text-[#ff6500] shadow-lg">
              <SlidersHorizontal className="h-4 w-4" /> More Filters
            </button>
          )}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1230px] grid-cols-2 gap-x-3 gap-y-3 px-3 pt-7 sm:grid-cols-3 lg:grid-cols-5">
        {games.map((game, index) => {
          const spriteIndex = index % 6;
          return (
            <button key={game.id} onClick={() => onPlayGame(game.title)} className="group relative aspect-[1.47] cursor-pointer overflow-visible rounded-[3px] bg-[#151c2b] text-left shadow-sm">
              <span className="absolute inset-0 overflow-hidden rounded-[3px]">
                <span className="absolute inset-0 bg-[url('/slots/slot-games-sprite.png')] bg-no-repeat transition-transform duration-300 group-hover:scale-105" style={{ backgroundSize: '300% 200%', backgroundPosition: `${(spriteIndex % 3) * 50}% ${Math.floor(spriteIndex / 3) * 100}%` }} />
                <span className="absolute inset-x-0 bottom-0 h-9 bg-gradient-to-t from-black/90 to-transparent" />
                <span className="absolute inset-x-2 bottom-1 truncate text-center text-[13px] font-extrabold text-white drop-shadow">{game.title}</span>
                <span className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition group-hover:opacity-100"><Play className="h-10 w-10 fill-[#ff6500] text-[#ff6500]" /></span>
              </span>
              {(game.isHot || index < 8) && <span className="absolute -right-2 -top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#d9232e] text-white shadow"><Flame className="h-5 w-5 fill-white" /></span>}
              <span className="absolute left-2 top-2 rounded-sm bg-black/55 px-1.5 py-0.5 text-[9px] font-black text-[#ffd447]">{selectedProvider}</span>
            </button>
          );
        })}
      </section>
    </div>
  );
};
