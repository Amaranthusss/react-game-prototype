import { UnitType } from '@/interfaces/unitType'
import { Hero } from '@/interfaces/hero'
import { Unit } from '@/interfaces/unit'

export interface UnitsStore {
  list: Map<Unit['id'], Unit | Hero>
  findUnit: FindUnit
  createUnit: CreateUnit
  createHero: CreateHero
  removeUnit: RemoveUnit
  updateUnitParameter: UpdateUnitParameter
  tryAutoFindTarget: TryAutoFindTarget
  findWeakestTarget: FindWeakestTarget
  getDistanceBetweenUnits: GetDistanceBetweenUnits
  getUnitType: GetUnitType
}

export type FindUnit = (idOfSearchedUnit: Unit['id']) => Unit | Hero | null
export type CreateUnit = (newUnit: CreateUnitNewUnit) => Unit['id']
export type CreateHero = (newHero: CreateUnitNewHero) => Unit['id']
export type RemoveUnit = (idOfUnitToRemove: Unit['id']) => void
export type TryAutoFindTarget = (idOfMatchingUnit: Unit['id']) => void
export type FindWeakestTarget = (idOfMatchingUnit: Unit['id']) => Unit['id']
export type UpdateUnitParameter = <T extends keyof Unit>(
  idUnitToUpdate: Unit['id'],
  stat: T,
  value: (Unit | Hero)[T]
) => void
export type GetDistanceBetweenUnits = (
  idOfFirstUnit: Unit['id'],
  idOfSecondUnit: Unit['id']
) => number
export type GetUnitType = (unitId: Unit['id']) => UnitType | null

type defaultUnitValues =
  | 'lastUpdate'
  | 'attack'
  | 'maxHealth'
  | 'maxMana'
  | 'bonus'
  | 'target'
  | 'targets'
  | 'state'
  | 'vehicle'

type defaultHeroValues =
  | 'lastUpdate'
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
  | 'vehicle'

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
