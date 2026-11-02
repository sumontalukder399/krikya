import React from 'react';
import { CatalogView } from '../components/CatalogView';
import type { Game } from '../platform/player';

export const FishingGamesView: React.FC<{ onPlayGame: (game: Game) => void; selectedProvider?: string }> = ({ onPlayGame, selectedProvider }) => (
  <CatalogView
    gradient="from-[#0e7490] via-[#0891b2] to-[#0e5332]"
    eyebrow="Arcade Fish Hunter & Boss Battles"
    title="Fishing Games"
    description="Hunt dragons, king crabs and golden sea creatures with laser cannons."
    searchPlaceholder="Search Fishing Games..."
    playLabel="Shoot Now"
    query={{ category: 'fishing' }}
    selectedProvider={selectedProvider}
    onPlayGame={onPlayGame}
  />
);
