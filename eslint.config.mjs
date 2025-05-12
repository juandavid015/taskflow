import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginQuery from "@tanstack/eslint-plugin-query";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Classic-style configs converted for flat config
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // TanStack Query plugin flat config
  ...pluginQuery.configs["flat/recommended"],

  // Optional: add custom rules or overrides below
  
];

export default eslintConfig;
