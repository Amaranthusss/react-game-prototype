import { OrbitControls, Stage } from '@react-three/drei'
import { EffectComposer } from '@react-three/postprocessing'
import { Suspense } from 'react'
import { Physics } from '@react-three/cannon'
import { Canvas } from '@react-three/fiber'
import { Lights } from './environment/Lights/Lights'
import { Bloom } from '@react-three/postprocessing'

import { useCallback, useRef } from 'react'
import { useComponent } from './hooks/useComponent'

import { lazy } from 'react'

import { ThreeEvent } from '@react-three/fiber'
import { GameProps } from './Game.interface'

import styles from './Game.module.scss'

const Rogue = lazy(() => import('@/components/Game/characters/Rogue/Rogue'))

const Terrain = lazy(
  () => import('@/components/Game/environment/Terrain/Terrain')
)

export default function Game({ componentCallback }: GameProps): JSX.Element {
  useComponent(componentCallback)

  const rogue = useRef<THREE.Group | null>(null)

  const onContextMenu = useCallback((event: ThreeEvent<MouseEvent>): void => {
    rogue.current?.position.set(
      event.point.x,
      event.point.y,
      event.point.z - 4.0
    )
  }, [])

  return (
    <div className={styles.container}>
      <Canvas shadows camera={{ position: [4, -1, 8], fov: 35 }}>
        <OrbitControls />

        <EffectComposer>
          <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
        </EffectComposer>

        <Stage
          intensity={0.5}
          preset={'rembrandt'}
          adjustCamera={1}
          shadows={{
            type: 'accumulative',
            color: 'black',
            colorBlend: 2,
            opacity: 2,
          }}
          environment={'city'}
        >
          <Suspense fallback={null}>
            <Physics>
              <Terrain onContextMenu={onContextMenu} />
              <Lights />
              <Rogue
                get={(ref: THREE.Group | null): void => {
                  rogue.current = ref
                }}
              />
            </Physics>
          </Suspense>
        </Stage>
      </Canvas>
    </div>
  )
}
