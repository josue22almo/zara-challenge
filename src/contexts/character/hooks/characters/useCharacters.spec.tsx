import { renderHook, waitFor, act } from "@testing-library/react";
import { useCharacterAppearances, useCharacters, useCharactersCount } from "./useCharacters";
import { CharacterApi } from "../../domain/character.api";
import { Mocked } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useFavoritesContext } from "../favorites/useFavoritesContext";

vi.mock("../favorites/useFavoritesContext", () => ({
  useFavoritesContext: vi.fn().mockReturnValue({
    favorites: [],
    toggleFavorite: vi.fn(),
    isFavorite: vi.fn(),
    total: 0,
    mustShowFavorites: false,
    showFavorites: vi.fn(),
    hideFavorites: vi.fn(),
  }),
}));

describe('useCharacters', () => {
  let api: Mocked<CharacterApi>;
  let mode: string;

  const queryClient = new QueryClient()
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  beforeEach(() => {
    api = {
      getCharacters: vi.fn().mockResolvedValue([]),
      getCharacterById: vi.fn().mockResolvedValue({ id: 1, name: 'test' }),
      getCharacterAppearances: vi.fn().mockResolvedValue([]),
    };
    mode = 'marvel';
  });

  describe('useCharacters', () => {
    it('should return the characters from the api', async () => {
      const { result } = renderHook(() => useCharacters(mode, api, ''), { wrapper });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
  
      expect(result.current.data).toEqual([]);
  
      const characters = [
        { id: 1, name: 'test', description: 'test', image: 'test' },
        { id: 2, name: 'test2', description: 'test2', image: 'test2' },
      ];
      
      api.getCharacters.mockResolvedValue(characters);
      act(() => {
        result.current.refetch();
      });
  
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
  
      expect(result.current.data).toEqual(characters);
  
      expect(api.getCharacters).toHaveBeenCalledWith('');
    });
  
    it('should call the api with the search term', async () => {
      const { result } = renderHook(() => useCharacters(mode, api, 'test'), { wrapper });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
  
      expect(api.getCharacters).toHaveBeenCalledWith('test');
    });

    it('should filter the characters by the favorites', async () => {
      const characters = [
        { id: 1, name: 'test', description: 'test', image: 'test' },
        { id: 2, name: 'test2', description: 'test2', image: 'test2' },
      ];
      
      api.getCharacters.mockResolvedValue(characters);
      
      vi.mocked(useFavoritesContext).mockReturnValue({
        mustShowFavorites: true,
        isFavorite: (character) => character.id === 1,
        favorites: [],
        toggleFavorite: vi.fn(),
        total: 0,
        showFavorites: vi.fn(),
        hideFavorites: vi.fn(),
      });

      const { result } = renderHook(() => useCharacters(mode, api, ''), { wrapper });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual([characters[0]]);
    });
  });
  
  describe('useCharacterAppearances', () => {
    it('should return the appearances from the api', async () => {
      const { result } = renderHook(() => useCharacterAppearances(mode, api, 1), { wrapper });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual([]);

      const appearances = [
        { id: 1, name: 'test', description: 'test', image: 'test' },
        { id: 2, name: 'test2', description: 'test2', image: 'test2' },
      ];
      
      api.getCharacterAppearances.mockResolvedValue(appearances);

      act(() => {
        result.current.refetch();
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(appearances);

      expect(api.getCharacterAppearances).toHaveBeenCalledWith(1);
    })

    it('should call the api with the character id', async () => {
      const { result } = renderHook(() => useCharacterAppearances(mode, api, 1), { wrapper });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(api.getCharacterAppearances).toHaveBeenCalledWith(1);
    })
  })

  describe('useCharactersCount', () => {
    it('should return the count of characters', async () => {
      const { result } = renderHook(() => useCharactersCount(mode, api, ''), { wrapper });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(0);
    })

    it('should return the count of characters when there are favorites', async () => {
      const { result } = renderHook(() => useCharactersCount(mode, api, ''), { wrapper });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      vi.mocked(useFavoritesContext).mockReturnValue({
        mustShowFavorites: true,
        isFavorite: (character) => character.id === 1,
        favorites: [1],
        toggleFavorite: vi.fn(),
        total: 0,
        showFavorites: vi.fn(),
        hideFavorites: vi.fn(),
      });

      const characters = [
        { id: 1, name: 'test', description: 'test', image: 'test' },
        { id: 2, name: 'test2', description: 'test2', image: 'test2' },
      ];

      api.getCharacters.mockResolvedValue(characters);

      act(() => {
        result.current.refetch();
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(1);
    })
  })
});
