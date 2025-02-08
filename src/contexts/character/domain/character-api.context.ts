import { createContext } from 'react';
import { CharacterApi } from './character.api';


export interface CharacterApiContextType {
  api: CharacterApi;
  mode: 'marvel' | 'dragon-ball';
  toggleMode: () => void;
}

export const CharacterApiContext = createContext<CharacterApiContextType | undefined>(undefined);
