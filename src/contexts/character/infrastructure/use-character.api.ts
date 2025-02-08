import { useState } from 'react';
import { createDragonBallCharacterApi } from './dragon-ball-character.api';
import { createMarvelCharacterApi } from './marvel-character.api';
import { CharacterApiContextType } from '../domain/character-api.context';

export const marvelCharacterApi = createMarvelCharacterApi(
  import.meta.env.VITE_MARVEL_API_KEY!,
  import.meta.env.VITE_MARVEL_PRIVATE_KEY!
);

export const dragonBallCharacterApi = createDragonBallCharacterApi();

export const useCharacterApi = (): CharacterApiContextType => {
  const [mode, setMode] = useState<'marvel' | 'dragon-ball'>(() => {
    const savedMode = localStorage.getItem('characterMode');
    return (savedMode === 'marvel' || savedMode === 'dragon-ball') ? savedMode : 'marvel';
  });

  const api = mode === 'marvel' ? marvelCharacterApi : dragonBallCharacterApi;

  const toggleMode = () => {
    const newMode = mode === 'marvel' ? 'dragon-ball' : 'marvel';
    setMode(newMode);
    localStorage.setItem('characterMode', newMode);
  };

  return {
    api,
    mode,
    toggleMode,
  };
};
