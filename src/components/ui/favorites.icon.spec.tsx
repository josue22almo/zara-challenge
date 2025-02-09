import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { FavoritesIcon } from './favorites.icon';
import { useFavorites } from '@/contexts/character/hooks/favorites/useFavorites';
import { Mock } from 'vitest';
import { FavoritesProvider } from '@/contexts/character/hooks/favorites/favorites.provider';
import { CharacterApiProvider } from '@/contexts/character/infrastructure/character-api.provider';
import { mockApiContext } from '@/contexts/character/domain/mockApiContext';

vi.mock('@/contexts/character/hooks/favorites/useFavorites', () => ({
  useFavorites: vi.fn(() => ({
    total: 0,
    showFavorites: vi.fn(),
  }))
}));

const renderWithProvider = () => {
  return render(
    <CharacterApiProvider context={mockApiContext([], "marvel")}>
      <FavoritesProvider>
        <FavoritesIcon />
      </FavoritesProvider>
    </CharacterApiProvider>
  );
};

describe('FavoritesIcon', () => {
  it('should render with the correct total', () => {
    const mockTotal = 5;
    (useFavorites as Mock).mockReturnValue({
      total: mockTotal,
      showFavorites: vi.fn(),
    });

    renderWithProvider();
    
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should call showFavorites when clicked', () => {
    const showFavoritesMock = vi.fn();
    (useFavorites as Mock).mockReturnValue({
      total: 0,
      showFavorites: showFavoritesMock,
    });

    renderWithProvider();
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(showFavoritesMock).toHaveBeenCalledTimes(1);
  });

  it('should render heart icon with correct styling', () => {
    (useFavorites as Mock).mockReturnValue({
      total: 0,
      showFavorites: vi.fn(),
    });

    renderWithProvider();
    
    const heartIcon = screen.getByTestId('heart-icon');
    expect(heartIcon).toHaveClass('fill-[#ED1C24]', 'w-6', 'h-6');
  });
}); 