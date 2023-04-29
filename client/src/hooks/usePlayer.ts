import { useUnitsStore } from '@/store/units/useUnitsStore'

import { Hero } from '@/interfaces/hero'
import { Unit } from '@/interfaces/unit'

export function usePlayer() {
  const playerHeroId: Unit['id'] | null = useUnitsStore(
    ({ playerHeroId }) => playerHeroId
  )

  const playerHero = useUnitsStore(
    ({ list }) => list.get(playerHeroId ?? '_empty') ?? null
  ) as Hero | null

  return { playerHero }
}
