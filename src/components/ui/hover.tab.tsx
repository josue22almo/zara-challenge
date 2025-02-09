import { useCharacterApiContext } from "@/contexts/character/domain/use-character.api.context";
import { cn } from "@/lib/utils";

export const HoverTab: React.FC = () => {
  const { mode } = useCharacterApiContext();
  return (
    <div 
        className={
          cn(
            "absolute top-0 left-0 w-full h-[5px] group-hover:h-[40px] transition-all duration-300 ease-in-out group-hover:-z-0",
            mode === 'marvel' ? 'bg-[var(--primary)]' : 'bg-[var(--secondary)]'
          )
        }
    />
  );
};