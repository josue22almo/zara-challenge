import { ReactNode } from 'react';
import { CharacterApiContext, CharacterApiContextType } from '../domain/character-api.context';


export const CharacterApiProvider = ({ children, context }: { children: ReactNode, context: CharacterApiContextType }) => {
  return (
    <CharacterApiContext.Provider value={context}>
      {children}
    </CharacterApiContext.Provider>
  )
};
