// src/components/Layout/Layout.tsx

import { type ReactElement } from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";

/**
 * Layout component that includes the Header and an Outlet for nested routes.
 *
 * @returns {ReactElement} The rendered layout component.
 */
const Layout = (): ReactElement => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
