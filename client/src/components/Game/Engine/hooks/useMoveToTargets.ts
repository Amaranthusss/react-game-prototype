import { useCallback, useEffect } from 'react'
import { useUnitsStore } from '@/store/units/useUnitsStore'

import _ from 'lodash'

import { MoveUnitToUnit } from '@/store/units/interface'
import { Hero } from '@/interfaces/hero'
import { Unit } from '@/interfaces/unit'

import { engine } from '../Engine.config'

export function useMoveToTargets(): void {
  const moveUnitToUnit: MoveUnitToUnit = useUnitsStore(
    ({ moveUnitToUnit }) => moveUnitToUnit
  )

  const list: Map<Unit['id'], Unit | Hero> = useUnitsStore(({ list }) => list)

  const trigger = useCallback((): void => {
    list.forEach((unit): void => {
      if (unit.id === 'Amaranthus') return //ToDo Only for tests

      if (!_.isNull(unit.target)) {
        moveUnitToUnit(unit.id, unit.target)
      }
    })
  }, [list, moveUnitToUnit])

  useEffect((): (() => void) => {
    const unitsRelationsDetection: NodeJS.Timer = setInterval(
      trigger,
      engine.refreshTargetsPositionsInterval
    )

    return (): void => {
      clearInterval(unitsRelationsDetection)
    }
  }, [trigger])
}
