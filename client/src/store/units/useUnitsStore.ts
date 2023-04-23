import { devtools, persist } from 'zustand/middleware'
import { create } from 'zustand'
import * as THREE from 'three'
import _ from 'lodash'

import { CreateUnitNewHero, CreateUnitNewUnit } from './interface'
import { UnitsStore } from './interface'
import { UnitType } from '@/interfaces/unitType'
import { Unit } from '@/interfaces/unit'
import { Hero } from '@/interfaces/hero'

const getDefaultUnitValues = (
  newUnit: CreateUnitNewUnit | CreateUnitNewHero
): Pick<
  Unit,
  'maxHealth' | 'maxMana' | 'bonus' | 'target' | 'targets' | 'state' | 'attack'
> => {
  const defaultAttackDuration: number = 500

  if (_.lt(newUnit.attack.range, 0)) {
    console.error(
      `${errorPath} / getDefaultUnitValues()
		\n A new unit definition has incorrect attack range - lower than 0
		\n Unit's attack range:`,
      newUnit.attack.range
    )
  }

  const attack: Unit['attack'] = {
    ...newUnit.attack,
    duration: newUnit.attack?.duration ?? defaultAttackDuration,
  }

  return {
    maxHealth: newUnit.health,
    maxMana: newUnit.mana,
    attack,
    bonus: [],
    target: undefined,
    targets: [],
    state: 'idle',
  }
}

export const useUnitsStore = create<UnitsStore>()(
  devtools(
    persist(
      (set, get): UnitsStore => {
        return {
          list: [],

          findUnit: (idToFind: Unit['id']): Unit | Hero | null => {
            const list: UnitsStore['list'] = get().list

            return (
              _.find(list, ({ id }: Unit | Hero): boolean => {
                return _.isEqual(id, idToFind)
              }) ?? null
            )
          },

          createUnit: (newUnit: CreateUnitNewUnit): Unit['id'] => {
            const prevList: UnitsStore['list'] = get().list
            const findUnit: UnitsStore['findUnit'] = get().findUnit

            const isDefinied: boolean = !_.isUndefined(findUnit(newUnit.id))

            if (isDefinied) {
              return newUnit.id
            }

            const unit: Unit = {
              ...newUnit,
              ...getDefaultUnitValues(newUnit),
            }

            set({ list: [...prevList, unit] })

            return unit.id
          },

          createHero: (newHero: CreateUnitNewHero): Unit['id'] => {
            const prevList: UnitsStore['list'] = get().list
            const findUnit: UnitsStore['findUnit'] = get().findUnit

            const isDefinied: boolean = !_.isUndefined(findUnit(newHero.id))

            if (isDefinied) {
              return newHero.id
            }

            const hero: Hero = {
              ...newHero,
              ...getDefaultUnitValues(newHero),
              level: 1,
              experience: 0,
              maxExperience: 100,
            }

            set({ list: [...prevList, hero] })

            return hero.id
          },

          removeUnit: (idToRemove: Unit['id']): void => {
            const prevList: UnitsStore['list'] = get().list

            set({
              list: _.filter(prevList, ({ id }: Unit | Hero): boolean =>
                _.isEqual(id, idToRemove)
              ),
            })
          },

          updateUnitParameter: <T extends keyof Unit>(
            unitIdToUpdate: Unit['id'],
            stat: T,
            value: (Unit | Hero)[T]
          ): void => {
            const list: UnitsStore['list'] = get().list

            const unitIndex: number = _.findIndex(
              list,
              ({ id }: Unit | Hero): boolean => {
                return _.isEqual(id, unitIdToUpdate)
              }
            )

            if (_.eq(unitIndex, -1)) {
              return console.error(
                `${errorPath} / updateUnitParameter()
							\n Unit with ID ${unitIdToUpdate} couldn't be find
							\n Units list:`,
                list
              )
            }

            list[unitIndex] = { ...list[unitIndex], [stat]: value }

            set({ list })
          },

          getDistanceBetweenUnits: (
            firstUnitId: string,
            secondUnitId: string
          ): number => {
            const { findUnit, list } = get()

            const firstUnit: Unit | Hero | null = findUnit(firstUnitId)
            const secondUnit: Unit | Hero | null = findUnit(secondUnitId)

            if (_.isNull(firstUnit) || _.isNull(secondUnit)) {
              console.error(
                `${errorPath} / getDistanceBetweenUnits()
							\n Unit with ID ${firstUnitId} or ${secondUnitId} couldn't be find
							\n Units list:`,
                list
              )

              return -1
            }

            const fristUnitPositionVector3: THREE.Vector3 = new THREE.Vector3(
              ...firstUnit.position
            )

            const secondUnitPositionVector3: THREE.Vector3 = new THREE.Vector3(
              ...secondUnit.position
            )

            return fristUnitPositionVector3.distanceToSquared(
              secondUnitPositionVector3
            )
          },

          getUnitType: (unitId: Unit['id']): UnitType | null => {
            const unit: Unit | Hero | null = get().findUnit(unitId)

            if (_.isNull(unit)) {
              console.error(
                `${errorPath} / getUnitType()
							\n Unit with ID ${unitId} couldn't be find
							\n Units list:`,
                get().list
              )

              return null
            }

            const maxMeleeRange: number = 4

            return _.inRange(unit.attack.range, 0, maxMeleeRange)
              ? 'melee'
              : 'range'
          },

          triggerAttackMelee: (
            attackingUnitId: Unit['id'],
            attackedUnitId: Unit['id']
          ): void => {},

          triggerAttackRange: (
            attackingUnitId: Unit['id'],
            attackedUnitId: Unit['id']
          ): void => {},

          onNewTarget: (attackingUnitId: Unit['id']): void => {
            const attackingUnitType: UnitType | null =
              get().getUnitType(attackingUnitId)

            if (_.isNull(attackingUnitType)) {
              return console.error(
                `${errorPath} / onNewTarget()
							\n Couldn't get unit type with ID ${attackingUnitId}
							\n Attacking unit ID:`,
                attackingUnitId
              )
            }

            console.log('onNewTarget', attackingUnitId)
          },
        }
      },
      { name: 'units-storage' }
    )
  )
)

const errorPath = `store / units / useUnitsStore`
