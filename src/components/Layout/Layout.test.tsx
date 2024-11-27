import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { render, screen } from "@testing-library/react";

import Layout from "./Layout";

// Mock the Header component
vi.mock("../Header/Header", () => ({
  default: () => <header data-testid="mock-header">Header Component</header>,
}));

// Mock the Outlet component
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Outlet: () => <div data-testid="mock-outlet">Outlet Content</div>,
  };
});

describe("Layout", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );
    expect(document.querySelector("div")).toBeInTheDocument();
  });

  it("renders the Header component", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
  });

  it("renders the Outlet component", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("mock-outlet")).toBeInTheDocument();
  });

  it("maintains correct component hierarchy", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );

    const rootDiv = document.querySelector("div");
    const header = screen.getByTestId("mock-header");
    const outlet = screen.getByTestId("mock-outlet");

    expect(rootDiv).toContainElement(header);
    expect(rootDiv).toContainElement(outlet);
  });

  it("renders Header before Outlet", () => {
    const { container } = render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );

    const children = container.firstChild ? (container.firstChild as Element).children : [];
    expect(children[0]).toHaveAttribute("data-testid", "mock-header");
    expect(children[1]).toHaveAttribute("data-testid", "mock-outlet");
  });
});
