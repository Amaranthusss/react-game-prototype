import { useGameStore } from '../game/useGameStore'

import { transformBehaviors } from '@/utils/transformBehaviors'
import { devtools } from 'zustand/middleware'
import { create } from 'zustand'
import * as THREE from 'three'
import * as YUKA from 'yuka'
import _ from 'lodash'

import { CreateUnitNewHero, CreateUnitNewUnit } from './interface'
import { UnitsStore } from './interface'
import { UnitType } from '@/interfaces/unitType'
import { Unit } from '@/interfaces/unit'
import { Hero } from '@/interfaces/hero'

import { Config } from '@/constants/config'

const getDefaultUnitValues = (
  newUnit: CreateUnitNewUnit | CreateUnitNewHero
): Pick<
  Unit,
  | 'maxHealth'
  | 'maxMana'
  | 'bonus'
  | 'target'
  | 'targets'
  | 'state'
  | 'attack'
  | 'lastUpdate'
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
    target: null,
    targets: [],
    state: 'idle',
    lastUpdate: new Date().getTime(),
  }
}

export const useUnitsStore = create<UnitsStore>()(
  devtools(
    (set, get): UnitsStore => {
      return {
        list: new Map<Unit['id'], Unit | Hero>([]),

        findUnit: (idOfSearchedUnit: Unit['id']): Unit | Hero | null => {
          return get().list.get(idOfSearchedUnit) ?? null
        },

        createUnit: (newUnit: CreateUnitNewUnit): Unit['id'] => {
          const list: UnitsStore['list'] = get().list
          const findUnit: UnitsStore['findUnit'] = get().findUnit

          const isDefinied: boolean = !_.isNull(findUnit(newUnit.id))

          if (isDefinied) {
            console.error(
              `${errorPath} / createUnit()
							\n Tried to create a new unit with used before ID ${newUnit.id}
							\n Units list:`,
              list
            )

            return newUnit.id
          }

          const unit: Unit = {
            ...newUnit,
            ...getDefaultUnitValues(newUnit),
          }

          list.set(newUnit.id, unit)
          set({ list })

          return newUnit.id
        },

        createHero: (newHero: CreateUnitNewHero): Unit['id'] => {
          const list: UnitsStore['list'] = get().list
          const findUnit: UnitsStore['findUnit'] = get().findUnit
          const playerName: string = useGameStore.getState().playerName
          const isDefinied: boolean = !_.isNull(findUnit(newHero.id))
          const isPlayerHero: boolean = _.isEqual(newHero.id, playerName)

          if (isDefinied && !isPlayerHero) {
            console.error(
              `${errorPath} / createHero()
							\n Tried to create a new hero with used before ID ${newHero.id}
							\n Units list:`,
              list
            )

            return newHero.id
          }

          const hero: Hero = {
            ...newHero,
            ...getDefaultUnitValues(newHero),
            level: 1,
            experience: 0,
            maxExperience: 100,
          }

          list.set(newHero.id, hero)
          set({ list })

          return newHero.id
        },

        removeUnit: (idOfUnitToRemove: Unit['id']): void => {
          const list: UnitsStore['list'] = get().list

          list.delete(idOfUnitToRemove)
          set({ list })
        },

        updateUnitParameter: <T extends keyof Unit>(
          idUnitToUpdate: Unit['id'],
          stat: T,
          value: (Unit | Hero)[T]
        ): void => {
          const { list, tryAutoFindTarget, moveUnitToUnit } = get()

          const previousUnitData: Unit | Hero | undefined =
            list.get(idUnitToUpdate)

          if (_.isUndefined(previousUnitData)) {
            console.error(
              `${errorPath} / updateUnitParameter()
							\n Cannot update unit parameter because unit with ID ${idUnitToUpdate} couldn't be found
							\n Units list:`,
              list
            )

            return
          }

          const previousValue: (Unit | Hero)[T] = previousUnitData[stat]

          if (_.isEqual(value, previousValue)) return

          list.set(idUnitToUpdate, {
            ...previousUnitData,
            [stat]: value,
            lastUpdate: new Date().getTime(),
          })

          set({ list })

          switch (stat) {
            case 'target':
              if (value === 'Amaranthus') // ToDo Only for tests 
                moveUnitToUnit(previousUnitData.id, value as Unit['id'])
              break
            case 'targets':
              tryAutoFindTarget(idUnitToUpdate)
              break
          }
        },

        moveUnitToUnit: (
          movingUnitId: Unit['id'],
          targetUnitId: Unit['id'],
          /** @default 'attackRange' */
          distanceThreshold?: 'attackRange' | number
        ) => {
          const { findUnit, getDistanceBetweenUnits } = get()

          const movingUnit: Unit | Hero | null = findUnit(movingUnitId)
          const targetUnit: Unit | Hero | null = findUnit(targetUnitId)

          const entityManager: YUKA.EntityManager =
            useGameStore.getState().entityManager

          const navMesh: YUKA.NavMesh | undefined =
            useGameStore.getState().navMesh

          const vehicle: YUKA.Vehicle | null = entityManager.getEntityByName(
            movingUnitId
          ) as YUKA.Vehicle | null

          if (
            _.isNull(vehicle) ||
            _.isNull(movingUnit) ||
            _.isNull(targetUnit) ||
            _.isUndefined(navMesh)
          ) {
            console.error(
              `${errorPath} / moveUnitToUnit()
							\n Moving unit vehicle or Navigation mesh or Target unit could not be found`,
              `\n Moving unit with ID ${movingUnitId} - vehicle:`,
              vehicle,
              `\n Moving unit with ID ${movingUnitId}:`,
              movingUnit,
              `\n Target unit with ID ${targetUnitId}:`,
              targetUnit,
              `\n Navigation mesh:`,
              navMesh
            )

            return
          }

          if (
            _.isUndefined(distanceThreshold) ||
            distanceThreshold === 'attackRange'
          ) {
            distanceThreshold = movingUnit.attack.range
          }

          const { followPath } = transformBehaviors(vehicle.steering)

          if (_.isNull(followPath)) {
            console.error(
              `${errorPath} / moveUnitToUnit()
							\n Behaviors error`,
              `\n Follow path:`,
              followPath
            )

            return
          }

          const distanceBetweenUnits: number = getDistanceBetweenUnits(
            movingUnitId,
            targetUnitId
          )

          const isInRange: boolean = _.lte(
            distanceBetweenUnits,
            distanceThreshold
          )

          followPath.path.clear()
          followPath.active = true

          if (isInRange) {
            // ToDo Find out why model's still moving
            // ToDo forward when `active` is set as `false`
            // `followPath.active = false` should be enough to stop vehicle

            const from: YUKA.Vector3 = vehicle.position
            const path: YUKA.Vector3[] = navMesh.findPath(from, from)

            for (const point of path) {
              followPath.path.add(point)
            }
          } else {
            const from: YUKA.Vector3 = vehicle.position
            const to: YUKA.Vector3 = new YUKA.Vector3(
              targetUnit.position[0],
              targetUnit.position[1],
              targetUnit.position[2]
            )

            const path: YUKA.Vector3[] = navMesh.findPath(from, to)

            for (const point of path) {
              followPath.path.add(point)
            }
          }
        },

        getPlayerHero: (): Hero | null => {
          const { findUnit } = get()
          const playerHeroId: string = useGameStore.getState().playerName

          if (_.isNull(playerHeroId)) {
            return null
          }

          return findUnit(playerHeroId) as Hero | null
        },

        getDistanceBetweenUnits: (
          idOfFirstUnit: string,
          idOfSecondUnit: string
        ): number => {
          if (
            _.isEqual(idOfFirstUnit, Config.ignoredId) ||
            _.isEqual(idOfSecondUnit, Config.ignoredId)
          ) {
            return -1
          }

          const { findUnit, list } = get()

          const firstUnit: Unit | Hero | null = findUnit(idOfFirstUnit)
          const secondUnit: Unit | Hero | null = findUnit(idOfSecondUnit)

          if (_.isNull(firstUnit) || _.isNull(secondUnit)) {
            console.error(
              `${errorPath} / getDistanceBetweenUnits()
							\n Unit with ID ${idOfFirstUnit} or ${idOfSecondUnit} couldn't be found
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
							\n Unit with ID ${unitId} couldn't be found
							\n Units list:`,
              get().list
            )

            return null
          }

          const maxMeleeRange: number = 4

          return _.inRange(unit.attack.range, 0, maxMeleeRange)
            ? UnitType.Melee
            : UnitType.Range
        },

        tryAutoFindTarget: (matchingUnitId: Unit['id']): void => {
          const { findUnit, list, updateUnitParameter, findWeakestTarget } =
            get()

          const matchingUnit: Unit | Hero | null = findUnit(matchingUnitId)

          if (_.isNull(matchingUnit)) {
            console.error(
              `${errorPath} / autoFindTarget()
							\n Unit with ID ${matchingUnitId} couldn't be found
							\n Units list:`,
              list
            )

            return
          }

          const isNotBusy: boolean =
            matchingUnit.state !== 'casting' &&
            matchingUnit.state !== 'attacking' &&
            matchingUnit.state !== 'dead'

          if (isNotBusy) {
            const nextIdOfTargetUnit: Unit['id'] =
              findWeakestTarget(matchingUnitId)

            updateUnitParameter<'target'>(
              matchingUnitId,
              'target',
              nextIdOfTargetUnit
            )
          }
        },

        findWeakestTarget: (idOfMatchingUnit: Unit['id']) => {
          const { list, findUnit } = get()

          const targets: Unit['id'][] | null =
            findUnit(idOfMatchingUnit)?.targets ?? null

          if (_.isNull(targets)) {
            console.error(`${errorPath} / findWeakestTarget()
						\n Matching unit with ID ${idOfMatchingUnit} couldn't be found
						\n So targets are unkown`)
            return ''
          }

          const getTargetWithLowestHealth = (): Unit['id'] => {
            return _.chain(Array.from(list))
              .map((unit) => unit[1])
              .sortBy(({ mana }) => mana)
              .reverse()
              .find(({ id }: Unit | Hero): boolean =>
                _.some(targets, (targetId: string): boolean => {
                  return _.isEqual(targetId, id)
                })
              )
              .value()?.id
          }

          return getTargetWithLowestHealth()
        },
      }
    },
    { name: 'units-storage', serialize: { options: { map: true } } }
  )
)

const errorPath = `store / units / useUnitsStore`
