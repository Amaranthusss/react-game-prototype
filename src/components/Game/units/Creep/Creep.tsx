import { Cone } from '@react-three/drei'

import { useEffect, useRef, useState } from 'react'
import { useUnitsStore } from '@/store/units/useUnitsStore'

import * as THREE from 'three'
import _ from 'lodash'

import { CreepProps } from './Creep.interface'
import { Unit } from '@/interfaces/unit'

export function Creep({ groupProps, onInitialized }: CreepProps): JSX.Element {
  const [unitId] = useState<Unit['id']>(_.uniqueId())

  const groupRef = useRef<THREE.Group | null>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)

  useEffect((): void => {
    useUnitsStore.getState().createUnit({
      id: unitId,
      name: 'Creep',
      position: [0, 0, 0],
      attack: { baseDamage: 20, range: 100, speed: 2, type: 'normal' },
      defence: { dodge: 0, type: 'medium', value: 2 },
      health: 420,
      mana: 100,
      movementSpeed: 2.5,
    })
  }, [])

  console.log('creep render')

  return (
    <group {...groupProps} ref={groupRef}>
      <mesh ref={meshRef}>
        <Cone castShadow />
      </mesh>
    </group>
  )
}
