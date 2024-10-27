import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import HEXColorInput from "./HEXColorInput";

describe("HEXColorInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const view = render(<HEXColorInput hex="#bc560a" onHexChange={vi.fn()} />);
    expect(view.getByTestId("hex-input")).toBeInTheDocument();
  });

  it("calls onHexChange when input value changes", () => {
    const onHexChange = vi.fn();
    const view = render(
      <HEXColorInput hex="#bc560a" onHexChange={onHexChange} />,
    );
    const input = view.getByTestId("hex-input");

    fireEvent.change(input, { target: { value: "#ffffff" } });

    expect(onHexChange).toHaveBeenCalledWith("#ffffff");
  });
});
