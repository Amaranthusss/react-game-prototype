import { GroupProps, ThreeEvent } from '@react-three/fiber'

export interface TerrainComponent {
  getGroup: () => THREE.Group | null
  getMesh: () => THREE.Mesh | null
}

export interface TerrainProps {
  groupProps?: GroupProps
  onContextMenu: (event: ThreeEvent<MouseEvent>) => void
  onInitialized: (component: TerrainComponent) => void
}
