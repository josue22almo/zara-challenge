import { useQuery } from "@tanstack/react-query";
import { CharacterApi } from "../domain/character.api";
import { Character } from "../domain/character";
import { useFavorites } from "./useFavorites";

const useCharactersQuery = <T>(api: CharacterApi, select: (data: Character[]) => T, search: string) => useQuery({
    queryKey: ['characters', search],
    queryFn: () => api.getCharacters(search),
    select,
});

export const useCharacter = (api: CharacterApi, id: number) => {
  const { isFavorite } = useFavorites();  
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => api.getCharacterById(id),
    select: (data) => ({
      ...data,
      isFavorite: isFavorite(data),
    }),
  });
};

export const useCharacterAppearances = (api: CharacterApi, id: number) => {
  return useQuery({
    queryKey: ['character', id, 'apperances'],
    queryFn: () => api.getCharacterAppearances(id),
  });
};

export const useCharactersCount = (api: CharacterApi, search: string) => 
  useCharactersQuery(api, (data) => data.length, search);

export const useCharacters = (api: CharacterApi, search: string) => 
  useCharactersQuery(api, (data) => data, search);
