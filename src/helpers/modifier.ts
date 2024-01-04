import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const nativeModule = require('../Release/controlModifiers.node')
export const { getCapsState, getNumState, getScrollState } = nativeModule
