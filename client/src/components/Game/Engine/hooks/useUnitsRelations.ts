import { useCallback, useEffect } from 'react'
import { useUnitsStore } from '@/store/units/useUnitsStore'

import { shallow } from 'zustand/shallow'
import _ from 'lodash'

import { GetDistanceBetweenUnits } from '@/store/units/interface'
import { UpdateUnitParameter } from '@/store/units/interface'
import { Hero } from '@/interfaces/hero'
import { Unit } from '@/interfaces/unit'

import { engine } from '../Engine.config'

export function useUnitsRelations(): void {
  const list: Map<Unit['id'], Unit | Hero> = useUnitsStore(
    ({ list }) => list,
    shallow
  )

  const updateUnitParameter: UpdateUnitParameter = useUnitsStore(
    ({ updateUnitParameter }) => updateUnitParameter
  )

  const getDistanceBetweenUnits: GetDistanceBetweenUnits = useUnitsStore(
    ({ getDistanceBetweenUnits }) => getDistanceBetweenUnits
  )

  const updateUnitsTargets = useCallback((): void => {
    // * For each unit in the game
    list.forEach(({ id, attack, fieldOfView }): void => {
      const nextTargets: Unit['targets'] = []

      // * Match range to each other unit in the game
      list.forEach(({ id: targetId }): void => {
        const isMatchingUnit: boolean = _.isEqual(id, targetId)

        if (isMatchingUnit) return

        const rangeToTarget: number = _.round(
          getDistanceBetweenUnits(id, targetId),
          engine.rangePrecision
        )

        const isInRangeToPull: boolean = _.lte(
          rangeToTarget,
          _.max([attack.range, fieldOfView])
        )

        if (isInRangeToPull) {
          nextTargets.push(targetId)
        }
      })

      updateUnitParameter<'targets'>(id, 'targets', nextTargets)
    })
  }, [updateUnitParameter, list, getDistanceBetweenUnits])

  useEffect((): (() => void) => {
    const unitsRelationsDetection: NodeJS.Timer = setInterval(
      updateUnitsTargets,
      engine.unitsRelationsInterval
    )

    return (): void => {
      clearInterval(unitsRelationsDetection)
    }
  }, [updateUnitsTargets])
}

const errorPath = `components / Game / Engine/ hooks / useUnitsRelations`
