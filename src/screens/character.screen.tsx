import { useParams } from "react-router";
import { Screen } from "@/screens/screen";
export const CharacterScreen = () => {
  const { id } = useParams();
  return <Screen>
    <div>Character {id}</div>
  </Screen>;
};
