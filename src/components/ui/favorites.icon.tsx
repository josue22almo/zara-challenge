import { useFavoritesContext } from "@/contexts/character/hooks/characters/useFavoritesContext";
import { HeartIcon } from './heart.icon';

export const FavoritesIcon = () => {
  const { total: totalFavorites, showFavorites } = useFavoritesContext();
  return (
    <button
      className="flex flex-row items-center justify-center gap-2"
      onClick={showFavorites}
    >
      <HeartIcon className="fill-[#ED1C24] w-6 h-6"/>
      <span className="text-sm text-white">{totalFavorites}</span>
    </button>
  );
};
