import { useEffect, useState } from 'react'
import { usePlayerStore } from '@/store/player/usePlayerStore'
import { useUnitsStore } from '@/store/units/useUnitsStore'

import { Hero } from '@/interfaces/hero'

/**
 * Listens all changes at units store and returns player (hero) unit state
 */

export function usePlayerUnit() {
  const [hero, setHero] = useState<Hero | null>(null)

  const id = usePlayerStore(({ unitId }) => unitId)
  const heroLastUpdate = (useUnitsStore.getState().list[id] as Hero | null)
    ?.lastUpdate

  useEffect((): void => {
    setHero(useUnitsStore.getState().list[id] as Hero | null)
  }, [heroLastUpdate, id])

  return { hero }
}
