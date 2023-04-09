import { useCallback, useEffect } from 'react'

import { GameComponent } from '../Game.interface'

export const useComponent = (
  componentCallback: (component: GameComponent) => void
): void => {
  useEffect((): void => {
    componentCallback({})
  }, [componentCallback])
}
