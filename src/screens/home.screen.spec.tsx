import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HomeScreen } from "./home.screen";
import { QueryClient } from "@tanstack/react-query";
import { ScreenTestWrapper } from "./screen.test-wrapper";
import { Character } from "@/contexts/character/domain/character";
import { CharacterApiContextType } from "@/contexts/character/domain/character-api.context";

describe("HomeScreen", () => {
  const queryClient = new QueryClient();

  const mockApiContext = (characters: Character[], mode: "marvel" | "dragon-ball"): CharacterApiContextType => ({
    api: {
      getCharacters: vi.fn().mockImplementation((search: string) => Promise.resolve(
        search.length > 0 ? characters.filter(c => c.name.toLowerCase().includes(search.toLowerCase())) : characters
      )),
      getCharacterById: vi.fn().mockImplementation((id: number) => Promise.resolve(characters.find(c => c.id === id))),
      getCharacterAppearances: vi.fn()
    },
    mode,
    toggleMode: vi.fn(),
  });

  it("should render as many characters as the api returns", async() => {
    const characters = [
      { id: 1, name: "John Doe", image: "https://via.placeholder.com/150" },
      { id: 2, name: "Jane Doe", image: "https://via.placeholder.com/150" },
    ] as Character[];

    render(
      <HomeScreen />,
      {
        wrapper: ({ children }) => (
          <ScreenTestWrapper 
            queryClient={queryClient}
            context={mockApiContext(characters, "marvel")}
          >
            {children}
          </ScreenTestWrapper>
        )
      }
    );

    const resultText = await screen.findByText(`${characters.length} results`);
    expect(resultText).toBeInTheDocument();

    const characterCards = screen.getAllByTestId(/^character-card-/);
    expect(characterCards).toHaveLength(characters.length);
  });

  it('should trigger useCharacters when searching', async () => {
    const characters = [
      { id: 1, name: "John Doe", image: "https://via.placeholder.com/150" },
      { id: 2, name: "Jane Doe", image: "https://via.placeholder.com/150" },
    ] as Character[];

    const apiContext = mockApiContext(characters, "marvel");
    
    render(
      <HomeScreen />,
      {
        wrapper: ({ children }) => (
          <ScreenTestWrapper 
            queryClient={queryClient}
            context={apiContext}
          >
            {children}
          </ScreenTestWrapper>
        )
      }
    );

    const searchInput = screen.getByPlaceholderText("Search for a character");
    
    fireEvent.change(searchInput, { target: { value: "John" } });

    await waitFor(() => {
      expect(apiContext.api.getCharacters).toHaveBeenCalledWith("John");
    });

    const resultText = await screen.findByText(`1 results`);
    expect(resultText).toBeInTheDocument();

    const characterCards = screen.getAllByTestId(/^character-card-/);
    expect(characterCards).toHaveLength(1);
  });
});
