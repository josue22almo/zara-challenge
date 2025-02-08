import { useContext } from "react";
import { FavoritesContext } from "@/contexts/character/hooks/favorites/favorites.context";

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
};
