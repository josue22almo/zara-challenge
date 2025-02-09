import { Routes, Route, BrowserRouter } from 'react-router'
import { HomeScreen } from './screens/home.screen'
import { CharacterScreen } from './screens/character.screen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FavoritesProvider } from './contexts/character/hooks/favorites/favorites.provider'
import { CharacterApiProvider } from './contexts/character/infrastructure/character-api.provider'
import { useCharacterApi } from './contexts/character/infrastructure/use-character.api'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
})

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <CharacterApiProvider context={useCharacterApi()}>
        <BrowserRouter>
          <FavoritesProvider>
            <Routes>
              <Route index element={<HomeScreen />} />
              <Route path="character/:id" element={<CharacterScreen />} />
            </Routes>
          </FavoritesProvider>
        </BrowserRouter>
      </CharacterApiProvider>
    </QueryClientProvider>
  )
}

export default App
