import { useEffect, useRef, useState } from 'react'
import { usePlayerControler } from './hooks/usePlayerController'
import { useUnitsStore } from '@/store/units/useUnitsStore'
import { useRefState } from '@/hooks/useRefState'
import { useUITarget } from '../hooks/useUITarget'
import { useFrame } from '@react-three/fiber'

import * as THREE from 'three'
import _ from 'lodash'

import { CreateHero, FindUnit } from '@/store/units/interface'
import { UpdateUnitParameter } from '@/store/units/interface'
import { SimplePosition } from '@/interfaces/simplePosition'
import { RogueComponent } from '../../models/Rogue/Rogue.interface'
import { HeroProps } from './Hero.interface'
import { Rogue } from '../../models/Rogue/Rogue'
import { Unit } from '@/interfaces/unit'

import { Specialisation } from '@/interfaces/specialisation'
import { Config } from '@/constants/config'

export default function Hero({ groupProps, id, init }: HeroProps) {
  console.log('%cHero rendered', 'color: green')

  const [unitId] = useState<Unit['id']>(id ?? _.uniqueId())

  const meshRef = useRef<THREE.Mesh | null>(null)

  const { get: getRogueComponent, set: setRogueComponent } =
    useRefState<RogueComponent>()

  const createHero: CreateHero = useUnitsStore(({ createHero }) => createHero)

  const updateUnitParameter: UpdateUnitParameter = useUnitsStore(
    ({ updateUnitParameter }) => updateUnitParameter
  )

  const findUnit: FindUnit = useUnitsStore(({ findUnit }) => findUnit)

  const { onUITarget } = useUITarget(unitId, groupProps)

  useEffect((): void => {
    createHero({
      id: unitId,
      name: 'Rogue',
      position: [0, 0, 0],
      specialisation: Specialisation.Agility,
      agility: 5,
      intellect: 5,
      strength: 5,
      attack: { baseDamage: 20, range: 4, speed: 2, type: 'normal' },
      defence: { dodge: 0, type: 'medium', value: 2 },
      health: 420,
      mana: 100,
      movementSpeed: 2.5,
      fieldOfView: 60,
      icon: getRogueComponent().getIcon(),
    })
  }, [unitId, getRogueComponent, createHero])

  usePlayerControler(meshRef, init)

  useFrame((): void => {
    const prevPosition: SimplePosition =
      findUnit(unitId)?.position ?? Config.defaultPlayerPosition

    const worldPosition: THREE.Vector3 | undefined =
      meshRef.current?.getWorldPosition?.(new THREE.Vector3(0, 0, 0))

    if (worldPosition == null) {
      return
    }

    const nextPosition = _.map(
      [worldPosition.x, worldPosition.y, worldPosition.z],
      (point: number): number => _.round(point, 2)
    ) as SimplePosition

    if (_.isEqual(prevPosition, nextPosition)) {
      return
    }

    updateUnitParameter<'position'>(unitId, 'position', nextPosition)
  })

  return (
    <mesh ref={meshRef}>
      <Rogue
        groupProps={{ ...groupProps, onClick: onUITarget }}
        componentCallback={setRogueComponent}
      />
    </mesh>
  )
}
