import { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'

import { TerrainProps } from './Terrain.interface'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.SkinnedMesh
    Plane: THREE.SkinnedMesh
    Cube001: THREE.SkinnedMesh
    Cube002: THREE.SkinnedMesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
  }
}

const url: string = '/models/prototype/level/level.glb'

export default function Character({
  groupProps,
  onContextMenu,
  onInitialized,
}: TerrainProps) {
  const groupRef = useRef<THREE.Group | null>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)

  const { nodes, materials } = useGLTF(url) as GLTFResult

  useEffect((): void => {
    onInitialized({
      getGroup: () => groupRef.current,
      getMesh: () => meshRef.current,
    })
  }, [onInitialized])

  return (
    <mesh ref={meshRef} onContextMenu={onContextMenu}>
      <group ref={groupRef} {...groupProps} dispose={null}>
        <mesh
          geometry={nodes.Cube.geometry}
          material={materials.Material}
          position={[5.63, 0, 0]}
        />
        <mesh
          geometry={nodes.Plane.geometry}
          material={nodes.Plane.material}
          scale={[9.13, 1, 4.31]}
        />
        <mesh
          geometry={nodes.Cube001.geometry}
          material={nodes.Cube001.material}
          position={[-4.74, 0, -2.42]}
          scale={[-2.18, 1, 1]}
        />
        <mesh
          geometry={nodes.Cube002.geometry}
          material={nodes.Cube002.material}
          position={[-0.52, 0, 2.32]}
          scale={[2.49, 1, 1]}
        />
      </group>
    </mesh>
  )
}

useGLTF.preload(url)
