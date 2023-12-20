import { platform, release } from 'node:os'
import type { Os } from './os.types.js'

const isWSL = (): boolean => {
  const version = release().toLowerCase().trim()
  return version.includes('wsl') && version.includes('microsoft')
}

export const detectOs = (): Os | '' => {
  const os = platform().toLowerCase().replace(/\d/g, '')

  if (os === 'linux') {
    return isWSL() ? 'wsl' : os
  }

  if (os === 'darwin') {
    return 'macos'
  }

  if (os === 'win') {
    return 'windows'
  }

  return ''
}
