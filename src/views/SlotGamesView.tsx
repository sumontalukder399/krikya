import React from 'react';
import { GameGrid } from '../components/GameGrid';
import type { Game } from '../platform/player';

export const SlotGamesView: React.FC<{ onPlayGame: (game: Game) => void; selectedProvider?: string }> = ({ onPlayGame, selectedProvider }) => (
  <GameGrid title="Slot Games" query={{ category: 'slots' }} selectedProvider={selectedProvider} onPlayGame={onPlayGame} />
);
