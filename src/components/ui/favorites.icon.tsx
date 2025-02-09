import { useFavoritesContext } from "@/contexts/character/hooks/favorites/useFavoritesContext";
import { HeartIcon } from './heart.icon';
import { cn } from "@/lib/utils";
import { useCharacterApiContext } from "@/contexts/character/domain/use-character.api.context";

export const FavoritesIcon = () => {
  const { total: totalFavorites, showFavorites } = useFavoritesContext();
  const { mode } = useCharacterApiContext();
  return (
    <button
      data-testid="header-favorites-icon"
      className="flex flex-row items-center justify-center gap-2"
      onClick={showFavorites}
    >
      <HeartIcon 
        className={
          cn(
            "w-6 h-6",
            mode === 'marvel' ? 'fill-[var(--primary)]' : 'fill-[var(--secondary)]'
          )
        }
      />
      <span className="text-sm text-white">{totalFavorites}</span>
    </button>
  );
};
