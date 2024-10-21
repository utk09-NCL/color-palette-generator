import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, expect, it } from "vitest";

import Header from "./Header";

describe("Header", () => {
  it("renders the header with the expected content", () => {
    render(
      <Router>
        <Header />
      </Router>,
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();

    // Check if the logo is displayed
    expect(screen.getByText("Color Conjure")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /GitHub/i })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /Home/i })).toBeInTheDocument();
  });

  it("toggles the mobile menu when the hamburger button is clicked", () => {
    render(
      <Router>
        <Header />
      </Router>,
    );

    const hamburgerButton = screen.getByRole("button", { name: /open menu/i });

    fireEvent.click(hamburgerButton);

    expect(screen.getByRole("navigation")).toBeInTheDocument();

    fireEvent.click(hamburgerButton);

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });
});
