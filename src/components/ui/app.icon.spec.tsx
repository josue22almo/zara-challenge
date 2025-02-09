import { render, screen } from "@testing-library/react";
import { AppIcon } from "./app.icon";
import { CharacterApiProvider } from "@/contexts/character/infrastructure/character-api.provider";
import { mockApiContext } from "@/contexts/character/domain/mockApiContext";

describe("AppIcon", () => {
  it("should render marvel logo when mode is marvel", () => {
    render(
      <CharacterApiProvider context={mockApiContext([], "marvel")}>
        <AppIcon />
      </CharacterApiProvider>
    );
    expect(screen.getByAltText("Marvel Logo")).toBeInTheDocument();
  });

  it("should render dragon ball logo when mode is dragonBall", () => {
    render(
      <CharacterApiProvider context={mockApiContext([], "dragon-ball")}>
        <AppIcon />
      </CharacterApiProvider>
    );
    expect(screen.getByAltText("Dragon Ball Logo")).toBeInTheDocument();
  });
});
