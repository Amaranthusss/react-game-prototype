import { Unit } from './unit'

export interface Bullet {
  attackingUnitId: Unit['id']
  targetUnitId: Unit['id']
}
