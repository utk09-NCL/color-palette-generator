/// <reference types="vite/client" />
/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    reporters: ["default", "junit"],
    outputFile: { junit: "./reports/junit/junit.xml" },
    setupFiles: ["vitest.setup.js"],
    coverage: {
      provider: "istanbul",
      include: ["src/**/*"],
      exclude: ["src/**/*.test.js*", "src/main.jsx", "src/App.jsx"],
      reporter: ["text", "json-summary"],
      thresholds: {
        perFile: true,
        statements: 100,
        lines: 100,
      },
    },
  },
});
