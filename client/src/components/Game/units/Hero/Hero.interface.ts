import { GroupProps } from '@react-three/fiber'
import { Mesh } from 'three'

export interface HeroProps {
  groupProps?: GroupProps
  /** Set player nickname as ID */
  id?: string
  /** Set init function if created hero is controlled by player */
  init?: (nextVehicleMesh: Mesh) => void
}
