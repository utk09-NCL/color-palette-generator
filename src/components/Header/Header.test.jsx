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

    // Check desktop header is present and hidden on mobile
    const desktopHeader = screen.getByTestId("desktop-header");
    expect(desktopHeader).toBeInTheDocument();
    expect(desktopHeader).toHaveClass("hidden", "lg:block");

    // Check brand name
    expect(screen.getAllByText("Color Conjure")).toHaveLength(2);

    // Check navigation links
    const homeLinks = screen.getAllByRole("link", { name: /home/i });
    expect(homeLinks[0]).toHaveAttribute("href", "/");

    const aboutLinks = screen.getAllByRole("link", { name: /about/i });
    expect(aboutLinks[0]).toHaveAttribute("href", "/about");

    // Check GitHub link
    const githubLink = screen.getByTestId("desktop-github-link");
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/utk09-NCL/color-palette-generator/",
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noreferrer");
  });

  it("toggles mobile menu when hamburger icon is clicked", () => {
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

  it("closes mobile menu when navigation links are clicked", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    // Open menu
    const hamburgerButton = screen.getByTestId("hamburger-button");
    fireEvent.click(hamburgerButton);

    // Click home link in mobile menu
    const homeLink = screen.getAllByRole("link", { name: /home/i });
    fireEvent.click(homeLink[0]);

    // Check if menu is closed
    const mobileMenu = screen.getByTestId("mobile-menu");
    expect(mobileMenu).toHaveClass("-translate-x-full");
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

    // Simulate scroll beyond maxScroll (10px)
    Object.defineProperty(window, "scrollY", { value: 15 });
    fireEvent.scroll(window);

    const desktopHeader = screen.getByTestId("desktop-header");

    // Check if header style is updated according to scrollProgress = 1
    expect(desktopHeader).toHaveStyle({
      width: "100%", // 100 - (1 - 1) * 20 = 100%
      transform: "scale(1)", // 0.9 + 1 * 0.1 = 1
      borderRadius: "0rem", // (1 - 1) * 0.75 = 0
    });
  });

  it("displays correct content in mobile menu", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    // Open mobile menu
    const hamburgerButton = screen.getByTestId("hamburger-button");
    fireEvent.click(hamburgerButton);

    // Check for menu title
    expect(screen.getByText("Menu")).toBeInTheDocument();

    // Check for navigation links
    const homeLink = screen.getAllByRole("link", { name: /home/i });
    expect(homeLink[0]).toBeInTheDocument();

    const aboutLink = screen.getAllByRole("link", { name: /about/i });
    expect(aboutLink[0]).toBeInTheDocument();

    // Check for GitHub link
    const githubLink = screen.getByTestId("mobile-github-link");
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/utk09-NCL/color-palette-generator/",
    );
  });

  it("adjusts padding based on scroll position", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    // Initially should have pt-4
    const headerWrapper = screen.getByTestId("desktop-header").parentElement;
    expect(headerWrapper).toHaveClass("pt-4");

    // Simulate scroll
    Object.defineProperty(window, "scrollY", { value: 15 });
    fireEvent.scroll(window);

    // Should now have pt-0
    expect(headerWrapper).toHaveClass("pt-0");
  });
});
