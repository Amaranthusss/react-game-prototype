import { Suspense, useRef, useEffect } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { Vehicle } from 'yuka'
import YukaManager from './Providers/YukaManager/YukaManager'
import { useYukaStore } from '@/store/yuka/useYukaStore'
import { useYuka } from '@/hooks/useYuka'
import { YukaStore } from '@/store/yuka/useYukaStore.interface'
import * as THREE from 'three'
import { getActions } from '@/store/yuka/getActions'
import { getLevel } from '@/store/yuka/getLevel'
import { Line, useGLTF } from '@react-three/drei'

extend({ Line })

function Player(props: { position?: [number, number, number]; name?: string }) {
  const { ref } = useYuka({ type: Vehicle, ...props })

  return (
    <group position={[0, 0.6, 0]}>
      <mesh ref={ref}>
        <mesh ref={ref}>
          <boxGeometry args={[0.5, 1, 0.5]} attach={'geometry'} />
          <meshBasicMaterial color={'blue'} attach={'material'} />
        </mesh>
      </mesh>
    </group>
  )
}

function Ghost(props: { position?: [number, number, number]; name?: string }) {
  const { ref } = useYuka({ type: Vehicle, ...props })

  return (
    <group position={[0, 1, 0]}>
      <mesh ref={ref}>
        <boxGeometry args={[0.5, 1, 0.5]} attach={'geometry'} />
        <meshBasicMaterial
          color={'white'}
          attach={'material'}
          opacity={0.6}
          transparent
        />
      </mesh>
    </group>
  )
}

function PathHelper() {
  const ref = useRef<any | null>(null) // ToDo Should be LineSegments2 | Line2, cannot find a types

  // Register ref with store
  useEffect(() => {
    if (ref.current) {
			// ToDo to fix
      //@ts-ignore
      useYukaStore.setState((state: YukaStore) => {
        const prev = state.refs != null ? state.refs : {}

        return {
          refs: {
            ...prev,
            pathHelper: ref.current,
          },
        }
      })
    }
  }, [])

  return (
    <Line ref={ref} visible={false} position={[0, 0.02, 0]} points={[0, 0, 0]}>
      <lineBasicMaterial color={0xff0000} attach="material" />
      <bufferGeometry attach={'geometry'} />
    </Line>
  )
}

function Level() {
  const ref = useRef<THREE.Mesh<
    THREE.BufferGeometry,
    THREE.Material | THREE.Material[]
  > | null>(null)

  const { nodes } = useGLTF('/level_applied.glb') as any

  const level: YukaStore['level'] = useYukaStore(getLevel)

  const updateRefsLevel: YukaStore['actions']['updateRefsLevel'] =
    useYukaStore(getActions).updateRefsLevel

  // Register ref with store
  useEffect(() => {
    if (ref.current) {
      updateRefsLevel?.(ref.current)
    }
  }, [updateRefsLevel])

  return (
    <group dispose={null} position={[0, 0, 0]}>
      <group position={[0, 0.01, 0]}>
        <mesh material={level.material} geometry={level.geometry} ref={ref} />
      </group>
      <group>
        <mesh
          rotation-x={Math.PI * -0.5}
          material={nodes.Plane001.material}
          geometry={nodes.Plane001.geometry}
        />
      </group>
    </group>
  )
}

function App() {
  const actions: YukaStore['actions'] = useYukaStore(getActions)

  return (
    <Canvas
      onPointerMove={actions.updateMouse}
      onPointerDown={actions.handleMouseDown}
      onCreated={({ gl, camera }) => {
        gl.setPixelRatio(window.devicePixelRatio)
        // ToDo To type
        //@ts-ignore
        camera.fov = 40
        // ToDo To type
        //@ts-ignore
        camera.aspect = window.innerWidth / window.innerHeight
        camera.near = 0.1
        camera.far = 1000
        actions.init?.(camera)
        actions.loadNavMesh?.('/navmesh_applied.glb')
      }}
    >
      <hemisphereLight
        position={[0, 100, 0]}
        args={[0xffffff, 0x444444, 0.6]}
      />

      <directionalLight position={[0, 20, 10]} args={[0xffffff, 0.8]} />

      <YukaManager>
        <Suspense fallback={null}>
          <Player name={'Player'} />
          <Ghost name={'Ghost'} />
          <Level />
          <PathHelper />
        </Suspense>
      </YukaManager>
    </Canvas>
  )
}

export default App
