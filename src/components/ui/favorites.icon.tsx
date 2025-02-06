import { useFavorites } from '@/contexts/character/hooks/useFavorites';
import heartIcon from '../../assets/heart-icon.svg'

export const FavoritesIcon = () => {
  const { total: totalFavorites } = useFavorites();
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <img src={heartIcon} alt="Favorites Icon" style={{ width: '24px', height: '24px' }} />
      <span className="text-sm text-white">{totalFavorites}</span>
    </div>
  );
};
