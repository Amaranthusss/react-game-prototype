import { OrbitControls, Stage, Stars } from '@react-three/drei'
import { EffectComposer } from '@react-three/postprocessing'
import { Suspense } from 'react'
import { Physics } from '@react-three/cannon'
import { Loading } from './Loading/Loading'
import { Engine } from './Engine/Engine'
import { Canvas } from '@react-three/fiber'
import { Lights } from './environment/Lights/Lights'
import { Bloom } from '@react-three/postprocessing'
import { Arena } from './environment/Arena/Arena'
import { Unit } from './units/common/Unit/Unit'

import { useCallback } from 'react'
import { useNavMesh } from '@/components/_Game/hooks/useNavMesh'

import { lazy } from 'react'
import _ from 'lodash'

import { ThreeEvent } from '@react-three/fiber'
import { RootState } from '@react-three/fiber'

import styles from './Game.module.scss'

const Player = lazy(() => import('@/components/_Game/units/common/Hero/Hero'))

export function Game(): JSX.Element {
  // * Be careful with React states renders at this component level

  const {
    getScene,
    setScene,
    getCamera,
    setCamera,
    getRenderer,
    setRenderer,
    moveToPoint,
  } = useNavMesh()

  const onMoveToPoint = useCallback(
    (event: ThreeEvent<MouseEvent>): void => {
      moveToPoint(event)
    },
    [moveToPoint]
  )

  const onLetsAttackUnit = useCallback(
    (event: ThreeEvent<MouseEvent>): void => {
      console.log(event)
    },
    []
  )

  return (
    <div className={styles.container}>
      <Canvas
        shadows
        onCreated={({ gl, scene, camera }: RootState): void => {
          setScene(scene)
          setCamera(camera)
          setRenderer(gl)
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

        <Engine
          getCamera={getCamera}
          getRenderer={getRenderer}
          getScene={getScene}
        >
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
            <Suspense fallback={<Loading />}>
              <Physics>
                <Lights />
                <Arena groupProps={{ onContextMenu: onMoveToPoint }} />
                <Player />
                <Unit groupProps={{ onContextMenu: onLetsAttackUnit }} />
              </Physics>
            </Suspense>
          </Stage>
        </Engine>
      </Canvas>
    </div>
  )
}
