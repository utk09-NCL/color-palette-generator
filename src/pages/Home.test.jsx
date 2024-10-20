import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { toast } from "react-hot-toast";

import Home from "./Home";

vi.mock("react-hot-toast", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    dismiss: vi.fn(),
  },
}));

describe("Home Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock navigator.clipboard.writeText
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(),
      },
    });
  });

  it("renders the main title", () => {
    const view = render(<Home />);
    expect(view.getByTestId("app-title")).toBeInTheDocument();
  });

  it("Add Color Set button is rendered", () => {
    const view = render(<Home />);
    expect(view.getByTestId("add-color-set-btn")).toBeInTheDocument();
  });

  it("renders the initial color section", () => {
    const view = render(<Home />);
    expect(view.getByTestId("color-section-primary")).toBeInTheDocument();
  });

  it("adds a color section when Add Color Set button is clicked", () => {
    const view = render(<Home />);
    const addButton = view.getByTestId("add-color-set-btn");
    fireEvent.click(addButton);
    expect(view.getByTestId("color-section-secondary")).toBeInTheDocument();
  });

  it("generates a custom name with a timestamp when all predefined names are used", () => {
    const view = render(<Home />);
    const addButton = view.getByTestId("add-color-set-btn");

    // Click the add button until all predefined names are used
    for (let i = 0; i < 8; i++) {
      fireEvent.click(addButton);
    }

    // Click one more time to generate a custom name
    fireEvent.click(addButton);

    // Check for the custom name with a timestamp
    const customNameRegex = /custom-\d+/;
    const customNameElement = screen.getByTestId(customNameRegex);
    expect(customNameElement).toBeInTheDocument();
  });

  it("removes a color section when delete button is clicked", () => {
    const view = render(<Home />);
    // const addButton = view.getByTestId("add-color-set-btn");
    // fireEvent.click(addButton);
    const deleteButton = view.getByTestId("delete-color-set-btn");
    fireEvent.click(deleteButton);
    const removedColorSection = screen.queryByTestId("color-section-primary");
    expect(removedColorSection).not.toBeInTheDocument();
  });

  it('exports all colors successfully as JSON when "Export All Colors to JSON" button is clicked', async () => {
    const view = render(<Home />);
    const addButton = view.getByTestId("generate-colors-btn");
    fireEvent.click(addButton);
    const exportButton = view.getByTestId("export-all-colors-json-btn");
    fireEvent.click(exportButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "All colors copied to clipboard!",
      );
    });
  });

  it('exports all colors fails as JSON when "Export All Colors to JSON" button is clicked', async () => {
    navigator.clipboard.writeText.mockRejectedValue(
      new Error("Failed to copy"),
    );

    const view = render(<Home />);
    const addButton = view.getByTestId("generate-colors-btn");
    fireEvent.click(addButton);
    const exportButton = view.getByTestId("export-all-colors-json-btn");
    fireEvent.click(exportButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to copy colors to clipboard.",
      );
    });
  });

  it('exports all colors successfully as CSS variables when "Export All Colors to HEX" button is clicked', async () => {
    const view = render(<Home />);
    const addButton = view.getByTestId("generate-colors-btn");
    fireEvent.click(addButton);
    const exportButton = view.getByTestId("export-all-colors-css-btn");
    fireEvent.click(exportButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "All colors copied to clipboard!",
      );
    });
  });

  it('exports all colors fails as CSS variables when "Export All Colors to HEX" button is clicked', async () => {
    navigator.clipboard.writeText.mockRejectedValue(
      new Error("Failed to copy"),
    );

    const view = render(<Home />);
    const addButton = view.getByTestId("generate-colors-btn");
    fireEvent.click(addButton);
    const exportButton = view.getByTestId("export-all-colors-css-btn");
    fireEvent.click(exportButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to copy colors to clipboard.",
      );
    });
  });
});
