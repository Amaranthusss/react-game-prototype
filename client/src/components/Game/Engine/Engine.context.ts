import { createContext } from 'react'

import { Context } from 'react'

type ContextProps = null

export const engineContext: Context<ContextProps> =
  createContext<ContextProps>(null)
