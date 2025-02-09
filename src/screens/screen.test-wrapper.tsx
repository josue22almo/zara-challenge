import { CharacterApiContextType } from "@/contexts/character/domain/character-api.context";
import { FavoritesProvider } from "@/contexts/character/hooks/favorites/favorites.provider";
import { CharacterApiProvider } from "@/contexts/character/infrastructure/character-api.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";


export function ScreenTestWrapper({ 
  children, 
  queryClient, 
  context 
}: { 
  children: React.ReactNode, 
  queryClient: QueryClient, 
  context: CharacterApiContextType }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CharacterApiProvider context={context}>
        <BrowserRouter>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </BrowserRouter>
      </CharacterApiProvider>
    </QueryClientProvider>
  )
}