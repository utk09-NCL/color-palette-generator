import { beforeAll, vi, describe, it, expect } from "vitest";

import { copyToClipboard } from "./copyToClipboard";

describe("copyToClipboard", () => {
  beforeAll(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: vi.fn().mockResolvedValue(undefined),
        readText: vi.fn().mockResolvedValue("Hello, world!"),
      },
    });
  });

  it("should copy the data sent to clipboard", async () => {
    const dataToCopy = "Hello, world!";
    await copyToClipboard(dataToCopy);
    const copiedText = await window.navigator.clipboard.readText();
    expect(copiedText).toBe(dataToCopy);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(dataToCopy);
  });
});
