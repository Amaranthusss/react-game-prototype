import { EntityManager, Vehicle } from 'yuka'
import { Unit } from '@/interfaces/unit'

export interface GameStore {
  fps: number
  playerName: string
  entityManager: EntityManager
  getVehicles: GetVehicles
  setFps: SetFps
}

export type GetVehicles = (ids?: Unit['id'][]) => Vehicle[]
export type SetFps = (fps: number) => void
