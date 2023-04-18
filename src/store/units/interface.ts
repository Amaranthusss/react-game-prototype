import { Hero } from '@/interfaces/hero'
import { Unit } from '@/interfaces/unit'

export interface UnitsStore {
  list: (Unit | Hero)[]
  find: FindFcn
  createUnit: CreateUnitFcn
  createHero: CreateHeroFcn
  remove: RemoveFcn
  update: UpdateFcn
  getRange: GetRangeFcn
}

export type FindFcn = (idToFind: Unit['id']) => Unit | Hero | undefined
export type CreateUnitFcn = (newUnit: CreateUnitNewUnit) => Unit['id']
export type CreateHeroFcn = (newHero: CreateUnitNewHero) => Unit['id']
export type RemoveFcn = (idToRemove: Unit['id']) => void
export type UpdateFcn = <T extends keyof Unit>(
  unitIdToUpdate: Unit['id'],
  stat: T,
  value: (Unit | Hero)[T]
) => void
export type GetRangeFcn = (
  firstUnitId: Unit['id'],
  secondUnitId: Unit['id']
) => number

type defaultUnitValues = 'maxHealth' | 'maxMana' | 'bonus'

type defaultHeroValues =
  | 'maxHealth'
  | 'maxMana'
  | 'bonus'
  | 'level'
  | 'experience'
  | 'maxExperience'

export type CreateUnitNewUnit = Omit<Unit, defaultUnitValues>
export type CreateUnitNewHero = Omit<Hero, defaultHeroValues>
