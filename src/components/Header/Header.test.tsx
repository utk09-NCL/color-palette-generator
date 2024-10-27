import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, beforeEach, vi } from "vitest";

import Header from "./Header";

// Mock window methods
const mockAddEventListener = vi.spyOn(window, "addEventListener");
const mockRemoveEventListener = vi.spyOn(window, "removeEventListener");

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
    });
    // Reset the window width for each test
    global.innerWidth = 1024; // Default to desktop
  });

  it("renders desktop view correctly", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    // Check desktop header is present
    const desktopHeader = screen.getByTestId("desktop-header");
    expect(desktopHeader).toBeInTheDocument();

    // Check home link
    const homeLink = screen.getByTestId("desktop-home-link");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");

    // Check GitHub link
    const githubLink = screen.getByTestId("desktop-github-link");
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/utk09-NCL/color-palette-generator/",
    );
  });

  it("toggles mobile menu when hamburger icon is clicked", () => {
    // Set window width to mobile view
    global.innerWidth = 500;

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    // Click hamburger button
    const hamburgerButton = screen.getByTestId("hamburger-button");
    fireEvent.click(hamburgerButton);

    // Check if menu is opened
    const mobileMenu = screen.getByTestId("mobile-menu");
    expect(mobileMenu).toHaveClass("translate-x-0");

    // Click close button
    const closeButton = screen.getByTestId("close-menu-button");
    fireEvent.click(closeButton);

    // Check if menu is closed
    expect(mobileMenu).toHaveClass("-translate-x-full");
  });

  it("has correct link attributes", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    // Check desktop GitHub link attributes
    const desktopGithubLink = screen.getByTestId("desktop-github-link");
    expect(desktopGithubLink).toHaveAttribute("target", "_blank");
    expect(desktopGithubLink).toHaveAttribute("rel", "noreferrer");
    expect(desktopGithubLink).toHaveAttribute(
      "href",
      "https://github.com/utk09-NCL/color-palette-generator/",
    );
  });

  it("adds and removes scroll event listener", () => {
    const { unmount } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(mockAddEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );
  });

  it("updates header style on scroll", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    // Simulate scroll
    Object.defineProperty(window, "scrollY", { value: 15 });
    fireEvent.scroll(window);

    const desktopHeader = screen.getByTestId("desktop-header");
    expect(desktopHeader).toHaveStyle({
      width: "100%",
      transform: "scale(1)",
      borderRadius: "0rem",
    });
  });

  it("closes mobile menu when navigation link is clicked", () => {
    global.innerWidth = 500;

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    // Open menu
    const hamburgerButton = screen.getByTestId("hamburger-button");
    fireEvent.click(hamburgerButton);

    // Click home link
    const mobileHomeLink = screen.getByTestId("mobile-home-link");
    fireEvent.click(mobileHomeLink);

    // Check if menu is closed
    const mobileMenu = screen.getByTestId("mobile-menu");
    expect(mobileMenu).toHaveClass("-translate-x-full");
  });
});
