import nextPlugin from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

const typescriptConfigs = tseslint.configs.recommended.map((config) => ({
  ...config,
  files: ["**/*.{ts,tsx,mts,cts}"],
}));

const config = [
  { ignores: [".next/**", "node_modules/**", "out/**", "build/**"] },
  ...typescriptConfigs,
  {
    name: "next/core-web-vitals",
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"],
    plugins: { "@next/next": nextPlugin, "react-hooks": reactHooks },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/immutability": "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: { project: "./tsconfig.json" },
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: false },
      ],
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "react-hooks/immutability": "off",
    },
  },
];

export default config;