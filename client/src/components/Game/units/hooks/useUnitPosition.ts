import { useGameStore } from '@/store/game/useGameStore'
import { useUnitsStore } from '@/store/units/useUnitsStore'
import { useFrame } from '@react-three/fiber'

import * as YUKA from 'yuka'
import _ from 'lodash'

import { FindUnit, UpdateUnitParameter } from '@/store/units/interface'
import { SimplePosition } from '@/interfaces/simplePosition'
import { Unit } from '@/interfaces/unit'

import { engine } from '../../Engine/Engine.config'

export function useUnitPosition(unitId: Unit['id']): void {
  const entityManager: YUKA.EntityManager = useGameStore(
    ({ entityManager }) => entityManager
  )

  const updateUnitParameter: UpdateUnitParameter = useUnitsStore(
    ({ updateUnitParameter }) => updateUnitParameter
  )

  const findUnit: FindUnit = useUnitsStore(({ findUnit }) => findUnit)

  useFrame((): void => {
    const prevPosition: SimplePosition =
      findUnit(unitId)?.position ?? engine.defaultPlayerPosition

    const vehicle: YUKA.GameEntity | null =
      entityManager.getEntityByName(unitId)

    if (vehicle == null) {
      return
    }

    const nextPosition = _.map(
      [vehicle.position.x, vehicle.position.y, vehicle.position.z],
      (point: number): number => _.round(point, 2)
    ) as SimplePosition

    if (_.isEqual(prevPosition, nextPosition)) {
      return
    }

    updateUnitParameter<'position'>(unitId, 'position', nextPosition)
  })
}
