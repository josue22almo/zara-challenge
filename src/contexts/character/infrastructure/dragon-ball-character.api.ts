import { Character } from "../domain/character";
import { CharacterAppearance } from "../domain/character-apperance";
import { CharacterApi } from "../domain/character.api";

const API_URL = 'https://dragonball-api.com/api';

const mapCharacter = (character: DragonBallCharacter): Character => ({
  id: character.id,
  name: character.name,
  description: character.description,
  image: character.image,
});

const mapAppearance = (transformation: DragonBallTransformation): CharacterAppearance => ({
  id: transformation.id,
  name: transformation.name,
  description: transformation.ki,
  image: transformation.image,
});

export const createDragonBallCharacterApi = (): CharacterApi => ({
  getCharacters: async (search: string) => {
    if (!search) {
      const response = await fetch(`${API_URL}/characters?limit=50`);
      const data: DragonBallCharactersResponse = await response.json();
      return data.items.map(mapCharacter);
    }
    const response = await fetch(`${API_URL}/characters?name=${search}&limit=50`);
    const data: DragonBallCharacter[] = await response.json();
    return data.map(mapCharacter);
  },
  getCharacterById: async (id: number) => {
    const response = await fetch(`${API_URL}/characters/${id}`);
    const data: DragonBallCharacter = await response.json();
    return mapCharacter(data);
  },
  getCharacterAppearances: async (id: number) => {
    const response = await fetch(`${API_URL}/characters/${id}`);
    const data: DragonBallCharacter = await response.json();
    return data.transformations.map(mapAppearance);
  },
});

interface DragonBallCharactersResponse {
  items: DragonBallCharacter[];
}

interface DragonBallCharacter {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
  deletedAt: null;
  transformations: DragonBallTransformation[];
}

interface DragonBallTransformation {
  id: number;
  name: string;
  image: string;
  ki: string;
  deletedAt: null;
}