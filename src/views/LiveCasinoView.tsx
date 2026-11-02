import React from 'react';
import { CatalogView } from '../components/CatalogView';
import type { Game } from '../platform/player';

export const LiveCasinoView: React.FC<{ onPlayGame: (game: Game) => void; selectedProvider?: string }> = ({ onPlayGame, selectedProvider }) => (
  <CatalogView
    gradient="from-[#1e1b4b] via-[#312e81] to-[#0e5332]"
    eyebrow="Live Dealer Games & Online Casino"
    title="Live Casino"
    description="Live dealer tables with professional croupiers in Baccarat, Blackjack, Roulette and game shows."
    searchPlaceholder="Search Live Tables..."
    playLabel="Join Table"
    live
    query={{ category: 'live casino' }}
    selectedProvider={selectedProvider}
    onPlayGame={onPlayGame}
  />
);
