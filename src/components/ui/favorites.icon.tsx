import { useFavoritesContext } from "@/contexts/character/hooks/useFavoritesContext";
import { HeartIcon } from './heart.icon';

export const FavoritesIcon = () => {
  const { total: totalFavorites } = useFavoritesContext();
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <HeartIcon isFavorited />
      <span className="text-sm text-white">{totalFavorites}</span>
    </div>
  );
};
