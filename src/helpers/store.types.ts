import type { Os } from './os.types.js'
import type { Caps } from './caps.types.js'
import type { Layers } from './layers.types.js'

export type StoreProps = {
  layer: Layers
  caps: Caps
  os?: Os
}
