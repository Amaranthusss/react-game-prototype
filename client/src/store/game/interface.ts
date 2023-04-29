import { EntityManager, Vehicle } from 'yuka'
import { RootState } from '@react-three/fiber'
import { Unit } from '@/interfaces/unit'

export interface GameStore {
  fps: number
  playerName: string
  renderer: RootState['gl'] | undefined
  scene: RootState['scene'] | undefined
  camera: RootState['camera'] | undefined
  entityManager: EntityManager
  getVehicles: GetVehicles
  setScene: SetScene
  setRenderer: SetRenderer
  setCamera: SetCamera
  setFps: SetFps
}

export type GetVehicles = (ids?: Unit['id'][]) => Vehicle[]
export type SetScene = (scene: RootState['scene']) => void
export type SetRenderer = (setRenderer: RootState['gl']) => void
export type SetCamera = (camera: RootState['camera']) => void
export type SetFps = (fps: number) => void
