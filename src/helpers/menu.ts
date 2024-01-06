import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Menu, nativeImage } from 'electron'
import { type App } from 'electron/main'
import { getStore } from './store.js'

const store = getStore()

export const exitMenu = (app: App) => {
  const theme = store.get('theme')

  const exitPath = path.join(fileURLToPath(import.meta.url), '../..', `/assets/icons/menu/${theme}/quit.png`)
  const exitIcon = nativeImage.createFromPath(exitPath)

  const menu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      role: 'quit',
      icon: exitIcon,
      click: () => {
        app.quit()
      }
    }
  ])

  return menu
}
