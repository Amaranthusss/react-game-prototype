import { GroupProps } from '@react-three/fiber'

export interface CharacterComponent {
  getGroup: () => THREE.Group | null
  getMesh: () => THREE.Mesh | null
}

export interface CharacterProps {
  groupProps?: GroupProps
  onInitialized: (component: CharacterComponent) => void
}
