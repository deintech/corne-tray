import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { getStore } from './store.js'
import { shell } from 'electron'

const store = getStore()

export const openHelp = async (): Promise<void> => {
  const os = store.get('os')

  let layer = store.get('layer')
  if (layer === 'FNK') {
    layer = 'AXN'
  }

  if (layer !== 'KBD') {
    const imagePath = `assets/layers/${os}/${layer}.png`
    const helpPath = path.join(fileURLToPath(import.meta.url), '../..', imagePath)

    await shell.openPath(helpPath)
  }
}
