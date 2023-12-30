module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
    // "plugin:prettier/recommended"
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    // 'vue/html-indent': ['error', 4],
    // "vue/component-name-in-template-casing": ["error", "PascalCase"],
    // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  globals: {
    _: true,
  },
};
