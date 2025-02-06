import { useState } from "react";
import { Character } from "../domain/character";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (character: Character) => {
      if (favorites.includes(character.id)) {
          setFavorites(favorites.filter((id) => id !== character.id));
      } else {
          setFavorites([...favorites, character.id]);
      }
  };

  const isFavorite = (character: Character) => {
    return favorites.includes(character.id);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    total: favorites.length,
  };
};

export interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (character: Character) => void;
  isFavorite: (character: Character) => boolean;
  total: number;
}

