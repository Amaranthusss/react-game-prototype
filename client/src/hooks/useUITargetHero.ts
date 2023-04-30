import { useGameStore } from '@/store/game/useGameStore'
import { useCallback } from 'react'

import { SetUITargetId } from '@/store/game/interface'

export function useUITargetHero() {
  const setUITargetId: SetUITargetId = useGameStore(
    ({ setUITargetId }) => setUITargetId
  )

  const playerName: string = useGameStore(({ playerName }) => playerName)

  const uiTargetHero = useCallback((): void => {
    setUITargetId(playerName)
  }, [setUITargetId, playerName])

  return { uiTargetHero }
}
