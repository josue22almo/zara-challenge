import { useState } from "react";
import { Character } from "../domain/character";

export const useFavorites = (): FavoritesContextType => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [mustShowFavorites, setMustShowFavorites] = useState(false);

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

  const showFavorites = () => {
    setMustShowFavorites(true);
  };

  const hideFavorites = () => {
    setMustShowFavorites(false);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    total: favorites.length,
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

