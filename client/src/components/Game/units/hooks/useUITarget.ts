import { useGameStore } from '@/store/game/useGameStore'
import { useCallback } from 'react'

import _ from 'lodash'

import { SetUITargetId } from '@/store/game/interface'
import { ThreeEvent } from '@react-three/fiber'
import { GroupProps } from '@react-three/fiber'
import { Unit } from '@/interfaces/unit'

export function useUITarget(
  unitId: Unit['id'],
  groupProps: GroupProps | undefined
) {
  const uiTargetId: string | undefined = useGameStore(
    ({ uiTargetId }) => uiTargetId
  )

  const setUITargetId: SetUITargetId = useGameStore(
    ({ setUITargetId }) => setUITargetId
  )

  const onUITarget = useCallback(
    (event: ThreeEvent<MouseEvent>): void => {
      setUITargetId(unitId)

      if (!_.isUndefined(groupProps) && _.isFunction(groupProps?.onClick)) {
        groupProps.onClick(event)
      }
    },
    [unitId, groupProps, setUITargetId]
  )

  return { onUITarget, uiTargetId }
}
