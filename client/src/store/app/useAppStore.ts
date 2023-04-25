import { devtools } from 'zustand/middleware'
import { create } from 'zustand'
import * as YUKA from 'yuka'

import { AppStore } from './interface'

export const useAppStore = create<AppStore>()(
  devtools(
    (set, get): AppStore => {
      return {
        fps: 0,
        entityManager: new YUKA.EntityManager(),
      }
    },
    { name: 'app-storage' }
  )
)
