import { devtools, persist } from 'zustand/middleware'
import { create } from 'zustand'
import * as THREE from 'three'
import _ from 'lodash'

import { CreateUnitNewHero, CreateUnitNewUnit } from './interface'
import { FindUnit, UnitsStore } from './interface'
import { Unit } from '@/interfaces/unit'
import { Hero } from '@/interfaces/hero'

const getDefaultUnitValues = (
  health: number,
  mana: number
): Pick<
  Unit,
  'maxHealth' | 'maxMana' | 'bonus' | 'target' | 'targets' | 'state'
> => {
  return {
    maxHealth: health,
    maxMana: mana,
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

          findUnit: (idToFind: Unit['id']): Unit | Hero | undefined => {
            const list: UnitsStore['list'] = get().list

            return _.find(list, ({ id }: Unit | Hero): boolean => {
              return _.isEqual(id, idToFind)
            })
          },

          createUnit: (newUnit: CreateUnitNewUnit): Unit['id'] => {
            const prevList: UnitsStore['list'] = get().list
            const find: UnitsStore['findUnit'] = get().findUnit

            const isDefinied: boolean = !_.isUndefined(find(newUnit.id))

            if (isDefinied) {
              return newUnit.id
            }

            const unit: Unit = {
              ...newUnit,
              ...getDefaultUnitValues(newUnit.health, newUnit.mana),
            }

            set({ list: [...prevList, unit] })

            return unit.id
          },

          createHero: (newHero: CreateUnitNewHero): Unit['id'] => {
            const prevList: UnitsStore['list'] = get().list
            const find: UnitsStore['findUnit'] = get().findUnit

            const isDefinied: boolean = !_.isUndefined(find(newHero.id))

            if (isDefinied) {
              return newHero.id
            }

            const hero: Hero = {
              ...newHero,
              ...getDefaultUnitValues(newHero.health, newHero.mana),
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

            const characterIndex: number = _.findIndex(
              list,
              ({ id }: Unit | Hero): boolean => {
                return _.isEqual(id, unitIdToUpdate)
              }
            )

            if (_.eq(characterIndex, -1)) {
              console.error(
                `${errorPath} / update()
							\n Character with ID ${unitIdToUpdate} couldn't be find
							\n Units list:`,
                list
              )

              return
            }

            list[characterIndex] = { ...list[characterIndex], [stat]: value }

            set({ list })
          },

          getDistanceBetweenUnits: (
            firstCharacterId: string,
            secondCharacterId: string
          ): number => {
            const find: FindUnit = get().findUnit
            const list: UnitsStore['list'] = get().list

            const firstCharacter: Unit | Hero | undefined =
              find(firstCharacterId)

            const secondCharacter: Unit | Hero | undefined =
              find(secondCharacterId)

            if (_.isUndefined(firstCharacter)) {
              console.error(
                `${errorPath} / getRange()
							\n Character (first) with ID ${firstCharacterId} couldn't be find
							\n Characters list:`,
                list
              )

              return -1
            }

            if (_.isUndefined(secondCharacter)) {
              console.error(
                `${errorPath} / getRange()
							\n Character (second) with ID ${secondCharacter} couldn't be find
							\n Characters list:`,
                list
              )

              return -1
            }

            const fristCharacterPositionVector3: THREE.Vector3 =
              new THREE.Vector3(...firstCharacter.position)

            const secondCharacterPositionVector3: THREE.Vector3 =
              new THREE.Vector3(...secondCharacter.position)

            return fristCharacterPositionVector3.distanceToSquared(
              secondCharacterPositionVector3
            )
          },
        }
      },
      { name: 'units-storage' }
    )
  )
)

const errorPath = `store / units / useUnitsStore`
