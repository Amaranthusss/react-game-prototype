import { EntityManager } from 'yuka'
import { RootState } from '@react-three/fiber'

export interface EngineProps {
  children: JSX.Element
  getEntityManager: () => EntityManager | null
  getRenderer: () => RootState['gl']
  getCamera: () => RootState['camera']
  getScene: () => RootState['scene']
}
