import { OrbitControls, Stage } from '@react-three/drei'
import { EffectComposer } from '@react-three/postprocessing'
import { NavMeshManager } from '../Providers/NavMeshManager/NavMeshManager'
import { Suspense } from 'react'
import { Physics } from '@react-three/cannon'
import { Canvas } from '@react-three/fiber'
import { Lights } from './environment/Lights/Lights'
import { Bloom } from '@react-three/postprocessing'

import { useInitialization } from './hooks/useInitialization'
import { useCallback } from 'react'
import { useNavMesh } from '@/hooks/useNavMesh'

import { lazy } from 'react'
import _ from 'lodash'

import { ThreeEvent } from '@react-three/fiber'
import { RootState } from '@react-three/fiber'

import styles from './Game.module.scss'

const Rogue = lazy(
  () => import('@/components/Game/characters/Character/Character')
)

const Terrain = lazy(
  () => import('@/components/Game/environment/Terrain/Terrain')
)

export default function Game(): JSX.Element {
  const {
    init,
    getScene,
    setScene,
    getCamera,
    setCamera,
    getRenderer,
    setRenderer,
    moveToPoint,
    getEntityManager,
  } = useNavMesh()

  const { onCharacterInitialized } = useInitialization(init)

  const onContextMenu = useCallback((event: ThreeEvent<MouseEvent>): void => {
    // moveToPoint(event)
  }, [])

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

        <NavMeshManager
          getEntityManager={getEntityManager}
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
            <Suspense fallback={null}>
              <Physics>
                <Lights />
                <Rogue onInitialized={onCharacterInitialized} />
              </Physics>
            </Suspense>
          </Stage>
        </NavMeshManager>
      </Canvas>
    </div>
  )
}
