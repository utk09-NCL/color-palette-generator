import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { toast } from "react-hot-toast";

import ColorSection from "./ColorSection";

// Mock react-hot-toast
vi.mock("react-hot-toast", () => ({
  toast: {
    error: vi.fn(),
    dismiss: vi.fn(),
  },
}));

describe("ColorSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const onDeleteMock = vi.fn();
  const onColorsGeneratedMock = vi.fn();

  it("renders with default color name", () => {
    const view = render(
      <ColorSection
        onDelete={onDeleteMock}
        onColorsGenerated={onColorsGeneratedMock}
      />,
    );
    expect(view.getByTestId("color-section-primary")).toBeInTheDocument();
  });

  it("renders with custom allowed color name", () => {
    const view = render(
      <ColorSection
        initialColorName="secondary"
        onDelete={onDeleteMock}
        onColorsGenerated={onColorsGeneratedMock}
      />,
    );
    expect(view.getByTestId("color-section-secondary")).toBeInTheDocument();
  });

  it("initially does not display generated colors", () => {
    const view = render(
      <ColorSection
        onDelete={onDeleteMock}
        onColorsGenerated={onColorsGeneratedMock}
      />,
    );
    expect(
      view.queryByTestId("generated-colors-primary"),
    ).not.toBeInTheDocument();
  });

  it("displays generated colors when available", () => {
    const view = render(
      <ColorSection
        onDelete={onDeleteMock}
        onColorsGenerated={onColorsGeneratedMock}
      />,
    );

    const generateColorsButton = view.getByTestId("generate-colors-btn");
    fireEvent.click(generateColorsButton);

    expect(view.getByTestId("generated-colors-primary")).toBeInTheDocument();
  });

  it("displays generated colors uses primary when empty string color name", () => {
    const view = render(
      <ColorSection
        initialColorName={"    "} // testing for spaces in input
        onDelete={onDeleteMock}
        onColorsGenerated={onColorsGeneratedMock}
      />,
    );

    const generateColorsButton = view.getByTestId("generate-colors-btn");
    fireEvent.click(generateColorsButton);

    expect(view.getByTestId("generated-colors-primary")).toBeInTheDocument();
  });

  it("does not render with custom not allowed color name", async () => {
    render(
      <ColorSection
        initialColorName="randomColorName"
        onDelete={onDeleteMock}
        onColorsGenerated={onColorsGeneratedMock}
      />,
    );

    const generateColorsButton = screen.getByTestId("generate-colors-btn");
    fireEvent.click(generateColorsButton);

    expect(toast.error).toHaveBeenCalledWith(
      "Invalid color name. Use one of the following: primary, secondary, tertiary, accent, info, success, warning, error, custom",
    );
  });

  it("sets color name on input", () => {
    render(
      <ColorSection
        initialColorName="newColourName"
        onDelete={onDeleteMock}
        onColorsGenerated={onColorsGeneratedMock}
      />,
    );

    const input = screen.getByPlaceholderText(
      "Color Name: primary, secondary...",
    );
    fireEvent.change(input, { target: { value: "newColorName" } });

    expect((input as HTMLInputElement).value).toBe("newColorName");
  });
});
