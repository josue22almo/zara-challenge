import { Character } from "@/contexts/character/domain/character";
import { Card, CardContent, CardFooter } from "./card";
import { HeartIcon } from "./heart.icon";
import { useFavoritesContext } from "@/contexts/character/hooks/useFavoritesContext";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const { isFavorite, toggleFavorite } = useFavoritesContext();

  return (
    <Card className="relative group overflow-hidden rounded-lg w-[172.5px] shadow-none border-none">
      <CardContent className="aspect-square overflow-hidden p-0">
        <img 
          src={character.image} 
          alt={character.name}
          className="w-full h-full"
        />
      </CardContent>

      <CardFooter 
        className="relative bg-black group-hover:bg-[#ED1C24] text-white p-2 flex justify-between items-center 
                   transition-colors duration-300"
      >
        <HoverTab />

        <div className="group-hover:relative group-hover:z-10 flex flex-row justify-between items-center w-full">
          <span className="font-bold truncate">{character.name}</span>
          <Button 
            onClick={() => toggleFavorite(character)} 
            className="p-1 transition-colors duration-300 group-hover:z-100 shadow-none w-12 h-12"
          >
            <HeartIcon 
              color={isFavorite(character) ? '#ED1C24' : '#fff'}
              className={
                cn(
                  isFavorite(character) ? 'group-hover:fill-white' : 'fill-none',
                  "transition-colors duration-300"
                )
              }
            />
          </Button>
          {/* Triángulo decorativo */}
          <div className="absolute right-0 bottom-0 w-[20px] h-[20px] overflow-hidden group-hover:overflow-visible border-none">
            <div className={
              cn(
                "absolute bottom-0 right-0 w-0 h-0 border-l-[20px] border-l-black border-b-[20px]  border-b-white transition-colors duration-300",
                "group-hover:border-l-[#ED1C24] group-hover:border-b-white group-hover:absolute group-hover:left-[8px] group-hover:bottom-[-8px]",
              )
            }/>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export const HoverTab: React.FC = () => {
  return (
    <div 
        className="absolute top-0 left-0 w-full bg-[#ED1C24] 
                   h-[5px] group-hover:h-[40px] transition-all duration-300 ease-in-out group-hover:-z-0"
    />
  );
};