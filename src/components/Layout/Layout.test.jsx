import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import Layout from "./Layout";

describe("Layout", () => {
  it("renders the Header component", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("banner")).toContainElement(
      screen.getByRole("heading", { name: /Color Conjure/i }),
    );
  });

  it("renders the Outlet component", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
  });
});
