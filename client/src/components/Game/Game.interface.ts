import { RootState } from '@react-three/fiber'

export interface GameCanvas {
  scene: RootState['scene']
  camera: RootState['camera']
  renderer: RootState['gl']
}
