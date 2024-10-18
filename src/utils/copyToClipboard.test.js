import { beforeAll, vi, describe, it, expect } from "vitest";

import { copyToClipboard } from "./copyToClipboard.js";

describe("copyToClipboard", () => {
  beforeAll(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: vi.fn().mockResolvedValue(),
      },
    });
  });

  it("should copy the data sent to clipboard", async () => {
    const dataToCopy = "Hello, world!";
    await copyToClipboard(dataToCopy);
    expect(navigator.clipboard.readText == dataToCopy);
  });
});
