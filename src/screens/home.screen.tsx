import { useState, useRef, useEffect } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";


import { Screen } from "@/screens/screen";
import { CharacterCard } from "@/components/ui/character.card";
import { useCharacters, useCharactersCount } from "@/contexts/character/hooks/useCharacters";
import { useMarvelCharacterApi } from "@/contexts/character/insfractructure/marvel-character.api";
import { Input } from "@/components/ui/input";

export const HomeScreen = () => {
  const [search, setSearch] = useState(""); 
  const ref = useRef<LoadingBarRef>(null);
  
  const api = useMarvelCharacterApi(
    import.meta.env.VITE_MARVEL_API_KEY!,
    import.meta.env.VITE_MARVEL_PRIVATE_KEY!
  );

  const { data: characters, isLoading, error } = useCharacters(api, search);
  const { data: charactersCount } = useCharactersCount(api, search);


  useEffect(() => {
    ref.current?.start();
  }, [search]);

  useEffect(() => {
    if (!isLoading) {
      ref.current?.complete();
    }
  }, [isLoading]);
  
  return (
    <Screen>
      <LoadingBar 
        ref={ref}
        shadow={false}
        height={4}
        style={{ position: 'absolute', top: 68, left: 0, right: 0, zIndex: 50 }}
      />
      <div className="flex flex-col gap-4 pt-12">
        <div className="flex flex-col gap-4"> 
          <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex flex-col gap-4"> 
          <div className="text-sm text-black">
            {charactersCount} RESULTS
          </div>
        </div>
        {
          characters?.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))
        }
        {
          !characters?.length && !isLoading && <div>No characters found</div>
        }
      </div>
      {
        error && <div>Error: {error.message}</div>
      }
    </Screen>
  );
};
