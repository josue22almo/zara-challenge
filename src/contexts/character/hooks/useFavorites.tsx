import { useState } from "react";
import { Character } from "../domain/character";
import { useCharacterApiContext } from "@/use-character.api.context";

export const useFavorites = (): FavoritesContextType => {
  const { mode } = useCharacterApiContext();
  const [favorites, setFavorites] = useState<{ [key: string]: number[] }>({});
  const [mustShowFavorites, setMustShowFavorites] = useState(false);

  const toggleFavorite = (character: Character) => {
      const currentFavorites = favorites[mode] || [];
      if (currentFavorites.includes(character.id)) {
          setFavorites({
              ...favorites,
              [mode]: currentFavorites.filter((id) => id !== character.id)
          });
      } else {
          setFavorites({
              ...favorites,
              [mode]: [...currentFavorites, character.id]
          });
      }
  };

  const isFavorite = (character: Character) => {
    const currentFavorites = favorites[mode] || [];
    return currentFavorites.includes(character.id);
  };

  const showFavorites = () => {
    setMustShowFavorites(true);
  };

  const hideFavorites = () => {
    setMustShowFavorites(false);
  };

  return {
    favorites: favorites[mode] || [],
    toggleFavorite,
    isFavorite,
    total: favorites[mode]?.length || 0,
    mustShowFavorites,
    showFavorites,
    hideFavorites,
  };
};

export interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (character: Character) => void;
  isFavorite: (character: Character) => boolean;
  total: number;
  mustShowFavorites: boolean;
  showFavorites: () => void;
  hideFavorites: () => void;
}

