import { createContext } from "react";
import { FavoritesContextType } from "./useFavorites";


export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
