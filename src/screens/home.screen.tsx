import { useState, useEffect } from "react";

import { Screen } from "@/screens/screen";
import { Input } from "@/components/ui/input";
import { CharacterList } from "@/components/ui/character.list";
import { cn } from "@/lib/utils";
import { useCharacterApiContext } from "@/contexts/character/domain/use-character.api.context";
import { useCharacters, useCharactersCount } from "@/contexts/character/hooks/characters/useCharacters";

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
      {/* main content */}
      <div 
        id="main-content"
        className={
          cn(
            "flex flex-col py-6 gap-6 px-4",
            "xl:px-12 xl:p-12 xl:gap-6",
          )
        }
      >
        <SearchWrapper onSearch={setSearch} charactersCount={charactersCount}  search={search}/>
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



interface SearchWrapperProps {
  onSearch: (search: string) => void;
  charactersCount: number | undefined;
  search: string;
}

const SearchWrapper = ({ onSearch, charactersCount, search }: SearchWrapperProps) => {
  return (
    <div id="search-wrapper" className={
      cn(
        "flex flex-col gap-3",
      )
    }> 
      <div className="relative">
        <Input 
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search for a character"
          className="uppercase placeholder:text-gray-500 pl-10 shadow-none border-b-[1px] border-black"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-[12px]">🔍</span>
      </div>
      <div className="flex flex-col gap-4"> 
        <div className="text-sm text-black uppercase">
          {charactersCount} results
        </div>
      </div>
    </div>
  );
}