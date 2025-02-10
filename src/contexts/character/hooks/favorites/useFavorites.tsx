import { useState } from "react";
import { Character } from "@/contexts/character/domain/character";
import { useCharacterApiContext } from "@/contexts/character/domain/use-character.api.context";

export const useFavorites = (): FavoritesContextType => {
  const { mode } = useCharacterApiContext();
  const [favorites, setFavorites] = useState<{ [key: string]: number[] }>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : {};
  });
  const [mustShowFavorites, setMustShowFavorites] = useState(false);

  const updateLocalStorage = (updatedFavorites: { [key: string]: number[] }) => {
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const toggleFavorite = (character: Character) => {
    const currentFavorites = favorites[mode] || [];
    let updatedFavorites;
    if (currentFavorites.includes(character.id)) {
      updatedFavorites = {
        ...favorites,
        [mode]: currentFavorites.filter((id) => id !== character.id)
      };
    } else {
      updatedFavorites = {
        ...favorites,
        [mode]: [...currentFavorites, character.id]
      };
    }
    setFavorites(updatedFavorites);
    updateLocalStorage(updatedFavorites);
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

