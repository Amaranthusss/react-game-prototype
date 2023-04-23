import { useCallback, useEffect } from 'react'
import { useUnitsStore } from '@/store/units/useUnitsStore'

import _ from 'lodash'

import { UpdateUnitParameter } from '@/store/units/interface'
import { Hero } from '@/interfaces/hero'
import { Unit } from '@/interfaces/unit'

import { engine } from '../Engine.config'

export function useUnitsRelations(): void {
  const updateUnitParameter: UpdateUnitParameter =
    useUnitsStore().updateUnitParameter

  const updateUnitsTargets = useCallback((): void => {
    const list: {
      [id: Unit['id']]: Unit | Hero
    } = useUnitsStore.getState().list

    // * For each unit in the game
    _.forEach(list, ({ id, name, attack, fieldOfView }: Unit | Hero): void => {
      const nextTargets: Unit['targets'] = []

      // * Match range to each other unit in the game
      _.forEach(
        list,
        ({ id: targetId, name: targetName }: Unit | Hero): void => {
          const isMatchingUnit: boolean = _.isEqual(id, targetId)

          if (isMatchingUnit) return

          const rangeToTarget: number = _.round(
            useUnitsStore.getState().getDistanceBetweenUnits(id, targetId),
            engine.rangePrecision
          )

          console.log(name, 'is in range to', targetName, '-', rangeToTarget)

          const shouldBePulledByTargetUnit: boolean = _.lte(
            rangeToTarget,
            _.max([attack.range, fieldOfView])
          )

          if (shouldBePulledByTargetUnit) {
            nextTargets.push(targetId)
          }
        }
      )

      updateUnitParameter<'targets'>(id, 'targets', nextTargets)
    })
  }, [updateUnitParameter])

  useEffect((): (() => void) => {
    const unitsRelationsDetection = setInterval(
      updateUnitsTargets,
      engine.unitsRelationsInterval
    )

    return (): void => {
      clearInterval(unitsRelationsDetection)
    }
  }, [updateUnitsTargets])
}

const errorPath = `components / Game / Engine/ hooks / useUnitsRelations`
