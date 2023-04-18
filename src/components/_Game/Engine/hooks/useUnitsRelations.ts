import { useCallback, useEffect } from 'react'
import { useUnitsStore } from '@/store/units/useUnitsStore'

import _ from 'lodash'

import { Hero } from '@/interfaces/hero'
import { Unit } from '@/interfaces/unit'

import { engine } from '../Engine.config'

export function useUnitsRelations(): void {
  const update = useUnitsStore().update

  const selectTarget = useCallback(
    (attackingUnitId: Unit['id']): Unit['id'] => {
      const list: (Unit | Hero)[] = useUnitsStore.getState().list

      const targets: Unit['id'][] | undefined = useUnitsStore
        .getState()
        .find(attackingUnitId)?.targets

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

  useEffect((): (() => void) => {
    const onUpdate = (): void => {
      const list = useUnitsStore.getState().list

      _.forEach(list, ({ name, id, attack }): void => {
        _.forEach(list, ({ id: targetId, name: targetName }): void => {
          if (_.isEqual(id, targetId)) {
            return
          }

          const rangeToTarget: number = _.round(
            useUnitsStore.getState().getRange(id, targetId),
            engine.rangePrecision
          )

          if (_.lte(rangeToTarget, attack.range)) {
            update(id, 'target', selectTarget(id))
            console.log(
              name + ' is in range ' + rangeToTarget + ' to ' + targetName
            )
          }
        })
      })
    }

    const unitsRelationsDetection = setInterval(
      onUpdate,
      engine.unitsRelationsInterval
    )

    return (): void => {
      clearInterval(unitsRelationsDetection)
    }
  }, [update, selectTarget])
}

const errorPath = `components / Game / Engine/ hooks / useUnitsRelations`
