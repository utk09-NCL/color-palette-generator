// eslint.config.js

import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    ignores: ["dist", "node_modules"],
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
      "jsx-a11y": jsxA11y,
      prettier,
    },
    rules: {
      // Base ESLint recommended rules
      ...js.configs.recommended.rules,

      // React and React Hooks recommended rules
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Import plugin recommended rules
      ...importPlugin.configs.recommended.rules,

      // JSX Accessibility recommended rules
      ...jsxA11y.configs.recommended.rules,

      // Disable rules that conflict with Prettier
      ...prettierConfig.rules,

      // Custom rules
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "prettier/prettier": ["error"],

      // Additional custom rules for better code quality
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],
      "jsx-a11y/anchor-is-valid": "off",
    },
  },
];
