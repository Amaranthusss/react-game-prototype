import { ThreeEvent } from '@react-three/fiber'

export interface EnvironmentProps {
  onMoveToPoint: (event: ThreeEvent<MouseEvent>) => void
}
