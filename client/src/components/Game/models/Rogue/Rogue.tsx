import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useComponent } from './hooks/useComponent'

import { GLTFResult, RogueProps } from './Rogue.interface'

const url: string = '/models/rogue/rogue.gltf'

export function Rogue({
  groupProps,
  componentCallback,
}: RogueProps): JSX.Element {
  const groupRef = useRef<THREE.Group | null>(null)

  const { nodes, animations } = useGLTF(url) as GLTFResult
  const { actions, names } = useAnimations(animations, groupRef)

  useEffect(() => {
    actions[names?.[0]]?.play()
  }, [actions, names])

  useComponent(componentCallback, groupRef)

  return (
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
  )
}

useGLTF.preload(url)
