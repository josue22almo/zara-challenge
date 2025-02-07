import { useState } from 'react';
import { CharacterApi } from './contexts/character/domain/character.api';


import { createMarvelCharacterApi } from "./contexts/character/infrastructure/marvel-character.api";
import { createDragonBallCharacterApi } from "./contexts/character/infrastructure/dragon-ball-character.api";

export const marvelCharacterApi = createMarvelCharacterApi(
  import.meta.env.VITE_MARVEL_API_KEY!,
  import.meta.env.VITE_MARVEL_PRIVATE_KEY!
);

export const dragonBallCharacterApi = createDragonBallCharacterApi();


export const useCharacterApi = (): CharacterApiContextType => {
  const [mode, setMode] = useState<'marvel' | 'dragon-ball'>('marvel');
  const api = mode === 'marvel' ? marvelCharacterApi : dragonBallCharacterApi;
  return {
    api,
    mode,
    toggleMode: () => setMode(mode === 'marvel' ? 'dragon-ball' : 'marvel'),
  };
};


export interface CharacterApiContextType {
  api: CharacterApi;
  mode: 'marvel' | 'dragon-ball';
  toggleMode: () => void;
}