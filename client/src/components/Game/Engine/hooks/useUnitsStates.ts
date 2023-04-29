import { useCallback, useEffect } from 'react'

import _ from 'lodash'

import { engine } from '../Engine.config'

export function useUnitsStates(): void {
  const trigger = useCallback((): void => {}, [])

  useEffect((): (() => void) => {
    const unitsRelationsDetection: NodeJS.Timer = setInterval(
      trigger,
      engine.unitsStatesRefreshInterval
    )

    return (): void => {
      clearInterval(unitsRelationsDetection)
    }
  }, [trigger])
}
