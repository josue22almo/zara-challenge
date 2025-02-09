import { render, screen } from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";
import { ScreenTestWrapper } from "./screen.test-wrapper";
import { mockApiContext } from "@/contexts/character/domain/mockApiContext";
import { CharacterScreen } from "./character.screen";
import { useParams } from "react-router";


vi.mock(import("react-router"), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useParams: vi.fn().mockReturnValue({ id: "1" }),
  }
})

const characters = [
  { id: 1, name: "John Doe", image: "https://via.placeholder.com/150", description: "John Doe is a character" },
  { id: 2, name: "Jane Doe", image: "https://via.placeholder.com/150", description: "Jane Doe is a character" },
];

describe("CharacterScreen", () => {
  const queryClient = new QueryClient();  

  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ id: "1" });
  })

  afterEach(() => {
    vi.clearAllMocks();
  })

  it("should render the character image, name and description", async() => {
    render(
      <CharacterScreen />,
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

    const characterName = await screen.findByText(`${characters[0].name}`);
    expect(characterName).toBeInTheDocument();

    expect(screen.getByTestId("character-photo")).toHaveAttribute("src", characters[0].image);

    const characterDescription = await screen.findByText(`${characters[0].description}`);
    expect(characterDescription).toBeInTheDocument();
  });

  it('should render the character appearances', async () => {
    const appearances = [
      { id: 1, name: "Comic 1", image: "https://via.placeholder.com/150", description: "Comic 1 is a comic" },
      { id: 2, name: "Comic 2", image: "https://via.placeholder.com/150", description: "Comic 2 is a comic" },
    ];

    render(
      <CharacterScreen />,
      {
        wrapper: ({ children }) => (
          <ScreenTestWrapper 
            queryClient={queryClient}
            context={mockApiContext(characters, "marvel", appearances)}
          >
            {children}
          </ScreenTestWrapper>
        )
      }
    );

    const appearancesCards = await screen.findAllByTestId(/^appearance-card-/);
    expect(appearancesCards).toHaveLength(appearances.length);
  })

  it('should not render the character appearances when there are no appearances', async () => {
    render(
      <CharacterScreen />,
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

    expect(await screen.findByText("No appearances found")).toBeInTheDocument();
  })
});
