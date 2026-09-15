import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  // `next lint` used to exclude these automatically; the plain `eslint` CLI
  // (which the removal of `next lint` in Next.js 16 requires switching to)
  // does not, so without this it lints Next's own generated .next/ output.
  { ignores: [".next/**", "out/**", "node_modules/**"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
