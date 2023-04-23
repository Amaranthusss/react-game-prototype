import { GroupProps } from '@react-three/fiber'

export interface HeroComponent {
  getGroup: () => THREE.Group | null
  getMesh: () => THREE.Mesh | null
}

export interface HeroProps {
  groupProps?: GroupProps
  onInitialized: (component: HeroComponent) => void
}
