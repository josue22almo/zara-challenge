import { Character } from "@/contexts/character/domain/character";
import { CharacterCard } from "./character.card";
import { cn } from "@/lib/utils";

export const CharacterList = ({ characters }: { characters: Character[]; }) => {
  return (
    <div id="character-list" className={
      cn(
        "grid gap-[10px] grid-cols-2",
        "lg:px-0 lg:gap-4 lg:grid-cols-6",
        "xl:px-0 xl:gap-4 xl:grid-cols-7",
      )
    }>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};
