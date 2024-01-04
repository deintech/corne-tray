import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Tray } from 'electron/main'
import { nativeImage, type App, type NativeImage } from 'electron'
import type { Layers } from './layers.types.js'
import { exitMenu } from './menu.js'
import { getStore } from './store.js'

const store = getStore()

const getDefaultIcon = (): NativeImage => {
  const theme = store.get('theme')

  const pathIconKbd = path.join(fileURLToPath(import.meta.url), '../..', `/assets/icons/layers/${theme}/KBD.png`)
  const iconImageKbd = nativeImage.createFromPath(pathIconKbd)
  return iconImageKbd
}

const reset = (tray: Tray): void => {
  const iconImageKbd = getDefaultIcon()
  tray.setImage(iconImageKbd)
  tray.setToolTip('Waiting...')
}

export const set = (tray: Tray, key: Layers): void => {
  try {
    const theme = store.get('theme')

    const iconPath = path.join(fileURLToPath(import.meta.url), '../..', `/assets/icons/layers/${theme}/${key}.png`)
    const iconImage = nativeImage.createFromPath(iconPath)
    tray.setImage(iconImage)
    tray.setToolTip(`${key} Layer`)
  } catch (error) {
    reset(tray)
  }
}

export const create = (app: App): Tray => {
  const menu = exitMenu(app)

  const iconImageKbd = getDefaultIcon()
  const tray = new Tray(iconImageKbd)
  tray.setToolTip('Waiting...')
  tray.setContextMenu(menu)
  return tray
}
