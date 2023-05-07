import { useCallback } from 'react'

import * as THREE from 'three'
import * as YUKA from 'yuka'

export function useEntitySync() {
  const sync = useCallback(
    (
      entity: YUKA.GameEntity,
      renderComponent: THREE.Mesh<
        THREE.BufferGeometry,
        THREE.Material | THREE.Material[]
      >
    ) => {
      //@ts-ignore YUKA.Matrix4 / THREE.Matrix4 differences
      renderComponent.matrix.copy(entity.worldMatrix)
    },
    []
  )

  return { sync }
}
