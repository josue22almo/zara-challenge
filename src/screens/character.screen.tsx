import { useParams } from "react-router";
import { Screen } from "@/screens/screen";
import { CharacterFavoriteButton } from "@/components/ui/character-favorite.button";
import { Skeleton } from "@/components/ui/skeleton";
import { Character } from "@/contexts/character/domain/character";
import { CutIcon } from "@/components/ui/cut.icon";
import { cn } from "@/lib/utils";
import { useCharacterApiContext } from "@/contexts/character/domain/use-character.api.context";
import { useCharacter, useCharacterAppearances } from "@/contexts/character/hooks/characters/useCharacters";
import { CharacterAppearance } from "@/contexts/character/domain/character-apperance";
export const CharacterScreen = () => {
  const { id } = useParams();

  const { api, mode } = useCharacterApiContext();
  const { data: character, isLoading, error } = useCharacter(mode, api, Number(id));

  return (
    <Screen isLoading={isLoading} className={
      cn(
        "border-[#333333]",
        "md:border-t-[1px] ",
        "lg:border-t-[1px] ",
        "xl:border-t-[1px] ",
      )
    }>
      <CharacterResume character={character} error={error} />
      <Appearances  />
    </Screen>
  );
};

function CharacterResume({ character, error }: { character: Character | undefined, error: Error | null }) {
  return (
    <div id="character-resume" className={
      cn(
        "bg-black relative",
        "md:px-12 md:flex md:justify-center",
        "lg:px-12 lg:flex lg:justify-center",
        "xl:px-12 xl:flex xl:justify-center"
      )
    }>
      <CharacterResumeContent character={character} error={error} />
      <CutIcon className="absolute w-6 h-6 bottom-0 right-0" />
    </div>
  )
}

function CharacterResumeContent({ character, error }: { character: Character | undefined, error: Error | null }) {
  return (
    <div id="character-resume-content" className={
      cn(
        "flex flex-col",
        "md:px-0 md:flex-row md:flex md:w-[960px]",
        "lg:px-0 lg:flex-row lg:flex lg:w-[960px]",
        "xl:px-0 xl:flex-row xl:flex xl:w-[960px]",
        "2xl:px-0 2xl:flex 2xl:w-[1000px]",
      )
    }>
      <CharacterPhoto character={character} error={error}  />
      <CharacterInfo character={character} error={error} />
    </div>
  )
}

function CharacterPhoto({ character, error }: { character: Character | undefined, error: Error | null }) {
  return (
    <div id="character-photo" className="flex items-center justify-center">
      {
        character ? (
          <img
            src={character?.image}
            alt={character?.name}
            data-testid="character-photo"
            className={
              cn(
                "w-[393px] h-[397px] object-fill mx-auto my-auto",
              )
            }
          />
        ) : !error ? (
          <Skeleton className="w-[393px] h-[397px]" />
        ) : (
          <div className="text-white w-[393px] h-[397px] flex items-center justify-center">Character not found</div>
        )
      }
    </div>
  )
}

export const CharacterInfo = ({ character, error }: { character: Character | undefined, error: Error | null }) => {
  return (
    <div id="character-info" className="flex flex-col text-white self-center w-full p-[24px_16px_48px_16px] gap-[24px]">
      <CharacterTitle character={character} error={error} />
      <p className="mt-2 text-lg">{character?.description}</p>
    </div>
  )
}

function CharacterTitle({ character, error }: { character: Character | undefined, error: Error | null }) {
  return (
    <div id="character-title">
      { character && 
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-4xl font-bold">{character?.name}</h1>
          <div className="ml-auto w-12 h-12">
            <CharacterFavoriteButton character={character} className="text-white" />
          </div>  
        </div>
      }
      {!character && !error && <Skeleton className="h-2 w-56" />}
    </div>
  )
}


function Appearances() {
  return (
    <div className={
      cn(
        "w-full gap-6",
        "md:px-12 md:flex md:justify-center",
        "lg:px-12 lg:flex lg:justify-center",
        "xl:px-12 xl:flex xl:justify-center",
      )
    }>
      <AppearancesContent />
    </div>
  )
}

const AppearancesContent = () => {
  return (
    <div 
        className={
          cn(
            "flex flex-col py-12 gap-6 space-x-4",
            "md:px-0 md:flex md:w-[960px]",
            "lg:px-0 lg:flex lg:w-[960px]",
            "xl:px-0 xl:flex xl:w-[960px]",
            "2xl:px-0 2xl:flex 2xl:w-[1000px]",
          )
        }
    >
      <AppearancesTitle />
      <AppearancesList />
    </div>
  );
};

function AppearancesTitle() {
  return (
    <h2 className="text-2xl px-4 font-bold mb-4 uppercase">Comics</h2>
  )
}


function AppearancesList() {
  const { id } = useParams();

  const { api, mode } = useCharacterApiContext();
  const { data: appearances } = useCharacterAppearances(mode, api, Number(id));

  return (
    <div className="flex flex-row gap-4 overflow-x-scroll scrollbar-thin scrollbar-thumb-[#ED1C24] scrollbar-track-transparent pr-4">
      {
        !appearances && <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      }
      {
        appearances && appearances.length === 0 && 
        <p>No appearances found</p>
      }
      {appearances && appearances.map((appearance) => (
        <AppearanceCard key={appearance.id} appearance={appearance} />
      ))}
    </div>
  );
}

const AppearanceCard = ({ appearance }: { appearance: CharacterAppearance }) => {
  return (
    <div 
      key={appearance.id} 
      className="flex-shrink-0 w-48 rounded-lg bg-white"
      data-testid={`appearance-card-${appearance.id}`}
    >
      <img 
        src={appearance.image} 
        alt={appearance.name} 
        className="w-full h-64 object-contain rounded-t-lg"
      />
      <div className="p-2">
        <h3 className="font-bold text-sm truncate">{appearance.name}</h3>
        <p className="text-gray-500 text-xs">{appearance.description}</p>
      </div>
    </div>
  )
}

