import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Tray } from 'electron/main'
import { nativeImage, type App } from 'electron'
import type { Caps } from './caps.types.js'
import { exitMenu } from './menu.js'
import { getCapsState } from './modifier.js'

const pathIconOff = path.join(fileURLToPath(import.meta.url), '../..', '/assets/icons/caps/OFF.png')
const iconImageOff = nativeImage.createFromPath(pathIconOff)

const icons: Record<Caps, string> = {
  ON: 'Caps Locks: ON',
  OFF: 'Caps Locks: OFF',
  'CW-ON': 'Caps Word: ON',
  'CW-OFF': 'Caps Word: OFF'
}

const reset = (tray: Tray): void => {
  tray.setImage(iconImageOff)
  tray.setToolTip(icons.OFF)
}

const update = (tray: Tray, key: Caps): void => {
  try {
    const iconPath = path.join(fileURLToPath(import.meta.url), '../..', `/assets/icons/caps/${key}.png`)
    const iconImage = nativeImage.createFromPath(iconPath)
    tray.setImage(iconImage)
    tray.setToolTip(icons[key])
  } catch (error) {
    reset(tray)
  }
}

export const create = (app: App): Tray => {
  const menu = exitMenu(app)

  const tray = new Tray(iconImageOff)
  tray.setToolTip('Waiting...')
  tray.setContextMenu(menu)
  return tray
}

export const set = (tray: Tray, key?: Caps): void => {
  if (key === 'CW-ON') {
    update(tray, key)
    // TODO: detect key press without SHIFT to disable
    setTimeout(() => {
      reset(tray)
    }, 750 * 1)
    return
  }

  if (key === 'CW-OFF') {
    update(tray, key)
    setTimeout(() => {
      reset(tray)
    }, 750 * 1)
    return
  }

  if (key === null || key === undefined) {
    const capsState = getCapsState()
    const current = capsState ? 'ON' : 'OFF'
    update(tray, current)
  }
}
