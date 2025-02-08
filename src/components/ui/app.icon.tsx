import { useCharacterApiContext } from '@/use-character.api.context';
import marvelLogo from '/marvel-logo.svg'
import dragonBallLogo from '/dragon-ball-logo.svg'
export const AppIcon = () => {
  const { mode } = useCharacterApiContext();
  return (
    <img src={mode === 'marvel' ? marvelLogo : dragonBallLogo} alt="Marvel Logo" style={{ width: '130px', height: '52px' }} />
  );
};

