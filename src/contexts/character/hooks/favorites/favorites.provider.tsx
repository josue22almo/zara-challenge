import { ReactNode } from "react";
import { FavoritesContext } from "./favorites.context";
import { useFavorites } from "./useFavorites";


export const FavoritesProvider = ({ children }: { children: ReactNode; }) => {
  const favorites = useFavorites();

  return (
    <FavoritesContext.Provider value={favorites}>
      {children}
    </FavoritesContext.Provider>
  );
};
