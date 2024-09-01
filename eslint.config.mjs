import globals from "globals";
import pluginJs from "@eslint/js";
// import pluginReact from "eslint-plugin-react";


export default [
  {
    ignores: ["**/dist/**", "**/docs/**", "**/node_modules/**"]
  },
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  // pluginReact.configs.flat.recommended,
  {
    files: ["webpack.*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        __dirname: "readonly",
        require: "readonly",
        module: "writable"
      },
  },
},
{
  settings: {
    react: {
      version: 'detect'
    }
  }
},
];