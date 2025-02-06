import { Character } from "@/contexts/character/domain/character";
import { CharacterCard } from "./character.card";


export const CharacterList = ({ characters }: { characters: Character[]; }) => {
  return (
    <div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};
