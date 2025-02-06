import { Character } from "@/contexts/character/domain/character";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <div>
      <h1>Character Card</h1>
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
      <p>{character.description}</p>
    </div>
  );
};