import { OrbitControls, Stage, Stars } from '@react-three/drei'
import { EffectComposer } from '@react-three/postprocessing'
import { Suspense } from 'react'
import { Loading } from './Loading/Loading'
import { Engine } from './Engine/Engine'
import { Canvas } from '@react-three/fiber'
import { Bloom } from '@react-three/postprocessing'

import { useRefState } from '@/hooks/useRefState'

import _ from 'lodash'

import { GameCanvas } from './Game.interface'
import { RootState } from '@react-three/fiber'

import styles from './Game.module.scss'

export function Game(): JSX.Element {
  console.log('%cGame rendered', 'color: green')

  // * Canvas objects're too large to be stored in the game store
  const { get: getCanvas, set: setCanvas } = useRefState<GameCanvas>()

  return (
    <div className={styles.container}>
      <Canvas
        shadows
        onCreated={({ gl, scene, camera }: RootState): void => {
          setCanvas({ scene, camera, renderer: gl })
        }}
      >
        <OrbitControls />
        <EffectComposer>
          <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
        </EffectComposer>
        <color attach={'background'} args={['#15151a']} />

        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        <Suspense fallback={<Loading />}>
          <Engine getCanvas={getCanvas}>
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
            />
          </Engine>
        </Suspense>
      </Canvas>
    </div>
  )
}
