import { Cone } from '@react-three/drei'

import { useEffect, useRef, useState } from 'react'
import { useUnitsStore } from '@/store/units/useUnitsStore'

import * as THREE from 'three'
import _ from 'lodash'

import { CreateUnitFcn } from '@/store/units/interface'
import { CreepProps } from './Creep.interface'
import { Unit } from '@/interfaces/unit'

export function Creep({ groupProps, onInitialized }: CreepProps): JSX.Element {
  const [unitId] = useState<Unit['id']>(_.uniqueId())

  const groupRef = useRef<THREE.Group | null>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)

  const createUnit: CreateUnitFcn = useUnitsStore().createUnit

  useEffect((): void => {
    createUnit({
      id: unitId,
      name: 'Creep',
      position: [0, 0, 0],
      attack: { baseDamage: 20, range: 40, speed: 2, type: 'normal' },
      defence: { dodge: 0, type: 'medium', value: 2 },
      health: 420,
      mana: 100,
      movementSpeed: 2.5,
      fieldOfView: 80,
    })
  }, [unitId, createUnit])

  console.log('creep render')

  return (
    <group {...groupProps} ref={groupRef}>
      <mesh ref={meshRef}>
        <Cone castShadow />
      </mesh>
    </group>
  )
}
