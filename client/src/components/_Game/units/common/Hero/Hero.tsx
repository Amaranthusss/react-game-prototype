import { useEffect, useMemo, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { usePlayerStore } from '@/store/player/usePlayerStore'
import { useUnitsStore } from '@/store/units/useUnitsStore'
import { useFrame } from '@react-three/fiber'

import * as THREE from 'three'
import _ from 'lodash'

import { CreateHero, FindUnit } from '@/store/units/interface'
import { UpdateUnitParameter } from '@/store/units/interface'
import { HeroProps } from './Hero.interface'
import { SimplePosition } from '@/interfaces/simplePosition'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Unit } from '@/interfaces/unit'

import { Config } from '@/constants/config'

type GLTFResult = GLTF & {
  nodes: {
    Vampire_1: THREE.SkinnedMesh
    Vampire_2: THREE.SkinnedMesh
    mixamorigHips: THREE.Bone
    mixamorigHips_1: THREE.Bone
    mixamorigHips_2: THREE.Bone
    mixamorigHips_3: THREE.Bone
  }
  materials: {
    Vampire_1: THREE.MeshStandardMaterial
    Vampire_2: THREE.MeshStandardMaterial
  }
}

const url: string = '/models/rogue/rogue.gltf'

export default function Hero({ groupProps, onInitialized }: HeroProps) {
  const [unitId] = useState<Unit['id']>(_.uniqueId())

  const groupRef = useRef<THREE.Group | null>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)

  const { nodes, animations } = useGLTF(url) as GLTFResult
  const { actions, names } = useAnimations(animations, groupRef)

  const createHero = useMemo(
    (): CreateHero => useUnitsStore.getState().createHero,
    []
  )

  const updateUnitParameter = useMemo(
    (): UpdateUnitParameter => useUnitsStore.getState().updateUnitParameter,
    []
  )

  const findUnit = useMemo(
    (): FindUnit => useUnitsStore.getState().findUnit,
    []
  )

  useEffect(() => {
    actions[names?.[0]]?.play()
  }, [actions, names])

  useEffect((): void => {
    onInitialized({
      getGroup: () => groupRef.current,
      getMesh: () => meshRef.current,
    })
  }, [onInitialized])

  useEffect((): void => {
    createHero({
      id: unitId,
      name: 'Rogue',
      position: [0, 0, 0],
      specialisation: 'agility',
      agility: 5,
      intellect: 5,
      strength: 5,
      attack: { baseDamage: 20, range: 4, speed: 2, type: 'normal' },
      defence: { dodge: 0, type: 'medium', value: 2 },
      health: 420,
      mana: 100,
      movementSpeed: 2.5,
      fieldOfView: 60,
    })

    usePlayerStore.setState({ unitId })
  }, [unitId, createHero])

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
      <group
        ref={groupRef}
        dispose={null}
        scale={1}
        receiveShadow
        castShadow
        {...groupProps}
      >
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            geometry={nodes.Vampire_1.geometry}
            material={nodes.Vampire_1.material}
            skeleton={nodes.Vampire_1.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Vampire_2.geometry}
            material={nodes.Vampire_2.material}
            skeleton={nodes.Vampire_2.skeleton}
          />
        </group>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips_1} />
          <skinnedMesh
            geometry={nodes.Vampire_1.geometry}
            material={nodes.Vampire_1.material}
            skeleton={nodes.Vampire_1.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Vampire_2.geometry}
            material={nodes.Vampire_2.material}
            skeleton={nodes.Vampire_2.skeleton}
          />
        </group>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips_2} />
          <skinnedMesh
            geometry={nodes.Vampire_1.geometry}
            material={nodes.Vampire_1.material}
            skeleton={nodes.Vampire_1.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Vampire_2.geometry}
            material={nodes.Vampire_2.material}
            skeleton={nodes.Vampire_2.skeleton}
          />
        </group>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips_3} />
          <skinnedMesh
            geometry={nodes.Vampire_1.geometry}
            material={nodes.Vampire_1.material}
            skeleton={nodes.Vampire_1.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Vampire_2.geometry}
            material={nodes.Vampire_2.material}
            skeleton={nodes.Vampire_2.skeleton}
          />
        </group>
      </group>
    </mesh>
  )
}

useGLTF.preload(url)
