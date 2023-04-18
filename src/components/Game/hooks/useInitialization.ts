import { useCallback } from 'react'

import THREE from 'three'
import _ from 'lodash'

import { CharacterComponent } from '../units/Character/Character.interface'
import { InitFcn } from '@/components/Game/hooks/useNavMesh'

export const useInitialization = (init: InitFcn) => {
  const onCharacterInitialized = useCallback(
    (nextCharacterComponent: CharacterComponent): void => {
      const characterMesh: THREE.Mesh | null = nextCharacterComponent.getMesh()

      if (_.isNull(characterMesh)) {
        console.error(`${errorPath} / useEffect()
				\n Character mesh is null`)
        return
      }

      init(characterMesh)
    },
    [init]
  )

  return { onCharacterInitialized }
}

const errorPath = `components / Game / hooks / useInitialization`
