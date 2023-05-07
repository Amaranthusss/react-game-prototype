import { useCallback, useEffect, useRef } from 'react'
import { useUnitsStore } from '@/store/units/useUnitsStore'

import _ from 'lodash'

import { UnitState } from '@/interfaces/unitState'
import { Unit } from '@/interfaces/unit'

import { engine } from '../../Engine/Engine.config'

export function useUnitAttack(unitId: Unit['id']) {
  const state: UnitState =
    useUnitsStore(({ list }) => list.get(unitId)?.state) ?? UnitState.Idle

  const speed: number =
    useUnitsStore(({ list }) => list.get(unitId)?.attack?.speed) ??
    engine.defaultAttackSpeed

  const duration: number =
    useUnitsStore(({ list }) => list.get(unitId)?.attack?.duration) ??
    engine.defaultAttackDuration

  const interval = useRef<NodeJS.Timer>()
  const timeout = useRef<NodeJS.Timeout>()
  console.log(state, speed, duration)

  const attack = useCallback((): void => {
    timeout.current = setTimeout((): void => {
      console.log('atakuje!')
    }, duration)
  }, [duration])

  useEffect((): void => {
    if (_.isEqual(state, UnitState.Attacking)) {
      interval.current = setInterval(attack, speed)
    } else {
      clearInterval(interval.current)
      clearTimeout(timeout.current)
    }
  }, [state, attack, speed])
}
