import { ReactNode } from "react";
import { useFavorites } from "./useFavorites";
import { FavoritesContext } from "./FavoritesContext";


export const FavoritesProvider = ({ children }: { children: ReactNode; }) => {
  const favorites = useFavorites();

  return (
    <FavoritesContext.Provider value={favorites}>
      {children}
    </FavoritesContext.Provider>
  );
};
