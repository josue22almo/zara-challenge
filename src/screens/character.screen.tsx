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
  const { data: character } = useCharacter(mode, api, Number(id));

  return (
    <Screen className="border-t-[5px] border-[#333333]">
      <CharacterResume character={character} />
      <CharacterAppearances  />
    </Screen>
  );
};

function CharacterResume({ character }: { character: Character | undefined }) {
  return (
    <div className="bg-black px-12 relative">
      <CharacterResumeContent character={character} />
      <CutIcon className="absolute w-6 h-6 bottom-0 right-0" />
    </div>
  )
}

function CharacterResumeContent({ character }: { character: Character | undefined }) {
  return (
    <div className="flex flex-row items-center">
      <CharacterPhoto character={character} />
      <CharacterInfo character={character} />
    </div>
  )
}

function CharacterPhoto({ character }: { character: Character | undefined }) {
  return (
    <>
      {
        character ? (
          <img
            src={character?.image}
            alt={character?.name}
            className="lg:w-[320px] lg:h-[320px] md:w-[278px] md:h-[278px]"
          />
        ) : (
          <Skeleton className="h-[320px] w-[320px]" />
        )
      }
    </>
  )
}

export const CharacterInfo = ({ character }: { character: Character | undefined }) => {
  return (
    <div className="flex flex-col ml-6 text-white">
      <div className="flex flex-row items-center">
        <CharacterTitle character={character} />
      </div>
      <p className="mt-2 text-lg">{character?.description}</p>
    </div>
  )
}

function CharacterTitle({ character }: { character: Character | undefined }) {
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
      {!character && <Skeleton className="h-2 w-56" />}
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
