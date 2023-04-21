import { useCallback, useEffect } from 'react'
import { useUnitsStore } from '@/store/units/useUnitsStore'

import _ from 'lodash'

import { Hero } from '@/interfaces/hero'
import { Unit } from '@/interfaces/unit'

import { engine } from '../Engine.config'

export function useUnitsRelations(): void {
  const update = useUnitsStore().updateUnitParameter

  const selectTarget = useCallback(
    (attackingUnitId: Unit['id']): Unit['id'] => {
      const list: (Unit | Hero)[] = useUnitsStore.getState().list

      const targets: Unit['id'][] | undefined = useUnitsStore
        .getState()
        .findUnit(attackingUnitId)?.targets

      if (_.isUndefined(targets)) {
        console.error(`${errorPath} / selectTarget()
			\n Attacking unit with ID ${attackingUnitId} couldn't be find
			\n So targets are unkown`)
        return ''
      }

      const getTargetWithLowestHealth = (): Unit['id'] => {
        return _.chain(list)
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
    []
  )

  const tryUpdateTarget = useCallback(
    (id: Unit['id'], state: Unit['state']): void => {
      const isNotBusy: boolean =
        state !== 'casting' && state !== 'attacking' && state !== 'dead'

      if (isNotBusy) {
        update<'target'>(id, 'target', selectTarget(id))
      }
    },
    [update, selectTarget]
  )

  useEffect((): (() => void) => {
    const onUpdate = (): void => {
      const list: (Unit | Hero)[] = useUnitsStore.getState().list

      _.forEach(
        list,
        ({ id, attack, fieldOfView, state }: Unit | Hero): void => {
          _.forEach(list, ({ id: targetId }: Unit | Hero): void => {
            const isMatchingUnit: boolean = _.isEqual(id, targetId)

            if (isMatchingUnit) return

            const rangeToTarget: number = _.round(
              useUnitsStore.getState().getDistanceBetweenUnits(id, targetId),
              engine.rangePrecision
            )

            const shouldBePulledByTargetUnit: boolean = _.lte(
              rangeToTarget,
              _.max([attack.range, fieldOfView])
            )

            if (shouldBePulledByTargetUnit) {
              tryUpdateTarget(id, state)
            }
          })
        }
      )
    }

    const unitsRelationsDetection = setInterval(
      onUpdate,
      engine.unitsRelationsInterval
    )

    return (): void => {
      clearInterval(unitsRelationsDetection)
    }
  }, [tryUpdateTarget])
}

const errorPath = `components / Game / Engine/ hooks / useUnitsRelations`
