// eslint.config.mjs
import js from "@eslint/js";

export default [
  js.configs.recommended,
  { 
      files: ["src/**/*.jsx"],
      rules: {
          "no-unused-vars": "error",
          "no-undef": "error",
          semi: "error",
      }
  }
];