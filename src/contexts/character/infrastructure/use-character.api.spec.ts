import { renderHook, act } from '@testing-library/react'
import { useCharacterApi } from "./use-character.api";

describe('useCharacterApi', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return the marvel api as default', () => {
    const { result } = renderHook(() => useCharacterApi());
    expect(result.current.api).toBeDefined();
    expect(result.current.mode).toBe('marvel');
  });

  it('should return the dragon ball api when the mode is dragon ball', () => {
    localStorage.setItem('characterMode', 'dragon-ball');
    const { result } = renderHook(() => useCharacterApi());
    expect(result.current.api).toBeDefined();
    expect(result.current.mode).toBe('dragon-ball');
  });

  it('should toggle the mode when the toggleMode function is called', () => {
    const { result } = renderHook(() => useCharacterApi());
    expect(result.current.mode).toBe('marvel');
    act(() => {
      result.current.toggleMode();
    });
    expect(result.current.mode).toBe('dragon-ball');
    act(() => {
      result.current.toggleMode();
    });
    expect(result.current.mode).toBe('marvel');
  });

  it('should save the mode in localStorage when the toggleMode function is called', () => {
    const { result } = renderHook(() => useCharacterApi());
    act(() => {
      result.current.toggleMode();
    });
    expect(localStorage.getItem('characterMode')).toBe('dragon-ball');
  });
  
  
});
