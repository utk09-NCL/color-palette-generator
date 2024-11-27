// src/components/ColorSection/ColorSection.test.tsx

import { beforeEach, describe, expect, it, vi } from "vitest";

import { fireEvent, render, screen } from "@testing-library/react";

import ColorSection from "./ColorSection";

// Mock react-hot-toast (if used in your component)
vi.mock("react-hot-toast", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
    dismiss: vi.fn(),
  },
}));

describe("ColorSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const onDeleteMock = vi.fn();
  const onColorsGeneratedMock = vi.fn();
  const onColorNameChangeMock = vi.fn();
  const usedColorNames: string[] = [];

  it("renders with default color name", () => {
    render(
      <ColorSection
        colorName="primary"
        onColorNameChange={onColorNameChangeMock}
        onDelete={onDeleteMock}
        onColorsGenerated={onColorsGeneratedMock}
        usedColorNames={usedColorNames}
      />,
    );
    expect(screen.getByTestId("color-section-primary")).toBeInTheDocument();
  });

  it("renders with custom allowed color name", () => {
    render(
      <ColorSection
        colorName="secondary"
        onColorNameChange={onColorNameChangeMock}
        onDelete={onDeleteMock}
        onColorsGenerated={onColorsGeneratedMock}
        usedColorNames={usedColorNames}
      />,
    );
    expect(screen.getByTestId("color-section-secondary")).toBeInTheDocument();
  });

  it("initially does not display generated colors", () => {
    render(
      <ColorSection
        colorName="primary"
        onColorNameChange={onColorNameChangeMock}
        onDelete={onDeleteMock}
        onColorsGenerated={onColorsGeneratedMock}
        usedColorNames={usedColorNames}
      />,
    );
    expect(screen.queryByTestId("generated-colors-primary")).not.toBeInTheDocument();
  });

  it("displays generated colors when available", () => {
    render(
      <ColorSection
        colorName="primary"
        onColorNameChange={onColorNameChangeMock}
        onDelete={onDeleteMock}
        onColorsGenerated={onColorsGeneratedMock}
        usedColorNames={usedColorNames}
      />,
    );

    const generateColorsButton = screen.getByTestId("generate-colors-btn");
    fireEvent.click(generateColorsButton);

    expect(screen.getByTestId("generated-colors-primary")).toBeInTheDocument();
  });

  it("calls onDelete when the Remove button is clicked", () => {
    render(
      <ColorSection
        colorName="primary"
        onColorNameChange={onColorNameChangeMock}
        onDelete={onDeleteMock}
        onColorsGenerated={onColorsGeneratedMock}
        usedColorNames={usedColorNames}
      />,
    );

    const removeButton = screen.getByText("Remove");
    fireEvent.click(removeButton);

    expect(onDeleteMock).toHaveBeenCalled();
  });
});
