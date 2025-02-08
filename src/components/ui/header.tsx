import { NavLink, useNavigate } from "react-router";

import { FavoritesIcon } from "./favorites.icon";
import { AppIcon } from "./app.icon";
import { useFavoritesContext } from "@/contexts/character/hooks/characters/useFavoritesContext";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useCharacterApiContext } from "@/contexts/character/domain/use-character.api.context";

export const Header = () => {
  const { hideFavorites } = useFavoritesContext();
  const { mode, toggleMode } = useCharacterApiContext();
  const navigate = useNavigate();

  const handleToggleMode = () => {
    navigate("/");
    toggleMode();
    hideFavorites();
  }

  return (
    <div className={
      cn(
        "fixed top-0 left-0 right-0 z-50",
        "w-full h-[84px] bg-black px-12 py-2 px-4 shadow-md",
        'lg:py-4',
        'xl:py-4',
      )
    }>
      <nav>
        <div className="flex items-center justify-between">
          <NavLink to="/" onClick={hideFavorites}>
            <AppIcon className="w-[130px] h-[52px]" />
          </NavLink>
          <div id="header-actions" className="flex items-center justify-end space-x-2">
            <NavLink to="/">
              <FavoritesIcon />
            </NavLink>
            <div className="flex items-center space-x-2">
              <Switch className="border-white" checked={mode === 'marvel'} onCheckedChange={handleToggleMode} />
              <span className="text-white lg:min-w-[80px]">
                {mode === 'marvel' ? 'Marvel' : 'Dragon Ball'}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
