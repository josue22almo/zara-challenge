import { Character } from './character';
import { CharacterApiContextType } from './character-api.context';

export const mockApiContext = (characters: Character[], mode: "marvel" | "dragon-ball"): CharacterApiContextType => ({
  api: {
    getCharacters: vi.fn().mockImplementation((search: string) => Promise.resolve(
      search.length > 0 ? characters.filter(c => c.name.toLowerCase().includes(search.toLowerCase())) : characters
    )),
    getCharacterById: vi.fn().mockImplementation((id: number) => Promise.resolve(characters.find(c => c.id === id))),
    getCharacterAppearances: vi.fn()
  },
  mode,
  toggleMode: vi.fn(),
});
