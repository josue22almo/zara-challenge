import { Character } from "@/contexts/character/domain/character";
import { CharacterCard } from "./character.card";
import { cn } from "@/lib/utils";


export const CharacterList = ({ characters }: { characters: Character[]; }) => {
  return (
    <div className={
      cn(
        "grid gap-[10px] grid-cols-2",
        "sm:grid-cols-3 sm:gap-[10px]",
        "md:grid-cols-4 md:gap-[20px]",
        "lg:grid-cols-5 lg:gap-[30px]",
        "xl:grid-cols-7 xl:gap-[30px]",
        "2xl:grid-cols-10 2xl:gap-[30px]",
      )
    }>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};
