import React, { useCallback, useEffect, useState } from 'react';
import { Play, Search } from 'lucide-react';
import { errorMessage } from '../platform/api';
import { player, type Game, type GameQuery, type ProviderInfo } from '../platform/player';
import { providerKeyFor } from './GameGrid';
import { KrikyaLogoSpinner } from './KrikyaLogoSpinner';

interface CatalogViewProps {
  gradient: string;
  eyebrow: string;
  title: string;
  description: string;
  searchPlaceholder: string;
  playLabel: string;
  live?: boolean;
  query: GameQuery;
  /** Named chips with a query of their own, where a page is not one catalogue category. */
  tabs?: { label: string; query: GameQuery }[];
  selectedProvider?: string;
  onPlayGame: (game: Game) => void;
}

/** The banner, search, provider chips and card grid the casino, table, fishing and crash pages share. */
export const CatalogView: React.FC<CatalogViewProps> = ({ gradient, eyebrow, title, description, searchPlaceholder, playLabel, live, query, tabs, selectedProvider, onPlayGame }) => {
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
    if (tabs || !query.category) return;
    player.providers(query.category).then((list) => {
      setProviders(list);
      setProvider(providerKeyFor(list, selectedProvider));
    }).catch(() => setProviders([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.category, selectedProvider]);

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

  const chip = (active: boolean) => `px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${active ? 'bg-[#0e5332] text-white shadow-xs' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 space-y-4 pb-12 pt-4">
      {/* Category Banner */}
      <div className={`bg-gradient-to-r ${gradient} text-white rounded-2xl p-6 shadow-md flex items-center justify-between`}>
        <div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">{eyebrow}</span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white">{title}</h1>
          <p className="text-xs text-emerald-100 mt-1 max-w-md">{description}</p>
        </div>
      </div>

      {/* Search & Provider Filter Header */}
      <div className="bg-white rounded-xl p-3 shadow-xs border border-gray-200 space-y-3">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={searchPlaceholder} className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:bg-white focus:outline-hidden focus:border-[#0e5332]" />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {tabs ? tabs.map((item, index) => (
            <button key={item.label} onClick={() => setTab(index)} className={chip(tab === index)}>{item.label}</button>
          )) : (
            <>
              <button onClick={() => setProvider('ALL')} className={chip(provider === 'ALL')}>All Providers</button>
              {providers.map((prov) => (
                <button key={prov.key} onClick={() => setProvider(prov.key)} className={chip(provider === prov.key)}>{prov.name || prov.key}</button>
              ))}
            </>
          )}
        </div>
      </div>

      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
      {!error && !loading && games.length === 0 && <p className="py-10 text-center text-sm text-gray-500">No games found.</p>}

      {/* Game Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {games.map((game) => (
          <div key={game.id} onClick={() => onPlayGame(game)} className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#ff5a00] shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer">
            <div className="relative aspect-4/3 overflow-hidden bg-gray-900">
              {game.imageUrl && <img src={game.imageUrl} alt={game.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300" referrerPolicy="no-referrer" />}
              {live && (
                <div className="absolute top-1.5 left-1.5 bg-red-600/90 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded shadow flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  <span>LIVE</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                <div className="w-10 h-10 rounded-full bg-[#ff5a00] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <span className="mt-2 text-xs font-extrabold text-white uppercase tracking-wider">{playLabel}</span>
              </div>
            </div>
            <div className="p-2.5 bg-white">
              <h4 className="font-bold text-xs text-gray-800 truncate group-hover:text-[#0e5332]">{game.name}</h4>
              <div className="mt-1 truncate text-[10px] text-gray-400 font-semibold uppercase">{game.provider}</div>
            </div>
          </div>
        ))}
      </div>

      {loading && <KrikyaLogoSpinner text="Loading games..." />}
      {hasMore && !loading && (
        <div className="flex justify-center">
          <button onClick={() => void load(page + 1)} className="cursor-pointer rounded-lg bg-[#ff5a00] px-6 py-2 text-xs font-extrabold text-white hover:bg-[#e04f00]">Load More</button>
        </div>
      )}
    </div>
  );
};
