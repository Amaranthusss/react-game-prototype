import { useFrame } from '@react-three/fiber'
import { useFPS } from './hooks/useFPS'

import _ from 'lodash'

import { NavMeshManagerProps } from './NavMeshManager.interface'
import { RootState } from '@react-three/fiber'

import { navMeshContext } from '@/contexts/navMeshContext'

export function NavMeshManager({
  children,
  getScene,
  getCamera,
  getRenderer,
  getEntityManager,
}: NavMeshManagerProps) {
  useFrame((state: RootState, delta: number) => {
    const entityManager = getEntityManager()

    if (_.isNull(entityManager)) {
      return
    }

    entityManager.update(delta)
    getRenderer().render(getScene(), getCamera())
  })

  useFPS()

  return (
    <navMeshContext.Provider value={getEntityManager}>
      {children}
    </navMeshContext.Provider>
  )
}
