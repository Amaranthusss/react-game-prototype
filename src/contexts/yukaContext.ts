import { createContext } from 'react'

import { EntityManager } from 'yuka'

import { Context } from 'react'

export const yukaContext: Context<EntityManager> = createContext<EntityManager>(
  new EntityManager()
)
