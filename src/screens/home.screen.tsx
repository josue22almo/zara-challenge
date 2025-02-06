import { useState } from "react";
import { Screen } from "@/screens/screen";
import { CharacterCard } from "@/components/ui/character.card";
import { useCharacters } from "@/contexts/character/hooks/useCharacters";
import { useMarvelCharacterApi } from "@/contexts/character/insfractructure/marvel-character.api";
import { Input } from "@/components/ui/input";
export const HomeScreen = () => {
  const [search, setSearch] = useState(""); 
  const api = useMarvelCharacterApi(
    import.meta.env.VITE_MARVEL_API_KEY!,
    import.meta.env.VITE_MARVEL_PRIVATE_KEY!
  );
  const { data: characters, isLoading, error } = useCharacters(api, search);
  
  return <Screen>
    <div className="flex flex-col gap-4"> 
      <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
      {
        characters?.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))
      }
      {
        error && <div>Error: {error.message}</div>
      }
      {
        isLoading && <div>Loading...</div>
      }
    </Screen>
  ;
};
