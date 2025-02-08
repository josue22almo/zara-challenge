import { useCharacterApiContext } from '@/use-character.api.context';
import marvelLogo from '/marvel-logo.svg'
import dragonBallLogo from '/dragon-ball-logo.svg'
import { cn } from '@/lib/utils';

interface AppIconProps {
  className?: string;
}

export const AppIcon = ({ className }: AppIconProps) => {
  const { mode } = useCharacterApiContext();
  return (
    <img 
      src={mode === 'marvel' ? marvelLogo : dragonBallLogo}
      alt="Marvel Logo"
      className={cn(className)}
    />
  );
};

