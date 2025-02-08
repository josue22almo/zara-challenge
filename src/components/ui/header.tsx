import { NavLink, useNavigate } from "react-router";

import { FavoritesIcon } from "./favorites.icon";
import { AppIcon } from "./app.icon";
import { useFavoritesContext } from "@/contexts/character/hooks/useFavoritesContext";
import { Switch } from "@/components/ui/switch";
import { useCharacterApiContext } from "@/use-character.api.context";
import { cn } from "@/lib/utils";

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
    <>
      <nav className={
        cn(
          "w-full h-auto bg-black px-12 py-2 px-4 shadow-md",
          'sm:px-14',
          'md:px-16',
          'lg:px-24',
        )
      }>
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
    </>
  );
};
