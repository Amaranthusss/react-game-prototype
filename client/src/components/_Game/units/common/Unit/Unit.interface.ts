import { GroupProps } from '@react-three/fiber'

export interface UnitComponent {
  getGroup: () => THREE.Group | null
  getMesh: () => THREE.Mesh | null
}

export interface UnitProps {
  groupProps?: GroupProps
}
