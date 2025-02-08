import { BrowserRouter } from "react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CharacterApiProvider } from "@/contexts/character/infrastructure/character-api.provider.tsx";
import { FavoritesProvider } from "@/contexts/character/hooks/favorites/favorites.provider.tsx";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
})


createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <CharacterApiProvider>
      <BrowserRouter>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </BrowserRouter>
      </CharacterApiProvider>
    <ReactQueryDevtools initialIsOpen={true} />
  </QueryClientProvider>,
)
