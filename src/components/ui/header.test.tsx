import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './header';
import { MemoryRouter, useNavigate } from 'react-router';
import { FavoritesContext } from '@/contexts/character/hooks/favorites/favorites.context';
import { CharacterApiContext, CharacterApiContextType } from '@/contexts/character/domain/character-api.context';
import { FavoritesContextType } from '@/contexts/character/hooks/favorites/useFavorites';


vi.mock(import("react-router"), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})


const mockHideFavorites = vi.fn();
const mockToggleMode = vi.fn();

const renderHeader = (mode: "marvel" | "dragon-ball" = 'marvel') => {
  return render(
    <MemoryRouter>
      <FavoritesContext.Provider value={{ hideFavorites: mockHideFavorites } as unknown as FavoritesContextType}>
        <CharacterApiContext.Provider value={{ mode, toggleMode: mockToggleMode } as unknown as CharacterApiContextType}>
          <Header />
        </CharacterApiContext.Provider>
      </FavoritesContext.Provider>
    </MemoryRouter>
  );
};

describe('Header', () => {
  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(vi.fn());
  })

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render a NavLink with the app icon to navigate to the home page', () => {
    renderHeader();
    const appLogo = screen.getByTestId('app-icon-link');
    
    expect(appLogo).toBeInTheDocument();
    expect(appLogo).toHaveAttribute('href', '/');
  })

  it('should call hideFavorites when clicking the app logo', () => {
    renderHeader();
    const appLogo = screen.getByTestId('app-icon');
    
    fireEvent.click(appLogo);
    
    expect(mockHideFavorites).toHaveBeenCalledTimes(1);
  });

  it('should toggle mode and hide favorites when switching between Marvel and Dragon Ball', () => {
    renderHeader();
    const modeSwitch = screen.getByRole('switch');
    
    fireEvent.click(modeSwitch);
    
    expect(mockToggleMode).toHaveBeenCalledTimes(1);
    expect(mockHideFavorites).toHaveBeenCalledTimes(1);
  });

  it('should display correct mode text', () => {
    renderHeader('marvel');
    expect(screen.getByText('Marvel')).toBeInTheDocument();
    
    renderHeader('dragon-ball');
    expect(screen.getByText('Dragon Ball')).toBeInTheDocument();
  });
}); 