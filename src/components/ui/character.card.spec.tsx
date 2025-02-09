import { mockApiContext } from "@/contexts/character/domain/mockApiContext";
import { FavoritesProvider } from "@/contexts/character/hooks/favorites/favorites.provider";
import { CharacterApiProvider } from "@/contexts/character/infrastructure/character-api.provider";
import { fireEvent, render, screen } from "@testing-library/react";
import { CharacterCard } from "./character.card";
import { Character } from "@/contexts/character/domain/character";
import { useNavigate } from "react-router";
import { Mock } from "vitest";


vi.mock("react-router", () => ({
  useNavigate: vi.fn(() => ({
    navigate: vi.fn(),
  })),
}));


const mockCharacter = {
  id: 1,
  name: "Spider-Man",
  description: "Friendly neighborhood hero",
  image: "test"
};

const renderWithProvider = (character: Character) => {
  return render(
    <CharacterApiProvider context={mockApiContext([character], "marvel")}>
      <FavoritesProvider>
        <CharacterCard character={character} />
      </FavoritesProvider>
    </CharacterApiProvider>
  );
};

describe("CharacterCard", () => {
  it("should render the character name", () => {
    renderWithProvider(mockCharacter);
    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
  });

  it("should navigate to the character page when clicked", () => {
    const navigate = vi.fn();
    (useNavigate as Mock).mockReturnValue(navigate);

    renderWithProvider(mockCharacter);
    const card = screen.getByTestId(`character-card-${mockCharacter.id}`);
    fireEvent.click(card);
    expect(navigate).toHaveBeenCalledWith(`/character/${mockCharacter.id}`);
  });

  it("should render the character image", () => {
    renderWithProvider(mockCharacter);
    expect(screen.getByRole("img")).toHaveAttribute("src", mockCharacter.image);
  });

  it("should render the character favorite button", () => {
    renderWithProvider(mockCharacter);
    expect(screen.getByTestId(`character-favorite-button-${mockCharacter.id}`)).toBeInTheDocument();
  });
});
