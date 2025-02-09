import marvelLogo from '/marvel-logo.svg'
import dragonBallLogo from '/dragon-ball-logo.svg'
import { cn } from '@/lib/utils';
import { useCharacterApiContext } from '@/contexts/character/domain/use-character.api.context';

interface AppIconProps {
  className?: string;
}

export const AppIcon = ({ className }: AppIconProps) => {
  const { mode } = useCharacterApiContext();
  return (
    <img 
      data-testid="app-icon"
      src={mode === 'marvel' ? marvelLogo : dragonBallLogo}
      alt={mode === 'marvel' ? 'Marvel Logo' : 'Dragon Ball Logo'}
      className={cn(className)}
    />
  );
};

