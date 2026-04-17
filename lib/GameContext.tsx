'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { GuessRecord } from '@/types';

interface GameContextType {
  guesses: GuessRecord[];
  addGuess: (guess: GuessRecord) => void;
  resetGame: () => void;
  isInitialized: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [guesses, setGuesses] = useState<GuessRecord[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from sessionStorage to maintain state across reloads if desired,
  // but mostly relying on Context for routing between /play and /result.
  useEffect(() => {
    const stored = sessionStorage.getItem('game_guesses');
    if (stored) {
      try {
        setGuesses(JSON.parse(stored));
      } catch {
        console.error('Failed to parse stored guesses');
      }
    }
    setIsInitialized(true);
  }, []);

  const addGuess = (guess: GuessRecord) => {
    setGuesses((prev) => {
      const newGuesses = [...prev, guess];
      sessionStorage.setItem('game_guesses', JSON.stringify(newGuesses));
      return newGuesses;
    });
  };

  const resetGame = () => {
    setGuesses([]);
    sessionStorage.removeItem('game_guesses');
  };

  return (
    <GameContext.Provider value={{ guesses, addGuess, resetGame, isInitialized }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
