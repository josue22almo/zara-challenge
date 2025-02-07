

import { CharacterApi } from "@/contexts/character/domain/character.api";
import { createMarvelCharacterApi } from "./contexts/character/infrastructure/marvel-character.api";

const marvelCharacterApi = createMarvelCharacterApi(
  import.meta.env.VITE_MARVEL_API_KEY!,
  import.meta.env.VITE_MARVEL_PRIVATE_KEY!
);

export const getCharacterApi = (): CharacterApi => marvelCharacterApi;
