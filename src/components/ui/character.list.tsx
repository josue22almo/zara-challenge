import { Character } from "@/contexts/character/domain/character";
import { CharacterCard } from "./character.card";


export const CharacterList = ({ characters }: { characters: Character[]; }) => {
  return (
    <div className="grid gap-2 p-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-10">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};
