import { Environment } from './Environment/Environment'
import { Lighting } from './Lighting/Lighting'

import { useUnitsRelations } from './hooks/useUnitsRelations'
import { useEntityManager } from './hooks/useEntityManager'
import { useUnitsStates } from './hooks/useUnitsStates'
import { useCallback } from 'react'
import { useGameStore } from '@/store/game/useGameStore'
import { useNavMesh } from './hooks/useNavMesh'
import { useFPS } from './hooks/useFPS'

import { lazy } from 'react'
import _ from 'lodash'

import { EngineProps } from './Engine.interface'
import { ThreeEvent } from '@react-three/fiber'

import { engineContext } from '@/components/Game/Engine/Engine.context'

const Player = lazy(() => import('@/components/Game/units/Hero/Hero'))

export function Engine({ children }: EngineProps) {
  const playerName: string = useGameStore(({ playerName }) => playerName)

  const { init, moveToPoint } = useNavMesh(playerName)

  const onMoveToPoint = useCallback(
    (event: ThreeEvent<MouseEvent>): void => {
      moveToPoint(event)
    },
    [moveToPoint]
  )

  useFPS()
  useUnitsStates()
  useEntityManager()
  useUnitsRelations()

  return (
    <engineContext.Provider value={null}>
      <Player init={init} id={playerName} />
      <Environment onMoveToPoint={onMoveToPoint} />
      <Lighting />

      {children}
    </engineContext.Provider>
  )
}
