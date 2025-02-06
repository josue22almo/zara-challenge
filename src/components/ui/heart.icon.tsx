import heartIcon from '../../assets/heart-icon.svg'
import heartIconWhite from '../../assets/heart-icon-white.svg'
interface HeartIconProps {
  isFavorited: boolean;
  color?: string;
}

export const HeartIcon = ({ isFavorited }: HeartIconProps) => { 
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <img src={isFavorited ? heartIcon : heartIconWhite} alt="Favorites Icon" style={{ width: '24px', height: '24px' }} />
    </div>
  );
};

