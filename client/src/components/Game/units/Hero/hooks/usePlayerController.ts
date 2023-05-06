import { useEffect, useRef } from 'react'
import { useUITargetHero } from '@/hooks/useUITargetHero'

import _ from 'lodash'

import { MutableRefObject } from 'react'
import * as THREE from 'three'

export function usePlayerControler(
  meshRef: MutableRefObject<THREE.Mesh | null>,
  init?: (nextVehicleMesh: THREE.Mesh) => void
): void {
  const hasBeenInitialized = useRef<boolean>(false)

  const { uiTargetHero } = useUITargetHero()

  useEffect((): void => {
    if (
      _.isFunction(init) &&
      !_.isNull(meshRef.current) &&
      !hasBeenInitialized.current
    ) {
      init(meshRef.current)
      uiTargetHero()
      hasBeenInitialized.current = true
    }
  }, [init, meshRef, uiTargetHero])
}
