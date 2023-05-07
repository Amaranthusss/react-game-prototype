import { createContext } from 'react'

import { BulletsCollectorComponent } from './BulletsCollector/BulletsCollector.interface'
import { Context } from 'react'

export interface EngineContext {
  bulletsCollector: BulletsCollectorComponent | undefined
}

export const engineContext: Context<EngineContext> =
  createContext<EngineContext>({ bulletsCollector: undefined })
