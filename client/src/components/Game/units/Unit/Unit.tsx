import { Sphere, Ring } from '@react-three/drei'

import { useEffect, useRef, useState } from 'react'
import { useUnitsStore } from '@/store/units/useUnitsStore'
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

  const [unitId] = useState<Unit['id']>(_.uniqueId())

  const [randomPos] = useState<SimplePosition>([
    _.random(true) * 40,
    0,
    _.random(true) * 40,
  ])

  const createUnit: CreateUnit = useUnitsStore(({ createUnit }) => createUnit)

  const groupRef = useRef<THREE.Group | null>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)

  const { onUITarget } = useUITarget(unitId, groupProps)

  useEffect((): void => {
    createUnit({
      id: unitId,
      name: 'Creep',
      position: randomPos,
      attack: { baseDamage: 20, range: 40, speed: 2, type: 'normal' },
      defence: { dodge: 0, type: 'medium', value: 2 },
      health: 420,
      mana: 100,
      movementSpeed: 2.5,
      fieldOfView: 80,
      icon: creepIcon,
    })

    groupRef.current?.position.set(...randomPos)
  }, [unitId, createUnit, randomPos])

  return (
    <group {...groupProps} ref={groupRef} onClick={onUITarget}>
      <mesh ref={meshRef}>
        <Sphere castShadow />
        <Ring args={[8.5]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <meshStandardMaterial color={'red'} />
        </Ring>
      </mesh>
    </group>
  )
}
