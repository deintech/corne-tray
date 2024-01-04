import { nativeTheme } from 'electron/main'
import type { Theme } from './theme.types.js'

export const detectTheme = (): Theme => {
  return nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
}
