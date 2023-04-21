import { createContext } from 'react'

import { EntityManager } from 'yuka'

import { Context } from 'react'

export const engineContext: Context<() => EntityManager | null> = createContext<
  () => EntityManager | null
>(() => null)
