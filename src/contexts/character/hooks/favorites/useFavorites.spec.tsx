import { act, renderHook } from "@testing-library/react";
import { useFavorites } from "./useFavorites";
import { Character } from "../../domain/character";

vi.mock("../../domain/use-character.api.context", () => ({
  useCharacterApiContext: vi.fn().mockReturnValue({
    mode: 'marvel',
    toggleMode: vi.fn(),
  }),
}));

describe('useFavorites', () => {
  it('should return the favorites', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it('should add a favorite', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => {
      result.current.toggleFavorite({ id: 1 } as Character);
    });
    expect(result.current.favorites).toEqual([1]);
  });

  it('should remove a favorite', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => {
      result.current.toggleFavorite({ id: 1 } as Character);
    });
    expect(result.current.favorites).toEqual([1]);
    act(() => {
      result.current.toggleFavorite({ id: 1 } as Character);
    });
    expect(result.current.favorites).toEqual([]);
  });

  it('should return the total of favorites', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.total).toEqual(0);

    act(() => {
      result.current.toggleFavorite({ id: 1 } as Character);
    });
    expect(result.current.total).toEqual(1);
  });

  it('should show and hide favorites', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.mustShowFavorites).toEqual(false);

    act(() => {
      result.current.showFavorites();
    });
    expect(result.current.mustShowFavorites).toEqual(true);

    act(() => {
      result.current.hideFavorites();
    });
    expect(result.current.mustShowFavorites).toEqual(false);
  });
});