import { Cone } from '@react-three/drei'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useUnitsStore } from '@/store/units/useUnitsStore'

import * as THREE from 'three'
import _ from 'lodash'

import { SimplePosition } from '@/interfaces/simplePosition'
import { CreateUnit } from '@/store/units/interface'
import { CreepProps } from './Creep.interface'
import { Unit } from '@/interfaces/unit'

export function Creep({ groupProps, onInitialized }: CreepProps): JSX.Element {
  const [unitId] = useState<Unit['id']>(_.uniqueId())
  const [randomPos] = useState<SimplePosition>([
    _.random(true) * 10,
    1,
    _.random(true) * 10,
  ])

  const groupRef = useRef<THREE.Group | null>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)

  const createUnit = useMemo(
    (): CreateUnit => useUnitsStore.getState().createUnit,
    []
  )
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
    })

    meshRef.current?.position.set(randomPos[0], randomPos[1], randomPos[2])
  }, [unitId, createUnit, randomPos])

  console.log('creep render')

  return (
    <group {...groupProps} ref={groupRef}>
      <mesh ref={meshRef}>
        <Cone castShadow />
      </mesh>
    </group>
  )
}
