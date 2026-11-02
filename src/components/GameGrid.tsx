import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, Flame, Play, Search } from 'lucide-react';
import { errorMessage } from '../platform/api';
import { player, type Game, type GameQuery, type ProviderInfo } from '../platform/player';
import { KrikyaLogoSpinner } from './KrikyaLogoSpinner';

/** The header's provider codes, in the names the platform catalogue uses. */
const PROVIDER_ALIASES: Record<string, string> = {
  JILI: 'JiliGames', PP: 'Pragmatic Play', 'PP POP': 'Pragmatic Play', PG: 'Pocket Gaming Soft', RT: 'REDTIGER',
  BOONGO: 'BNG', FC: 'Fachai', EVO: 'Evolution', SEXY: 'Sexy Baccarat', SPG: 'Spadegaming', PNG: 'PLAYNGO',
  NETENT: 'NETENT', NetEnt: 'NETENT',
};

/** The catalogue key for a provider picked from the header menu, or ALL when this site has none. */
export function providerKeyFor(list: ProviderInfo[], selected?: string): string {
  const wanted = selected ? PROVIDER_ALIASES[selected] ?? selected : '';
  return list.find((p) => p.key.toLowerCase() === wanted.toLowerCase())?.key ?? 'ALL';
}

export interface GameGridProps {
  title: string;
  banner?: string;
  /** The catalogue this page shows. */
  query: GameQuery;
  /** Named tabs with a query of their own, used where a page is not one catalogue category. */
  tabs?: { label: string; query: GameQuery }[];
  /** Filter by provider. Off for a short list such as sportsbooks. */
  showProviders?: boolean;
  selectedProvider?: string;
  onPlayGame: (game: Game) => void;
}

export const GameGrid: React.FC<GameGridProps> = ({ title, banner, query, tabs, showProviders = true, selectedProvider, onPlayGame }) => {
  const [providers, setProviders] = useState<ProviderInfo[]>([]);
  const [provider, setProvider] = useState('ALL');
  const [tab, setTab] = useState(0);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const base = tabs?.[tab]?.query ?? query;
  const key = JSON.stringify(base);

  useEffect(() => {
    if (!showProviders || !query.category) return;
    player.providers(query.category).then((list) => {
      setProviders(list);
      setProvider(providerKeyFor(list, selectedProvider));
    }).catch(() => setProviders([]));
  }, [query.category, selectedProvider, showProviders]);

  useEffect(() => {
    const timer = setTimeout(() => setSearch(input.trim()), 350);
    return () => clearTimeout(timer);
  }, [input]);

  const load = useCallback(async (nextPage: number) => {
    setLoading(true);
    setError('');
    try {
      const res = await player.games({ ...base, provider: provider === 'ALL' ? base.provider : provider, search: search || base.search, page: nextPage });
      setGames((prev) => (nextPage === 1 ? res.items : [...prev, ...res.items]));
      setHasMore(res.hasMore);
      setPage(nextPage);
    } catch (err) {
      setError(errorMessage(err, 'Could not load games.'));
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, provider, search]);

  useEffect(() => { void load(1); }, [load]);

  const providerTabs = useMemo(() => providers.map((p) => ({ key: p.key, label: p.name || p.key })), [providers]);

  return (
    <div className="min-h-screen bg-white pb-14">
      <section className="relative h-[158px] overflow-hidden bg-[#102769] sm:h-[190px]">
        <img src={banner ?? '/slots/slot-provider-banner.png'} alt={title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-8 mx-auto max-w-[1370px] px-7">
          <h1 className="text-xl font-black text-white drop-shadow-md sm:text-2xl">{title}</h1>
        </div>
      </section>

      <section className="border-b border-[#e3e3e3] bg-white">
        <div className="mx-auto flex h-[62px] max-w-[1250px] items-center px-3">
          <Search className="mr-3 h-5 w-5 shrink-0 text-[#65717d]" />
          <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Search Games" className="h-[40px] w-full max-w-[420px] rounded-[4px] border border-[#d5d9dd] px-3 text-sm outline-none focus:border-[#ff6500]" />
        </div>
      </section>

      {(tabs || providerTabs.length > 0) && (
        <section className="bg-[#08765c] text-white shadow-[0_4px_9px_rgba(0,0,0,.28)]">
          <div className="mx-auto h-[56px] max-w-[1250px] overflow-x-auto no-scrollbar">
            <div className="flex h-full w-max items-center px-5">
              {(tabs ?? [{ label: 'All' }, ...providerTabs]).map((item, index) => {
                const id = (item as { key?: string }).key ?? 'ALL';
                const active = tabs ? tab === index : provider === id;
                return (
                  <button key={item.label} onClick={() => (tabs ? setTab(index) : setProvider(id))} className="flex h-full shrink-0 cursor-pointer items-center gap-2 border-r border-white/15 px-4 text-[13px] font-extrabold">
                    <span className={`flex h-[18px] w-[18px] items-center justify-center border-2 ${active ? 'border-[#ff6500] bg-[#ff6500]' : 'border-[#043e31] bg-transparent'}`}>
                      {active && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
                    </span>
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {error && <p className="mx-auto max-w-[1230px] px-3 pt-6 text-sm font-semibold text-red-600">{error}</p>}
      {!error && !loading && games.length === 0 && <p className="mx-auto max-w-[1230px] px-3 pt-10 text-center text-sm text-gray-500">No games found.</p>}

      <section className="mx-auto grid max-w-[1230px] grid-cols-2 gap-x-3 gap-y-3 px-3 pt-7 sm:grid-cols-3 lg:grid-cols-5">
        {games.map((game) => <GameTile key={game.id} game={game} onPlay={onPlayGame} />)}
      </section>

      {loading && <KrikyaLogoSpinner text="Loading games..." />}
      {hasMore && !loading && (
        <div className="flex justify-center pt-6">
          <button onClick={() => void load(page + 1)} className="cursor-pointer rounded-md bg-[#ff6500] px-6 py-2 text-sm font-extrabold text-white hover:bg-[#e65b00]">Load More</button>
        </div>
      )}
    </div>
  );
};

export const GameTile: React.FC<{ game: Game; onPlay: (game: Game) => void }> = ({ game, onPlay }) => (
  <button onClick={() => onPlay(game)} className="group relative aspect-[1.47] cursor-pointer overflow-visible rounded-[3px] bg-[#151c2b] text-left shadow-sm">
    <span className="absolute inset-0 overflow-hidden rounded-[3px]">
      {game.imageUrl && <img src={game.imageUrl} alt={game.name} loading="lazy" referrerPolicy="no-referrer" className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />}
      <span className="absolute inset-x-0 bottom-0 h-9 bg-gradient-to-t from-black/90 to-transparent" />
      <span className="absolute inset-x-2 bottom-1 truncate text-center text-[13px] font-extrabold text-white drop-shadow">{game.name}</span>
      <span className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition group-hover:opacity-100"><Play className="h-10 w-10 fill-white text-white" /></span>
    </span>
    {game.popular && <span className="absolute -right-2 -top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#ff5a00] text-white"><Flame className="h-4 w-4 fill-current" /></span>}
    <span className="absolute left-2 top-2 rounded-sm bg-black/55 px-1.5 py-0.5 text-[9px] font-black text-[#ffd447]">{game.provider}</span>
  </button>
);
