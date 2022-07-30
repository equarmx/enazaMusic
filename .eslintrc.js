module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', {
      "endOfLine": "auto",
      "printWidth": 100
    }],
    'vue/html-indent': ['error', 4],
    'vue/singleline-html-element-content-newline': 0,
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/valid-v-slot': [
      'error',
      {
        allowModifiers: true,
      },
    ],
  },
  globals: {
    _: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
}
