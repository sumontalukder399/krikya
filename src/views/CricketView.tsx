import React, { useEffect, useState } from 'react';
import { errorMessage } from '../platform/api';
import { player, type Game } from '../platform/player';
import { SportsbookCards } from './SportsbookView';

/** Cricket betting happens inside the providers' own exchange and sportsbook, which open from here. */
export const CricketView: React.FC<{ onPlayGame: (game: Game) => void }> = ({ onPlayGame }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    player.sportsbooks()
      .then(setGames)
      .catch((err) => setError(errorMessage(err, 'Could not load cricket betting.')))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 space-y-4 pb-12 pt-4">
      <div className="bg-gradient-to-r from-[#072718] via-[#0e5332] to-[#146b41] text-white rounded-2xl p-6 shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">Cricket Exchange Bangladesh</span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white">Cricket Betting</h1>
          <p className="text-xs text-emerald-100 mt-1 max-w-md">Back and lay with live odds on BPL, IPL, CPL, World Cup and Test series.</p>
        </div>
      </div>
      {loading && <p className="text-xs text-gray-500">Loading...</p>}
      {error && <p className="text-xs font-semibold text-red-600">{error}</p>}
      <SportsbookCards games={games} onPlayGame={onPlayGame} />
    </div>
  );
};
