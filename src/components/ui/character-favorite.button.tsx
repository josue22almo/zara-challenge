import { Character } from "@/contexts/character/domain/character";
import { useFavoritesContext } from "@/contexts/character/hooks/favorites/useFavoritesContext";
import { cn } from "@/lib/utils";
import { HeartIcon } from "./heart.icon";
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
      data-testid={`character-favorite-button-${character.id}`}
      className={cn(
        "p-1 transition-colors duration-300 group-hover:z-100 shadow-none w-12 h-12", className)}
    >
      <HeartIcon 
        className={
          cn(
            isFavorite(character) ? 'fill-[#ED1C24] group-hover:fill-white stroke-none' : 'stroke-white stroke-2',
            "transition-colors duration-300",
            "w-3 h-3"
          )
        }
      />
    </Button>
  );
};