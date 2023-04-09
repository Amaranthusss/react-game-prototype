import { GroupProps } from '@react-three/fiber'

export interface RogueProps {
  get: (ref: THREE.Group | null) => void
  groupProps?: GroupProps
}
