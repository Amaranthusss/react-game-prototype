import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react'

import { CharacterProps } from './Character.interface'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

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

export default function Character({
  groupProps,
  onInitialized,
}: CharacterProps) {
  const groupRef = useRef<THREE.Group | null>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)

  const { nodes, animations } = useGLTF(url) as GLTFResult

  const { actions, names } = useAnimations(animations, groupRef)

  useEffect(() => {
    actions[names?.[0]]?.play()
  }, [actions, names])

  useEffect((): void => {
    onInitialized({
      getGroup: () => groupRef.current,
      getMesh: () => meshRef.current,
    })
  }, [onInitialized])

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
