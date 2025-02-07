import { createContext } from 'react';
import { CharacterApiContextType } from './use-character.api';
export const CharacterApiContext = createContext<CharacterApiContextType | undefined>(undefined);
