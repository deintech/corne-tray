import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Tray, globalShortcut } from 'electron/main'
import { nativeImage, type App } from 'electron'
import type { Caps } from './caps.types.js'
import { exitMenu } from './menu.js'

const pathIconOff = path.join(fileURLToPath(import.meta.url), '../..', '/assets/icons/caps/OFF.png')
const iconImageOff = nativeImage.createFromPath(pathIconOff)

const icons: Record<Caps, string> = {
  ON: 'Caps Locks: ON',
  OFF: 'Caps Locks: OFF',
  'CW-ON': 'Caps Word: ON',
  'CW-OFF': 'Caps Word: OFF'
}

type CapsProps = {
  state: boolean
  words: string[]
}

const caps: CapsProps = {
  state: false,
  words: [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    ')', '!', '@', '#', '$', '%', '^', '&', '*', '(', ':', ';', ':', 'Plus', '=', '<', ',', '_', '-', '>', '.', '?', '/', '~', '`', '{', ']', '[', '|', '\\', '}', '"', "'",
    '0', 'Num0',
    '1', 'Num1',
    '2', 'Num2',
    '3', 'Num3',
    '4', 'Num4',
    '5', 'Num5',
    '6', 'Num6',
    '7', 'Num7',
    '8', 'Num8',
    '9', 'Num9',
    'Backspace',
    'Delete',
    'Space',
    'Tab',
    'Return',
    'Up',
    'Down',
    'Left',
    'Right',
    'Home',
    'End',
    'PageUp',
    'PageDown',
    'Esc'
  ]
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

const unregisterCapsWords = (): void => {
  caps.words.forEach((key) => {
    if (globalShortcut.isRegistered(key)) {
      globalShortcut.unregister(`${key}`)
    }
  })
}

const registerCapsWords = (tray: Tray): void => {
  caps.words.forEach((key) => {
    globalShortcut.register(`${key}`, () => {
      unregisterCapsWords()
      reset(tray)
    })
  })
}

export const set = (tray: Tray, key?: Caps): void => {
  if (key === 'CW-ON') {
    update(tray, key)
    registerCapsWords(tray)
    return
  }

  if (key === 'CW-OFF') {
    update(tray, key)
    unregisterCapsWords()
    setTimeout(() => {
      reset(tray)
    }, 750 * 1)
    return
  }

  if (key === null || key === undefined) {
    const state = caps.state
    const current = !state ? 'ON' : 'OFF'
    caps.state = !state
    update(tray, current)
  }
}
