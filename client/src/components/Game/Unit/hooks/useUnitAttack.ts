import { useCallback, useContext, useEffect, useRef } from 'react'
import { useUnitsStore } from '@/store/units/useUnitsStore'
import { useGameStore } from '@/store/game/useGameStore'

import { shallow } from 'zustand/shallow'
import * as YUKA from 'yuka'
import _ from 'lodash'

import { EngineContext } from '../../Engine/Engine.context'
import { UnitState } from '@/interfaces/unitState'
import { Unit } from '@/interfaces/unit'

import { engineContext } from '../../Engine/Engine.context'

import { engine } from '../../Engine/Engine.config'

export function useUnitAttack(unitId: Unit['id']): void {
  const { bulletsCollector } = useContext<EngineContext>(engineContext)

  const entityManager: YUKA.EntityManager = useGameStore(
    ({ entityManager }) => entityManager
  )

  const state: UnitState =
    useUnitsStore(({ list }) => list.get(unitId)?.state, shallow) ??
    UnitState.Idle

  const speed: number =
    useUnitsStore(({ list }) => list.get(unitId)?.attack?.speed, shallow) ??
    engine.defaultAttackSpeed

  const duration: number =
    useUnitsStore(({ list }) => list.get(unitId)?.attack?.duration, shallow) ??
    engine.defaultAttackDuration

  const target: Unit['id'] | null =
    useUnitsStore(({ list }) => list.get(unitId)?.target, shallow) ?? null

  const timeout = useRef<NodeJS.Timeout>()

  const lookAtTarget = useCallback((): void => {
    const gameEntity: YUKA.GameEntity | null =
      entityManager.getEntityByName(unitId)

    if (_.isNull(target)) {
      console.error(`${errorPath} / attack()\nTarget ID is null`)

      return
    }

    const targetGameEntity: YUKA.GameEntity | null =
      entityManager.getEntityByName(target)

    if (_.isNull(gameEntity)) {
      console.error(`${errorPath} / attack()\nGame entity couldn't be found`)

      return
    }

    if (_.isNull(targetGameEntity)) {
      console.error(
        `${errorPath} / attack()\nTarget game entity couldn't be found`
      )

      return
    }

    //ToDo Find out why lookAt doesn't work
    gameEntity.lookAt(targetGameEntity.position)
  }, [entityManager, unitId, target])

  const attack = useCallback((): void => {
    timeout.current = setTimeout((): void => {
      if (_.isUndefined(bulletsCollector)) {
        console.error(
          `${errorPath} / attack()\nBullets set component is undefined`
        )

        return
      }

      if (_.isNull(target)) {
        console.error(`${errorPath} / attack()\nTarget is null`)

        return
      }

      lookAtTarget()
      bulletsCollector.addBullet(unitId, target)
    }, duration)
  }, [duration, unitId, target, bulletsCollector, lookAtTarget])

  useEffect((): (() => void) => {
    let attackInterval: NodeJS.Timer = setInterval(attack, speed)

    if (!_.isEqual(state, UnitState.Attacking)) {
      clearInterval(attackInterval)
      clearTimeout(timeout.current)
    }

    return () => {
      clearInterval(attackInterval)
      clearTimeout(timeout.current)
    }
  }, [state, attack, speed])
}

const errorPath = `components / Game / vehicles / hooks / useUnitAttack`
