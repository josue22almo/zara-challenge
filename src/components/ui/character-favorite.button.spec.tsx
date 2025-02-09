import { render, screen, fireEvent } from "@testing-library/react";
import { CharacterFavoriteButton } from "./character-favorite.button";
import { FavoritesProvider } from "@/contexts/character/hooks/favorites/favorites.provider";
import { CharacterApiProvider } from "@/contexts/character/infrastructure/character-api.provider";
import { mockApiContext } from "@/contexts/character/domain/mockApiContext";
import { useFavorites } from "@/contexts/character/hooks/favorites/useFavorites";
import { Mock } from "vitest";


vi.mock('@/contexts/character/hooks/favorites/useFavorites', () => ({
  useFavorites: vi.fn(() => ({
    isFavorite: vi.fn().mockReturnValue(false),
    toggleFavorite: vi.fn(),
    favorites: [],
    total: 0,
    mustShowFavorites: false,
    showFavorites: vi.fn(),
    hideFavorites: vi.fn(),
  }))
}));

const mockCharacter = {
  id: 1,
  name: "Spider-Man",
  description: "Friendly neighborhood hero",
  image: "test"
};

const renderWithProvider = (character?: typeof mockCharacter) => {
  return render(
    <CharacterApiProvider context={mockApiContext([mockCharacter], "marvel")}>
      <FavoritesProvider>
        <CharacterFavoriteButton character={character} />
    </FavoritesProvider>
    </CharacterApiProvider>
  );
};

describe("CharacterFavoriteButton", () => {
  it("should not render when character is undefined", () => {
    const { container } = renderWithProvider(undefined);
    expect(container).toBeEmptyDOMElement();
  });

  it("should render heart icon when character is provided", () => {
    renderWithProvider(mockCharacter);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should toggle favorite status when clicked", () => {
    const toggleFavoriteMock = vi.fn();
    (useFavorites as Mock).mockReturnValue({
      isFavorite: vi.fn().mockReturnValue(false),
      toggleFavorite: toggleFavoriteMock,
      favorites: [],
      total: 0,
      mustShowFavorites: false,
      showFavorites: vi.fn(),
      hideFavorites: vi.fn(),
    });
  
    renderWithProvider(mockCharacter);
    const button = screen.getByRole("button");
    
    fireEvent.click(button);
    expect(toggleFavoriteMock).toHaveBeenCalledWith(mockCharacter);
  });

  it("should stop event propagation when clicked", () => {
    const parentClickMock = vi.fn();
    
    render(
      <div onClick={parentClickMock}>
        <CharacterApiProvider context={mockApiContext([mockCharacter], "marvel")}>
          <FavoritesProvider>
            <CharacterFavoriteButton character={mockCharacter} />
          </FavoritesProvider>
        </CharacterApiProvider>
      </div>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(parentClickMock).not.toHaveBeenCalled();
  });
}); 