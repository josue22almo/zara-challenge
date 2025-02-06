import heartIcon from '../../assets/heart-icon.svg'
import heartIconWhite from '../../assets/heart-icon-white.svg'
import { cn } from '@/lib/utils';
interface HeartIconProps {
  isFavorited: boolean;
  color?: string;
  className?: string;
}

export const HeartIcon = ({ isFavorited, className }: HeartIconProps) => { 
  return (
    <div className={cn("flex flex-row items-center justify-center gap-2", className)}>
      <img src={isFavorited ? heartIcon : heartIconWhite} alt="Favorites Icon" style={{ width: '24px', height: '24px' }} />
    </div>
  );
};

