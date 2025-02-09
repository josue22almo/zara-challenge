import { useNavigate } from "react-router";

import { Character } from "@/contexts/character/domain/character";
import { Card, CardContent, CardFooter } from "./card";
import { cn } from "@/lib/utils";
import { CharacterFavoriteButton } from "./character-favorite.button";
import { HoverTab } from "./hover.tab";
import { useCharacterApiContext } from "@/contexts/character/domain/use-character.api.context";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/character/${character.id}`);
  }

  const { mode } = useCharacterApiContext();

  return (
    <Card 
      onClick={handleClick}
      data-testid={`character-card-${character.id}`}
      className={
        cn(
          "relative group overflow-hidden rounded-lg w-[172.5px] h-[245.97px] shadow-none border-none",
          "lg:w-[188.57px]",
          "xl:w-[188.57px]",
        )
      }>
      <CardContent className="aspect-square overflow-hidden p-0">
        <img 
          src={character.image} 
          alt={character.name}
          className={
            cn(
              "w-full h-full object-contain",
              mode === "marvel" && "object-fill",
            )
          }
        />
      </CardContent>

      <CardFooter 
        className={
          cn(
            "relative bg-black  text-white p-2 flex justify-between items-center transition-colors duration-300",
            mode === 'marvel' ? 'group-hover:bg-[var(--primary)]' : 'group-hover:bg-[var(--secondary)]'
          )
        }
      >
        <HoverTab />

        <div className="group-hover:relative group-hover:z-10 flex flex-row justify-between items-center w-full">
          <span className="truncate">{character.name}</span>
          <CharacterFavoriteButton character={character} />
          {/* Triángulo decorativo */}
          <div className="absolute right-0 bottom-0 w-[20px] h-[20px] overflow-hidden group-hover:overflow-visible border-none">
            <div className={
              cn(
                "absolute bottom-0 right-0 w-0 h-0 border-l-[20px] border-l-black border-b-[20px]  border-b-white transition-colors duration-300",
                "group-hover:border-b-white group-hover:absolute group-hover:left-[8px] group-hover:bottom-[-8px]",
                mode === 'marvel' ? 'group-hover:border-l-[var(--primary)]' : 'group-hover:border-l-[var(--secondary)]'
              )
            }/>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
