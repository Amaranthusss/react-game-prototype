import { createContext } from 'react'

import { Context } from 'react'

type EngineContext = null

export const engineContext: Context<EngineContext> =
  createContext<EngineContext>(null)
