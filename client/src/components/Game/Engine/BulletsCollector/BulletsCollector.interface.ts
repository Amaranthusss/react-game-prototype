import { Unit } from '@/interfaces/unit'

export interface BulletsCollectorComponent {
  addBullet: AddBullet
  removeBullet: RemoveBullet
}

export interface BulletsCollectorProps {
  componentCallback: (component: BulletsCollectorComponent) => void
}

export type AddBullet = (
  attackingUnitId: Unit['id'],
  targetUnitId: Unit['id']
) => void
export type RemoveBullet = () => void
