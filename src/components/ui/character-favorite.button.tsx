import { Character } from "@/contexts/character/domain/character";
import { useFavoritesContext } from "@/contexts/character/hooks/useFavoritesContext";
import { cn } from "@/lib/utils";
import { HeartIcon } from "lucide-react";
import { Button } from "./button";

interface CharacterFavoriteButtonProps {
  character: Character | undefined;
  className?: string;
}

export const CharacterFavoriteButton: React.FC<CharacterFavoriteButtonProps> = ({ character, className }) => {
  const { isFavorite, toggleFavorite } = useFavoritesContext();

  if (!character) {
    return null;
  }

  return (
    <Button 
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(character);
      }} 
      className={cn("p-1 transition-colors duration-300 group-hover:z-100 shadow-none w-12 h-12", className)}
    >
      <HeartIcon 
        color={isFavorite(character) ? '#ED1C24' : '#fff'}
        fill={isFavorite(character) ? '#ED1C24' : 'fill-none'}
        className={
          cn(
            isFavorite(character) ? 'group-hover:fill-white' : 'fill-none',
            "transition-colors duration-300"
          )
        }
      />
    </Button>
  );
};