import { useUnitsStore } from '../units/useUnitsStore'

import { devtools, persist } from 'zustand/middleware'
import { create } from 'zustand'
import _ from 'lodash'

import { PlayerStore } from './interface'
import { Hero } from '@/interfaces/hero'
import { Unit } from '@/interfaces/unit'

export const usePlayerStore = create<PlayerStore>()(
  devtools(
    persist(
      (set, get): PlayerStore => ({
        unitId: '',
        getHero: (): Hero | undefined => {
          const unitId: Unit['id'] = get().unitId

          return useUnitsStore.getState().findUnit(unitId) as Hero | undefined
        },
      }),
      { name: 'player-storage' }
    )
  )
)
