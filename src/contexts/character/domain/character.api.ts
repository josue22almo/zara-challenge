import { Character } from "./character";
import { CharacterAppearance } from "./character-apperance";

export interface CharacterApi {
  getCharacters(search: string): Promise<Character[]>;
  getCharacterById(id: number): Promise<Character>;
  getCharacterAppearances(id: number): Promise<CharacterAppearance[]>;
}
