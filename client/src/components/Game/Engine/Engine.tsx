import { BulletsCollector } from './BulletsCollector/BulletsCollector'
import { Environment } from './Environment/Environment'
import { Lighting } from './Lighting/Lighting'
import { Unit } from '../Unit/Unit'

import { useEntityManager } from './hooks/useEntityManager'
import { useMoveToTargets } from './hooks/useMoveToTargets'
import { useNeighborhood } from './hooks/useNeighborhood'
import { useGameStore } from '@/store/game/useGameStore'
import { useNavMesh } from './hooks/useNavMesh'
import { useState } from 'react'
import { useFPS } from './hooks/useFPS'

import { lazy } from 'react'
import _ from 'lodash'

import { BulletsCollectorComponent } from './BulletsCollector/BulletsCollector.interface'
import { EngineProps } from './Engine.interface'

import { engineContext } from '@/components/Game/Engine/Engine.context'

const PlayerHero = lazy(() => import('@/components/Game/Unit/Hero/Hero'))

export function Engine({ children, getCanvas }: EngineProps) {
  const playerName: string = useGameStore(({ playerName }) => playerName)

  const { initNavMesh, onMoveToPoint } = useNavMesh(playerName, getCanvas)

  const [bulletsCollector, setBulletsCollector] =
    useState<BulletsCollectorComponent>()

  useFPS()
  useNeighborhood()
  useMoveToTargets()
  useEntityManager()

  return (
    <engineContext.Provider value={{ bulletsCollector }}>
      <Environment onMoveToPoint={onMoveToPoint} />
      <Lighting />

      <BulletsCollector componentCallback={setBulletsCollector} />

      <PlayerHero init={initNavMesh} playerName={playerName} />
      <Unit />

      {children}
    </engineContext.Provider>
  )
}
