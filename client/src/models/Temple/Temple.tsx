import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'

import _ from 'lodash'

import { TempleProps, GLTFResult } from './Temple.interface'

const url: string = '/models/arena/arena.glb'

export function Temple({ groupProps }: TempleProps) {
  const groupRef = useRef<THREE.Group | null>(null)

  const { nodes, materials } = useGLTF(url) as GLTFResult

  return (
    <group ref={groupRef} {...groupProps} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={4}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.TEMPLE_27f3765_0.geometry}
              material={nodes.TEMPLE_27f3765_0.material}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.TEMPLE001_27f3765_0.geometry}
              material={nodes.TEMPLE001_27f3765_0.material}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.TEMPLE002_5b86a32a_0.geometry}
              material={nodes.TEMPLE002_5b86a32a_0.material}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.TEMPLE003_27f3765_0.geometry}
              material={nodes.TEMPLE003_27f3765_0.material}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.TEMPLE004_water_0.geometry}
              material={nodes.TEMPLE004_water_0.material}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.TEMPLE005_d605deea_0.geometry}
              material={nodes.TEMPLE005_d605deea_0.material}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.TEMPLE006_water_0.geometry}
              material={nodes.TEMPLE006_water_0.material}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.TEMPLE007_5b86a32a_0.geometry}
              material={nodes.TEMPLE007_5b86a32a_0.material}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.TEMPLE008_27f3765_0.geometry}
              material={nodes.TEMPLE008_27f3765_0.material}
            />
          </group>
          <group
            position={[-76.57, -83.66, 113.35]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[100, 100, 100]}
          >
            <mesh
              geometry={nodes.monk_5b86a32a_0.geometry}
              material={nodes.monk_5b86a32a_0.material}
            />
            <mesh
              geometry={nodes.monk_27f3765_0.geometry}
              material={nodes.monk_27f3765_0.material}
            />
            <mesh
              geometry={nodes.monk_eye_0.geometry}
              material={nodes.monk_eye_0.material}
            />
          </group>
          <group
            position={[766.19, -16.43, -21.35]}
            rotation={[-Math.PI / 2, 0, -0.49]}
            scale={[100, 100, 100]}
          >
            <mesh
              geometry={nodes.monk001_5b86a32a_0.geometry}
              material={nodes.monk001_5b86a32a_0.material}
            />
            <mesh
              geometry={nodes.monk001_27f3765_0.geometry}
              material={nodes.monk001_27f3765_0.material}
            />
            <mesh
              geometry={nodes.monk001_eye_0.geometry}
              material={nodes.monk001_eye_0.material}
            />
          </group>
          <group
            position={[247.7, -19.08, -368.17]}
            rotation={[-Math.PI / 2, 0, 0.82]}
            scale={[100, 100, 100]}
          >
            <mesh
              geometry={nodes.monk002_5b86a32a_0.geometry}
              material={nodes.monk002_5b86a32a_0.material}
            />
            <mesh
              geometry={nodes.monk002_27f3765_0.geometry}
              material={nodes.monk002_27f3765_0.material}
            />
            <mesh
              geometry={nodes.monk002_eye_0.geometry}
              material={nodes.monk002_eye_0.material}
            />
          </group>
          <group
            position={[218.93, -21.26, -381]}
            rotation={[-Math.PI / 2, 0, -0.99]}
            scale={[100, 100, 100]}
          >
            <mesh
              geometry={nodes.monk003_5b86a32a_0.geometry}
              material={nodes.monk003_5b86a32a_0.material}
            />
            <mesh
              geometry={nodes.monk003_27f3765_0.geometry}
              material={nodes.monk003_27f3765_0.material}
            />
            <mesh
              geometry={nodes.monk003_eye_0.geometry}
              material={nodes.monk003_eye_0.material}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.TEMPLE009_d605deea_0.geometry}
              material={nodes.TEMPLE009_d605deea_0.material}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.TEMPLE010_5b86a32a_0.geometry}
              material={nodes.TEMPLE010_5b86a32a_0.material}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.TEMPLE011_93d99f61_0.geometry}
              material={materials['93d99f61']}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.TEMPLE012_emit_0.geometry}
              material={materials.emit}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(url)
