import { expect, describe, it, beforeAll } from 'vitest'

import { CharacterApi } from "../domain/character.api";
import { createDragonBallCharacterApi } from "./dragon-ball-character.api";

describe('DragonBallCharacterApi', () => {
  let api: CharacterApi;

  beforeAll(() => {
    api = createDragonBallCharacterApi();
  });

  it('should fetch characters from dragon ball api using search', async () => {
    const characters = await api.getCharacters('goku');
    expect(characters).toBeDefined();
    expect(characters[0]).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      description: expect.any(String),
      image: expect.any(String),
    });
  });

  it('should fetch characters from dragon ball api with empty search', async () => {
    const characters = await api.getCharacters('');
    expect(characters).toBeDefined();
    expect(characters[0]).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      description: expect.any(String),
      image: expect.any(String),
    });
  });

  it('should fetch character by id from dragon ball api', async () => {
    const character = await api.getCharacterById(1);
    expect(character).toBeDefined();
    expect(character).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      description: expect.any(String),
      image: expect.any(String),
    });
  });

  it('should fetch character appearances from dragon ball api', async () => {
    const appearances = await api.getCharacterAppearances(1);
    expect(appearances).toBeDefined();
    expect(appearances[0]).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      description: expect.any(String),
      image: expect.any(String),
    });
  });
}); 