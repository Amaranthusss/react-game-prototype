import { useEffect } from 'react'

import { MutableRefObject } from 'react'
import { RogueComponent } from '../Rogue.interface'
import { Group } from 'three'

import rogueIcon from '@/assets/icons/rogue-icon.jpg'

export function useComponent(
  componentCallback: (component: RogueComponent) => void,
  groupRef: MutableRefObject<Group | null>
): void {
  useEffect((): void => {
    componentCallback({ getGroupRef: () => groupRef, getIcon: () => rogueIcon })
  }, [componentCallback, groupRef])
}
