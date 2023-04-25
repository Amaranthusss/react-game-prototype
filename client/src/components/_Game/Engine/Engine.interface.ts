import { RootState } from '@react-three/fiber'

export interface EngineProps {
  children: JSX.Element
  getRenderer: () => RootState['gl']
  getCamera: () => RootState['camera']
  getScene: () => RootState['scene']
}
