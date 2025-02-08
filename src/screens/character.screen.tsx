import { useParams } from "react-router";
import { Screen } from "@/screens/screen";
import { useCharacter, useCharacterAppearances } from "@/contexts/character/hooks/useCharacters";
import { CharacterFavoriteButton } from "@/components/ui/character-favorite.button";
import { Skeleton } from "@/components/ui/skeleton";
import { Character } from "@/contexts/character/domain/character";
import { CutIcon } from "@/components/ui/cut.icon";
import { useCharacterApiContext } from "@/use-character.api.context";
export const CharacterScreen = () => {
  const { id } = useParams();

  const { api, mode } = useCharacterApiContext();
  const { data: character, isLoading, error } = useCharacter(mode, api, Number(id));

  return (
    <Screen isLoading={isLoading} className="border-t-[5px] border-[#333333]">
      <CharacterResume character={character} error={error} />
      <CharacterAppearances  />
    </Screen>
  );
};

function CharacterResume({ character, error }: { character: Character | undefined, error: Error | null }) {
  return (
    <div className="bg-black px-12 relative">
      <CharacterResumeContent character={character} error={error} />
      <CutIcon className="absolute w-6 h-6 bottom-0 right-0" />
    </div>
  )
}

function CharacterResumeContent({ character, error }: { character: Character | undefined, error: Error | null }) {
  return (
    <div className="flex flex-row items-center">
      <CharacterPhoto character={character} error={error}  />
      <CharacterInfo character={character} error={error} />
    </div>
  )
}

function CharacterPhoto({ character, error }: { character: Character | undefined, error: Error | null }) {
  return (
    <>
      {
        character ? (
          <img
            src={character?.image}
            alt={character?.name}
            className="lg:w-[320px] lg:h-[320px] md:w-[278px] md:h-[278px]"
          />
        ) : !error ? (
          <Skeleton className="h-[320px] w-[320px]" />
        ) : (
          <div className="text-white h-[320px] w-[320px] flex items-center justify-center">Character not found</div>
        )
      }
    </>
  )
}

export const CharacterInfo = ({ character, error }: { character: Character | undefined, error: Error | null }) => {
  return (
    <div className="flex flex-col ml-6 text-white">
      <div className="flex flex-row items-center">
        <CharacterTitle character={character} error={error} />
      </div>
      <p className="mt-2 text-lg">{character?.description}</p>
    </div>
  )
}

function CharacterTitle({ character, error }: { character: Character | undefined, error: Error | null }) {
  return (
    <>
      { character && 
        <>
          <h1 className="text-4xl font-bold">{character?.name}</h1>
          <div className="ml-auto w-12 h-12">
            <CharacterFavoriteButton character={character} className="text-white" />
          </div>  
        </>
      }
      {!character && !error && <Skeleton className="h-2 w-56" />}
    </>
  )
}


const ComicList = () => {
  const { id } = useParams();

  const { api, mode } = useCharacterApiContext();
  const { data: appearances } = useCharacterAppearances(mode, api, Number(id));

  return (
    <div 
        className="flex overflow-x-scroll scrollbar-thin scrollbar-thumb-[#ED1C24] scrollbar-track-transparent space-x-4"
      >
        {
          !appearances && <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        }
        {
          appearances && appearances.length === 0 && 
          <p>No appearances found</p>
        }
        {appearances && appearances.map((comic) => (
          <div 
            key={comic.id} 
            className="flex-shrink-0 w-48 rounded-lg bg-white"
          >
            <img 
              src={comic.image} 
              alt={comic.name} 
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-2">
              <h3 className="font-bold text-sm truncate">{comic.name}</h3>
              <p className="text-gray-500 text-xs">{comic.description}</p>
            </div>
          </div>
        ))}
      </div>
  );
};

function CharacterAppearances() {
  return (
    <div className="w-full p-6 px-4 sm:px-6 md:px-8 lg:px-12">
      <h2 className="text-2xl font-bold mb-4">Comics</h2>
      <ComicList />
    </div>
  )
}
