import React from 'react';
import { CatalogView } from '../components/CatalogView';
import type { Game } from '../platform/player';

export const TableGamesView: React.FC<{ onPlayGame: (game: Game) => void; selectedProvider?: string }> = ({ onPlayGame, selectedProvider }) => (
  <CatalogView
    gradient="from-[#064e3b] via-[#047857] to-[#ff5a00]"
    eyebrow="Classic Table Games & Card Matka"
    title="Table Games"
    description="Digital table classics: Teen Patti, Andar Bahar, Mines, Mini Roulette and more."
    searchPlaceholder="Search Table Games..."
    playLabel="Play Table"
    query={{ category: 'table games' }}
    selectedProvider={selectedProvider}
    onPlayGame={onPlayGame}
  />
);
