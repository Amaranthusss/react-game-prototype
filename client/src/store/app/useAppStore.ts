import { devtools } from 'zustand/middleware'
import { create } from 'zustand'

import { AppStore } from './interface'

export const useAppStore = create<AppStore>()(
  devtools(
    (set, get): AppStore => {
      return {
        fps: 0,
      }
    },
    { name: 'app-storage' }
  )
)
