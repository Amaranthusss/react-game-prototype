import { useGameStore } from '@/store/game/useGameStore'
import { useFrame } from '@react-three/fiber'

import { EntityManager } from 'yuka'
import _ from 'lodash'

import { RootState } from '@react-three/fiber'

export function useEntityManager(): void {
  const entityManager: EntityManager = useGameStore(
    ({ entityManager }) => entityManager
  )

  useFrame(({ scene, gl, camera }: RootState, delta: number) => {
    if (_.isNull(entityManager)) {
      return
    }

    entityManager.update(delta)
    gl.render(scene, camera)
  })
}
