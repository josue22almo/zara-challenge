import { useContext } from "react";
import { CharacterApiContext } from "./character-api.context";


export const useCharacterApiContext = () => {
  const context = useContext(CharacterApiContext);
  if (context === undefined) {
    throw new Error('useCharacterApiContext must be used within a CharacterApiProvider');
  }
  return context;
};
