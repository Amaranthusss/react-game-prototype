import { GroupProps } from '@react-three/fiber'

export interface CreepComponent {
  getGroup: () => THREE.Group | null
  getMesh: () => THREE.Mesh | null
}

export interface CreepProps {
  groupProps?: GroupProps
  onInitialized?: (component: CreepComponent) => void
}
