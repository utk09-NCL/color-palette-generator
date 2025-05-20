// eslint.config.js

import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  // Base configuration and ignores
  {
    ignores: [
      "dist",
      "node_modules",
      "build",
      "coverage",
      "eslint.config.js",
      "tailwind.config.js",
      "postcss.config.js",
      "tsconfig.*.json",
      "vitest.setup.ts",
    ],
  },
  // TypeScript and React configurations
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: ["tsconfig.node.json", "tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        typescript: {
          project: "./tsconfig.app.json",
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
      "jsx-a11y": jsxA11y,
      prettier,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      // Base ESLint recommended rules
      ...js.configs.recommended.rules,

      // React and React Hooks recommended rules
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,

      // Import plugin recommended rules
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Built-in modules (e.g., fs, path) come first
            ["^node:?", "^[a-z]"],
            // External packages (e.g., react, lodash)
            ["^@?\\w"],
            // Internal aliases (e.g., @components, @utils)
            ["^@/"],
            // Parent imports (e.g., ../)
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Sibling imports (e.g., ./)
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Style imports (e.g., .css, .scss)
            ["^.+\\.?(css|scss|sass|less)$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",

      // JSX Accessibility recommended rules
      ...jsxA11y.configs.recommended.rules,

      // Disable rules that conflict with Prettier
      ...prettierConfig.rules,

      // TypeScript and additional custom rules
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],

      // Other custom rules
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "prettier/prettier": ["error"],
      "no-unused-vars": "off",
      "react/jsx-props-no-spreading": "off",
      "no-restricted-syntax": [
        "error",
        {
          selector: "OptionalMemberExpression",
          message: "Avoid using optional chaining unless necessary.",
        },
      ],
      "jsx-a11y/anchor-is-valid": "off",
    },
  },
];
