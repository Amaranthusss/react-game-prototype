import { useEffect, useState } from 'react'
import { usePlayerStore } from '@/store/player/usePlayerStore'
import { useUnitsStore } from '@/store/units/useUnitsStore'

import { Hero } from '@/interfaces/hero'
import { Unit } from '@/interfaces/unit'

/**
 * Listens all changes at units store and returns player (hero) unit state
 */

export function usePlayerUnit() {
  const [hero, setHero] = useState<Hero | null>(null)

  const id: Unit['id'] = usePlayerStore(({ unitId }) => unitId)

  const heroLastUpdate: number | undefined = useUnitsStore
    .getState()
    .list.get(id)?.lastUpdate

  useEffect((): void => {
    if (useUnitsStore.getState().list.has(id)) {
      setHero(useUnitsStore.getState().list.get(id) as Hero)
    }
  }, [heroLastUpdate, id])

  return { hero }
}
