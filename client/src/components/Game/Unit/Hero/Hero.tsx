import { Ring } from '@react-three/drei'

import { useEffect, useRef, useState } from 'react'
import { usePlayerControler } from './hooks/usePlayerController'
import { useEntityVehicle } from '../hooks/useEntityVehicle'
import { useUnitPosition } from '../hooks/useUnitPosition'
import { useUnitsStore } from '@/store/units/useUnitsStore'
import { useRefState } from '@/hooks/useRefState'
import { useUITarget } from '../hooks/useUITarget'

import * as THREE from 'three'
import _ from 'lodash'

import { RogueComponent } from '../../../../models/Rogue/Rogue.interface'
import { Specialisation } from '@/interfaces/specialisation'
import { SimplePosition } from '@/interfaces/simplePosition'
import { CreateHero } from '@/store/units/interface'
import { HeroProps } from './Hero.interface'
import { Rogue } from '../../../../models/Rogue/Rogue'
import { Unit } from '@/interfaces/unit'

export default function Hero({ groupProps, playerName, init }: HeroProps) {
  const [unitId] = useState<Unit['id']>(playerName ?? _.uniqueId())

  const [initPos] = useState<SimplePosition>([0, -1, 0])

  const meshRef = useRef<THREE.Mesh | null>(null)

  const { get: getRogueComponent, set: setRogueComponent } =
    useRefState<RogueComponent>()

  const createHero: CreateHero = useUnitsStore(({ createHero }) => createHero)

  const { uiTargetId, onUITarget } = useUITarget(unitId, groupProps)

  const { initVehicle } = useEntityVehicle(unitId, meshRef, initPos)

  useEffect((): void => {
    createHero({
      id: unitId,
      name: 'Rogue',
      position: initPos,
      specialisation: Specialisation.Agility,
      agility: 5,
      intellect: 5,
      strength: 5,
      attack: { baseDamage: 20, range: 4, speed: 2, type: 'normal' },
      defence: { dodge: 0, type: 'medium', value: 2 },
      health: 420,
      mana: 100,
      movementSpeed: 2.5,
      fieldOfView: 600,
      icon: getRogueComponent().getIcon(),
      player: playerName ?? '_player',
    })

    initVehicle()
    console.log(`%c[Hero #${unitId}] Initialized`, 'color: gray')
  }, [unitId, playerName, initPos, getRogueComponent, createHero, initVehicle])

  useUnitPosition(unitId)
  usePlayerControler(meshRef, init)

  return (
    <mesh ref={meshRef}>
      <Ring
        args={[_.isEqual(unitId, uiTargetId) ? 1.5 : 0, 1.3]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={'green'} />
      </Ring>

      <Rogue
        groupProps={{ ...groupProps, onClick: onUITarget }}
        componentCallback={setRogueComponent}
      />
    </mesh>
  )
}
