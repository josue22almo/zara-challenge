import { useParams } from "react-router";

export const CharacterScreen = () => {
  const { id } = useParams();
  return <div>Character {id}</div>;
};
