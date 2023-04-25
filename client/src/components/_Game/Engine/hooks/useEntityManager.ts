import { useAppStore } from '@/store/app/useAppStore'
import { useFrame } from '@react-three/fiber'

import { EntityManager } from 'yuka'
import _ from 'lodash'

import { EngineProps } from '../Engine.interface'
import { RootState } from '@react-three/fiber'

export function useEntityManager(
  getRenderer: EngineProps['getRenderer'],
  getCamera: EngineProps['getCamera'],
  getScene: EngineProps['getScene']
): void {
  const entityManager: EntityManager = useAppStore().entityManager

  useFrame((state: RootState, delta: number) => {
    if (_.isNull(entityManager)) {
      return
    }

    entityManager.update(delta)
    getRenderer().render(getScene(), getCamera())
  })
}
