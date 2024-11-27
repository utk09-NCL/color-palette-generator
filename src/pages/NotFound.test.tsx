import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { render, screen } from "@testing-library/react";

import NotFound from "./NotFound";

describe("NotFound Component", () => {
  it("renders the 404 message", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const errorMessage = screen.getByText("404");
    expect(errorMessage).toBeInTheDocument();

    const pageNotFoundMessage = screen.getByText("Page not found");
    expect(pageNotFoundMessage).toBeInTheDocument();

    const sorryMessage = screen.getByText("Sorry, we couldn't find the page you're looking for.");
    expect(sorryMessage).toBeInTheDocument();
  });

  it("renders the button with the correct link", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const linkElement = screen.getByRole("link", {
      name: /go back to color conjure/i,
    });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });
});
