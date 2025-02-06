import { Character } from "@/contexts/character/domain/character";
import { Card, CardContent, CardFooter } from "./card";
import { HeartIcon } from "./heart.icon";
import { useFavoritesContext } from "@/contexts/character/hooks/useFavoritesContext";
import { Button } from "./button";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const { isFavorite, toggleFavorite } = useFavoritesContext();

  return (
    <Card className="relative group overflow-hidden rounded-lg w-[172.5px] shadow-none border-none">
      <CardContent className="aspect-square overflow-hidden p-0 border-b-[4px] border-[#ED1C24]">
        <img 
          src={character.image} 
          alt={character.name}
          className="w-full h-full"
        />
      </CardContent>
      <CardFooter className="bg-black text-white p-2 flex justify-between items-center">
        <span className="font-bold truncate">{character.name}</span>
        <Button onClick={() => toggleFavorite(character)}>
          <HeartIcon isFavorited={isFavorite(character)} />
        </Button>
        <div className="absolute right-0 bottom-0 w-[20px] h-[20px] overflow-hidden">
          <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[20px] border-l-black border-b-[20px] border-b-white"></div>
        </div>
      </CardFooter>
    </Card>
  )
};
