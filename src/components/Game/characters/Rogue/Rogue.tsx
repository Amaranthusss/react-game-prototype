import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react'

import { RogueProps } from './Rogue.interface'
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

export default function RogueModal({ groupProps, get }: RogueProps) {
  const group = useRef<THREE.Group | null>(null)

  const { nodes, materials, animations } = useGLTF(url) as GLTFResult

  const { actions, names } = useAnimations(animations, group)

  useEffect((): void => {
    get(group.current)
  }, [get])

  useEffect(() => {
    actions[names?.[0]]?.play()
		console.log(names)
  }, [actions, names])

  return (
    <group
      ref={group}
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
