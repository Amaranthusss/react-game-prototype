import { ThreeEvent } from '@react-three/fiber'

export interface TerrainProps {
  onContextMenu: (event: ThreeEvent<MouseEvent>) => void
}
