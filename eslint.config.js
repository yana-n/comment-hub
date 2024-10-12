import vue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier'
import typescriptParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'

export default [
  {
    files: ['**/*.ts', '**/*.js', '**/*.vue'],
    languageOptions: {
      parser: typescriptParser, // Убедитесь, что это объект
      sourceType: 'module',
    },
    plugins: {
      vue,
      prettier,
    },
    rules: {
      ...vue.configs.base.rules, // базовые правила vue
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser, // Убедитесь, что это объект
    },
    rules: {
      'vue/no-unused-vars': 'error',
    },
  },
]
