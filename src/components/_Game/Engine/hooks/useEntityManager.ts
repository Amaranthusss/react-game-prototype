import { useFrame } from '@react-three/fiber'

import _ from 'lodash'

import { EngineProps } from '../Engine.interface'
import { RootState } from '@react-three/fiber'

export function useEntityManager(
  getEntityManager: EngineProps['getEntityManager'],
  getRenderer: EngineProps['getRenderer'],
  getCamera: EngineProps['getCamera'],
  getScene: EngineProps['getScene']
): void {
  useFrame((state: RootState, delta: number) => {
    const entityManager = getEntityManager()

    if (_.isNull(entityManager)) {
      return
    }

    entityManager.update(delta)
    getRenderer().render(getScene(), getCamera())
  })
}
