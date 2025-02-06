import { Character } from "@/contexts/character/domain/character";
import { Card, CardContent, CardFooter } from "./card";
import { Separator } from "@/components/ui/separator";
import { HeartIcon } from "./heart.icon";
import { useFavoritesContext } from "@/contexts/character/hooks/useFavoritesContext";
import { Button } from "./button";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  
  return (
    <Card className="w-full min-w-[172.5px] shadow-none border-none">
      <CardContent className="p-0">
        <img src={character.image} alt={character.name} className="w-full h-auto" />
        <Separator color="red" className="w-full bg-[#EC1D24] h-[5.38px]" />
      </CardContent>
      <CardFooter className="bg-black relative flex justify-between p-[16px_16px_24px_16px]">
        <h2 className="inline-block text-white">{character.name}</h2>
        <Button onClick={() => toggleFavorite(character)}>
          <HeartIcon isFavorited={isFavorite(character)} />
        </Button>
        <div className="absolute right-0 bottom-0 w-[20px] h-[20px] overflow-hidden">
          <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[20px] border-l-black border-b-[20px] border-b-white"></div>
        </div>
      </CardFooter>
    </Card>
  );
};