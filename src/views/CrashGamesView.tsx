import React from 'react';
import { CatalogView } from '../components/CatalogView';
import type { Game } from '../platform/player';

/** The catalogue has no crash category, so these are found by name. */
export const CrashGamesView: React.FC<{ onPlayGame: (game: Game) => void }> = ({ onPlayGame }) => (
  <CatalogView
    gradient="from-[#881337] via-[#9f1239] to-[#ff5a00]"
    eyebrow="Fast Multipliers & Instant Cashout"
    title="Crash Games"
    description="Aviator and fast multiplier games. Cash out before the crash."
    searchPlaceholder="Search Crash Games..."
    playLabel="Play Now"
    query={{ search: 'aviator' }}
    tabs={[
      { label: 'Aviator', query: { search: 'aviator' } },
      { label: 'Crash', query: { search: 'crash' } },
      { label: 'SPRIBE', query: { provider: 'SPRIBE' } },
    ]}
    onPlayGame={onPlayGame}
  />
);
