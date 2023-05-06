import { Sphere, Ring } from '@react-three/drei'

import { useEffect, useRef, useState } from 'react'
import { useEntityVehicle } from '../hooks/useEntityVehicle'
import { useUnitPosition } from '../hooks/useUnitPosition'
import { useUnitsStore } from '@/store/units/useUnitsStore'
import { useGameStore } from '@/store/game/useGameStore'
import { useUITarget } from '../hooks/useUITarget'

import * as THREE from 'three'
import _ from 'lodash'

import { SimplePosition } from '@/interfaces/simplePosition'
import { CreateUnit } from '@/store/units/interface'
import { UnitProps } from './Unit.interface'
import { Unit } from '@/interfaces/unit'

import creepIcon from '@/assets/icons/creep.jpg'

export function Unit({ groupProps }: UnitProps): JSX.Element {
  console.log('%cUnit rendered', 'color: green')

  const uiTargetId: string | undefined = useGameStore(
    ({ uiTargetId }) => uiTargetId
  )

  const [unitId] = useState<Unit['id']>(_.uniqueId())

  const [initPos] = useState<SimplePosition>([
    _.random(true) * 20,
    -1,
    _.random(true) * 20,
  ])

  const createUnit: CreateUnit = useUnitsStore(({ createUnit }) => createUnit)

  const groupRef = useRef<THREE.Group | null>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)

  const { onUITarget } = useUITarget(unitId, groupProps)

  const { initVehicle } = useEntityVehicle(unitId, meshRef, initPos)

  useEffect((): void => {
    createUnit({
      id: unitId,
      name: 'Creep',
      position: initPos,
      attack: { baseDamage: 20, range: 40, speed: 2, type: 'normal' },
      defence: { dodge: 0, type: 'medium', value: 2 },
      health: 420,
      mana: 100,
      movementSpeed: 2.5,
      fieldOfView: 150,
      icon: creepIcon,
    })

    initVehicle()
    console.log(`%c[Unit #${unitId}] Initialized`, 'color: gray')
  }, [unitId, createUnit, initPos, initVehicle])

  useUnitPosition(unitId)

  return (
    <group {...groupProps} ref={groupRef} onClick={onUITarget}>
      <mesh ref={meshRef}>
        <Ring
          args={[_.isEqual(unitId, uiTargetId) ? 1.5 : 0, 1.3]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color={'green'} />
        </Ring>

        <Sphere castShadow>
          <meshStandardMaterial color={'goldenrod'} />
        </Sphere>
      </mesh>
    </group>
  )
}
