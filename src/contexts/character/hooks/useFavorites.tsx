import { useState } from "react";
import { Character } from "../domain/character";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

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

  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    total: favorites.length,
    showFavorites,
    toggleShowFavorites,
  };
};

export interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (character: Character) => void;
  isFavorite: (character: Character) => boolean;
  total: number;
  showFavorites: boolean;
  toggleShowFavorites: () => void;
}

