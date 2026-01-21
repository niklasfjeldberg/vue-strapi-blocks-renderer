import pluginVue from 'eslint-plugin-vue'
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfigWithVueTs(
  {
    ignores: ['dist/**', 'node_modules/**', '.env', 'coverage/**'],
  },
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    jsx: true,
    braceStyle: '1tbs',
  }),
  {
    rules: {
      // Vue specific rules
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],

      // Stylistic adjustments
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/arrow-parens': ['error', 'always'],
    },
  },
)
