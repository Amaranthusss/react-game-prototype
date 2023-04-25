import { useEffect } from 'react'

import { MutableRefObject } from 'react'
import { RogueComponent } from '../Rogue.interface'
import { Group } from 'three'

export function useComponent(
  componentCallback: (component: RogueComponent) => void,
  groupRef: MutableRefObject<Group | null>
): void {
  useEffect((): void => {
    componentCallback({ getGroupRef: () => groupRef })
  }, [componentCallback, groupRef])
}
