import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { errorMessage } from '../platform/api';
import { player, type Game } from '../platform/player';

/** The banner and sportsbook cards, listing the books this site really has. */
export const SportsbookCards: React.FC<{ games: Game[]; onPlayGame: (game: Game) => void }> = ({ games, onPlayGame }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {games.map((game) => (
      <div key={game.id} onClick={() => onPlayGame(game)} className="group bg-white rounded-2xl p-5 border border-gray-200 hover:border-[#ff5a00] shadow-2xs hover:shadow-lg transition cursor-pointer flex flex-col justify-between">
        <div>
          <div className="mb-3 w-12 h-12 overflow-hidden rounded-xl bg-blue-50 text-blue-700 font-black text-sm flex items-center justify-center border border-blue-200">
            {game.imageUrl ? <img src={game.imageUrl} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" /> : game.provider.slice(0, 3).toUpperCase()}
          </div>
          <h3 className="font-extrabold text-base text-gray-800 group-hover:text-[#0e5332]">{game.name}</h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{game.provider}</p>
        </div>
        <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#ff5a00]">
          <span>Enter Sportsbook</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    ))}
  </div>
);

export const SportsbookView: React.FC<{ onPlayGame: (game: Game) => void }> = ({ onPlayGame }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    player.sportsbooks().then(setGames).catch((err) => setError(errorMessage(err, 'Could not load sportsbooks.'))).finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 space-y-4 pb-12 pt-4">
      <div className="bg-gradient-to-r from-[#1e3a8a] via-[#1d4ed8] to-[#0e5332] text-white rounded-2xl p-6 shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">Global Sports & In-Play Betting</span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white">Sportsbook</h1>
          <p className="text-xs text-blue-100 mt-1 max-w-md">Bet on football, basketball, tennis, cricket and eSports.</p>
        </div>
      </div>
      {loading && <p className="text-xs text-gray-500">Loading...</p>}
      {error && <p className="text-xs font-semibold text-red-600">{error}</p>}
      {!loading && !error && games.length === 0 && <p className="py-10 text-center text-sm text-gray-500">No sportsbooks are available right now.</p>}
      <SportsbookCards games={games} onPlayGame={onPlayGame} />
    </div>
  );
};
