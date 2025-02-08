import { useQuery } from "@tanstack/react-query";
import { CharacterApi } from "../domain/character.api";
import { Character } from "../domain/character";
import { useFavoritesContext } from "./useFavoritesContext";

const useCharactersQuery = <T>(mode: string, api: CharacterApi, select: (data: Character[]) => T, search: string) => useQuery({
    queryKey: ['characters', search, mode],
    queryFn: () => api.getCharacters(search),
    select,
});

export const useCharacter = (mode: string, api: CharacterApi, id: number) => {
  const { isFavorite } = useFavoritesContext();

  return useQuery({
    queryKey: ['character', id, mode],
    queryFn: () => api.getCharacterById(id),
    select: (data) => ({
      ...data,
      isFavorite: isFavorite(data),
    }),
  });
};

export const useCharacterAppearances = (mode: string, api: CharacterApi, id: number) => {
  return useQuery({
    queryKey: ['character', id, 'apperances', mode],
    queryFn: () => api.getCharacterAppearances(id),
  });
};

export const useCharactersCount = (mode: string, api: CharacterApi, search: string) => {
  const query = useCharacters(mode, api, search);

  return {
    ...query,
    data: query.data?.length,
  }
}

export const useCharacters = (mode: string, api: CharacterApi, search: string) => {
  const query = useCharactersQuery(mode, api, (data) => data, search);

  const { isFavorite, mustShowFavorites } = useFavoritesContext();

  const filteredCharacters = mustShowFavorites ? query.data?.filter(character => isFavorite(character)) : query.data;

  return {
    ...query,
    data: filteredCharacters,
  }
}
