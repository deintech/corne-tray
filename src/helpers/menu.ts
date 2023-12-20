import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Menu, nativeImage, type App } from 'electron'

export const exitMenu = (app: App) => {
  const exitPath = path.join(fileURLToPath(import.meta.url), '../..', '/assets/icons/menu/quit.png')
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
