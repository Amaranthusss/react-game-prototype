import { Hero } from '@/interfaces/hero'
import { Unit } from '@/interfaces/unit'

export interface UnitsStore {
  list: (Unit | Hero)[]
  findUnit: FindUnit
  createUnit: CreateUnit
  createHero: CreateHero
  removeUnit: RemoveUnit
  updateUnitParameter: UpdateUnitParameter
  triggerAttackMelee: TriggerAttackMelee
  triggerAttackRange: TriggerAttackRange
  getDistanceBetweenUnits: GetDistanceBetweenUnits
}

export type FindUnit = (idToFind: Unit['id']) => Unit | Hero | undefined
export type CreateUnit = (newUnit: CreateUnitNewUnit) => Unit['id']
export type CreateHero = (newHero: CreateUnitNewHero) => Unit['id']
export type RemoveUnit = (idToRemove: Unit['id']) => void
export type UpdateUnitParameter = <T extends keyof Unit>(
  unitIdToUpdate: Unit['id'],
  stat: T,
  value: (Unit | Hero)[T]
) => void
export type TriggerAttackRange = (
  attackingUnitId: Unit['id'],
  attackedUnitId: Unit['id']
) => void
export type TriggerAttackMelee = (
  attackingUnitId: Unit['id'],
  attackedUnitId: Unit['id']
) => void
export type GetDistanceBetweenUnits = (
  firstUnitId: Unit['id'],
  secondUnitId: Unit['id']
) => number

type defaultUnitValues =
  | 'attack'
  | 'maxHealth'
  | 'maxMana'
  | 'bonus'
  | 'target'
  | 'targets'
  | 'state'

type defaultHeroValues =
  | 'attack'
  | 'maxHealth'
  | 'maxMana'
  | 'bonus'
  | 'target'
  | 'targets'
  | 'state'
  | 'level'
  | 'experience'
  | 'maxExperience'

interface UnitAttackWithNullishDefaults
  extends Omit<Pick<Unit, 'attack'>['attack'], 'duration'> {
  duration?: Unit['attack']['duration']
}

export type CreateUnitNewUnit = Omit<Unit, defaultUnitValues> & {
  attack: UnitAttackWithNullishDefaults
}

export type CreateUnitNewHero = Omit<Hero, defaultHeroValues> & {
  attack: UnitAttackWithNullishDefaults
}
