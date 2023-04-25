import { useUnitsRelations } from './hooks/useUnitsRelations'
import { useEntityManager } from './hooks/useEntityManager'
import { useFPS } from './hooks/useFPS'

import _ from 'lodash'

import { EngineProps } from './Engine.interface'

import { engineContext } from '@/components/_Game/Engine/Engine.context'

export function Engine({
  children,
  getScene,
  getCamera,
  getRenderer,
}: EngineProps) {
  useFPS()
  useUnitsRelations()
  useEntityManager(getRenderer, getCamera, getScene)

  return (
    <engineContext.Provider value={null}>{children}</engineContext.Provider>
  )
}
