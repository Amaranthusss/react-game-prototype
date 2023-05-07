import { Environment } from './Environment/Environment'
import { Lighting } from './Lighting/Lighting'
import { Unit } from '../units/Unit/Unit'

import { useNeighborhood } from './hooks/useNeighborhood'
import { useEntityManager } from './hooks/useEntityManager'
import { useMoveToTargets } from './hooks/useMoveToTargets'
import { useGameStore } from '@/store/game/useGameStore'
import { useNavMesh } from './hooks/useNavMesh'
import { useFPS } from './hooks/useFPS'

import { lazy } from 'react'
import _ from 'lodash'

import { EngineProps } from './Engine.interface'

import { engineContext } from '@/components/Game/Engine/Engine.context'

const PlayerHero = lazy(() => import('@/components/Game/units/Hero/Hero'))

export function Engine({ children, getCanvas }: EngineProps) {
  const playerName: string = useGameStore(({ playerName }) => playerName)

  const { initNavMesh, onMoveToPoint } = useNavMesh(playerName, getCanvas)

  useFPS()
  useNeighborhood()
  useMoveToTargets()
  useEntityManager()

  return (
    <engineContext.Provider value={null}>
      <Environment onMoveToPoint={onMoveToPoint} />
      <Lighting />

      <PlayerHero
        init={initNavMesh}
        playerName={playerName}
        // groupProps={{ onClick: onUITarget }}
      />

      <Unit groupProps={{ onClick: (e) => console.log(e) }} />

      {children}
    </engineContext.Provider>
  )
}
