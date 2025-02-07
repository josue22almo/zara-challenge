import { useFavoritesContext } from "@/contexts/character/hooks/useFavoritesContext";
import { HeartIcon } from './heart.icon';

export const FavoritesIcon = () => {
  const { total: totalFavorites, toggleShowFavorites } = useFavoritesContext();
  return (
    <button
      className="flex flex-row items-center justify-center gap-2"
      onClick={toggleShowFavorites}
    >
      <HeartIcon color="#ED1C24" className="w-5 h-5" />
      <span className="text-sm text-white">{totalFavorites}</span>
    </button>
  );
};
