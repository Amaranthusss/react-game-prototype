import { EntityManager, Vehicle } from 'yuka'
import { Unit } from '@/interfaces/unit'

export interface GameStore {
  fps: number
  playerName: string
  uiTargetId: Unit['id'] | undefined
  entityManager: EntityManager
  getVehicles: GetVehicles
  setFps: SetFps
  setUITargetId: SetUITargetId
}

export type GetVehicles = (ids?: Unit['id'][]) => Vehicle[]
export type SetFps = (fps: number) => void
export type SetUITargetId = (uiTargetId: Unit['id']) => void
