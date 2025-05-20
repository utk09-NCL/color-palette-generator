// src/components/Layout/SimpleLayout.tsx

import type { FC, ReactNode } from "react";

import NavBar from "../NavBar/NavBar";

type SimpleLayoutProps = {
  children: ReactNode;
};

/**
 * Simple Layout Component to render a full-screen layout
 */
const SimpleLayout: FC<SimpleLayoutProps> = ({ children }) => {
  return (
    <main>
      <NavBar />
      <section className="mx-auto max-w-7xl p-2">{children}</section>
    </main>
  );
};

export default SimpleLayout;
