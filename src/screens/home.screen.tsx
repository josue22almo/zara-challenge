import { useState, useEffect } from "react";


import { Screen } from "@/screens/screen";
import { useCharacters, useCharactersCount } from "@/contexts/character/hooks/useCharacters";
import { Input } from "@/components/ui/input";
import { CharacterList } from "@/components/ui/character.list";
import { useCharacterApiContext } from "@/use-character.api.context";

export const HomeScreen = () => {
  const [search, setSearch] = useState(""); 
  
  const { api, mode } = useCharacterApiContext();

  const { data: characters, isLoading, error, refetch: refreshCharacters } = useCharacters(mode, api, search);
  const { data: charactersCount } = useCharactersCount(mode, api, search);


  useEffect(() => {
  }, [search, isLoading]);


  useEffect(() => {
    setSearch("");
    refreshCharacters();
  }, [mode]);
  
  return (
    <Screen isLoading={isLoading}>
      <div className="flex flex-col py-12 space-y-6 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col"> 
          <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex flex-col gap-4"> 
          <div className="text-sm text-black">
            {charactersCount} RESULTS
          </div>
        </div>
        <>
          {
            !characters?.length && !isLoading && <div>No characters found</div>
          }
          { characters && <CharacterList characters={characters} /> }
        </>
      </div>
      {
        error && <div>Error: {error.message}</div>
      }
    </Screen>
  );
};
