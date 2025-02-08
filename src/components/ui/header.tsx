import { NavLink, useNavigate } from "react-router";

import { FavoritesIcon } from "./favorites.icon";
import { AppIcon } from "./app.icon";
import { useFavoritesContext } from "@/contexts/character/hooks/useFavoritesContext";
import { Switch } from "@/components/ui/switch";
import { useCharacterApiContext } from "@/use-character.api.context";

export const Header = () => {
  const { hideFavorites } = useFavoritesContext();
  const { mode, toggleMode } = useCharacterApiContext();
  const navigate = useNavigate();


  const handleToggleMode = () => {
    navigate("/");
    toggleMode();
  }

  return (
    <>
      <nav className="w-full h-auto bg-black lg:px-24 md:px-16 sm:px-14 px-12 py-2 shadow-md">
        <div className="flex items-center justify-between">
          <NavLink to="/" onClick={hideFavorites}>
            <AppIcon />
          </NavLink>
          <div className="flex items-center space-x-2">
            <NavLink to="/">
              <FavoritesIcon />
            </NavLink>
            <div className="flex items-center space-x-2">
              <Switch className="border-white" checked={mode === 'marvel'} onCheckedChange={handleToggleMode} />
              <span className="text-white min-w-[80px]">
                {mode === 'marvel' ? 'Marvel' : 'Dragon Ball'}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
