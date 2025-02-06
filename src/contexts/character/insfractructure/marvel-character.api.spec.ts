import { CharacterApi } from "../domain/character.api";
import { useMarvelCharacterApi } from "./marvel-character.api";

describe('MarvelCharacterApi', () => {
  let api: CharacterApi;

  beforeAll(() => {
    api = useMarvelCharacterApi(
      process.env.MARVEL_API_KEY!,
      process.env.MARVEL_PRIVATE_KEY!
    );
  });

  it('should fetch characters from marvel api using search', async () => {
    const characters = await api.getCharacters('spider');
    expect(characters).toBeDefined();
  });

  it('should fetch characters from marvel api with empty search', async () => {
    const characters = await api.getCharacters('');
    expect(characters).toBeDefined();
  });

  it('should fetch character by id from marvel api', async () => {
    const character = await api.getCharacterById(1011334);
    expect(character).toBeDefined();
  });

  it('should fetch character appearances from marvel api', async () => {
    const appearances = await api.getCharacterAppearances(1011334);
    expect(appearances).toBeDefined();
  });
});