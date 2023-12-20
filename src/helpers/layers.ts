import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Tray } from 'electron/main'
import { nativeImage, type App } from 'electron'
import type { Layers } from './layers.types.js'
import { exitMenu } from './menu.js'

const pathIconKbd = path.join(fileURLToPath(import.meta.url), '../..', '/assets/icons/layers/KBD.png')
const iconImageKbd = nativeImage.createFromPath(pathIconKbd)

const reset = (tray: Tray): void => {
  tray.setImage(iconImageKbd)
  tray.setToolTip('Waiting...')
}

export const set = (tray: Tray, key: Layers): void => {
  try {
    const iconPath = path.join(fileURLToPath(import.meta.url), '../..', `/assets/icons/layers/${key}.png`)
    const iconImage = nativeImage.createFromPath(iconPath)
    tray.setImage(iconImage)
    tray.setToolTip(`${key} Layer`)
  } catch (error) {
    reset(tray)
  }
}

export const create = (app: App): Tray => {
  const menu = exitMenu(app)

  const tray = new Tray(iconImageKbd)
  tray.setToolTip('Waiting...')
  tray.setContextMenu(menu)
  return tray
}
