import clsx from "clsx";
import { type FC } from "react";
import { NavLink } from "react-router-dom";

import { HEADER_BUTTONS } from "../Layout/layoutConstant";

const NavBar: FC = () => {
  return (
    <nav className="sticky top-0 z-50 flex justify-around bg-slate-100 p-4 shadow-sm">
      {HEADER_BUTTONS.map(({ name, route }) => (
        <NavLink
          key={name}
          to={route}
          className={({ isActive }) =>
            clsx(
              "rounded-sm border border-slate-900 px-2 py-1 text-sm transition-colors",
              isActive
                ? "bg-slate-900 text-white"
                : "text-slate-900 hover:bg-slate-700 hover:text-white",
            )
          }
        >
          {name}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;
