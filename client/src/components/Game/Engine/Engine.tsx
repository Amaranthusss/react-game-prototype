import { Environment } from './Environment/Environment'
import { Lighting } from './Lighting/Lighting'
import { Unit } from '../units/Unit/Unit'

import { useUnitsRelations } from './hooks/useUnitsRelations'
import { useEntityManager } from './hooks/useEntityManager'
import { useUnitsStates } from './hooks/useUnitsStates'
import { useCallback } from 'react'
import { useGameStore } from '@/store/game/useGameStore'
import { useNavMesh } from './hooks/useNavMesh'
import { useFPS } from './hooks/useFPS'

import { lazy } from 'react'
import _ from 'lodash'

import { SetUITargetId } from '@/store/game/interface'
import { EngineProps } from './Engine.interface'
import { ThreeEvent } from '@react-three/fiber'

import { engineContext } from '@/components/Game/Engine/Engine.context'

const Player = lazy(() => import('@/components/Game/units/Hero/Hero'))

export function Engine({ children, getCanvas }: EngineProps) {
  const playerName: string = useGameStore(({ playerName }) => playerName)

  const setUITargetId: SetUITargetId = useGameStore(
    ({ setUITargetId }) => setUITargetId
  )

  const { init, moveToPoint } = useNavMesh(playerName, getCanvas)

  const onMoveToPoint = useCallback(
    (event: ThreeEvent<MouseEvent>): void => {
      moveToPoint(event)
    },
    [moveToPoint]
  )

  const onUITarget = useCallback((event: ThreeEvent<MouseEvent>): void => {
    console.log(event)
  }, [])

  useFPS()
  useUnitsStates()
  useEntityManager()
  useUnitsRelations()

  return (
    <engineContext.Provider value={null}>
      <Environment onMoveToPoint={onMoveToPoint} />
      <Lighting />

      <Player
        init={init}
        id={playerName}
        // groupProps={{ onClick: onUITarget }}
      />

      <Unit groupProps={{ onClick: (e) => console.log(e) }} />

      {children}
    </engineContext.Provider>
  )
}
