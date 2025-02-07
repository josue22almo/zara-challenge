import { ReactNode } from 'react';
import { CharacterApiContext } from './character-api.context';
import { useCharacterApi } from './use-character.api';


export const CharacterApiProvider = ({ children }: { children: ReactNode }) => {
  const characterApi = useCharacterApi();
  return (
    <CharacterApiContext.Provider value={characterApi}>
      {children}
    </CharacterApiContext.Provider>
  )
};
