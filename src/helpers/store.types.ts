import type { Os } from './os.types.js'
import type { Theme } from './theme.types.js'
import type { Caps } from '../tray/caps.types.js'
import type { Layers } from '../tray/layers.types.js'

export type StoreProps = {
  layer: Layers
  theme: Theme
  caps: Caps
  os?: Os
}
