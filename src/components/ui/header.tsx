import { NavLink } from "react-router";
import { FavoritesIcon } from "./favorites.icon";
import { AppIcon } from "./app.icon";
export const Header = () => {
  return (
    <>
      <nav className="w-full h-auto bg-black lg:px-24 md:px-16 sm:px-14 px-12 py-2 shadow-md">
        <div className="flex items-center justify-between">
          <NavLink to="/">
            <AppIcon />
          </NavLink>
          <div>
            <FavoritesIcon />
          </div>
        </div>
      </nav>
    </>
  );
};
