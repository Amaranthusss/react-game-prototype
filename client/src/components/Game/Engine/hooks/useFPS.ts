import { useEffect, useRef } from 'react'
import { useGameStore } from '@/store/game/useGameStore'
import { useFrame } from '@react-three/fiber'

import { SetFps } from '@/store/game/interface'

/**
 * Calculates frames per second and stores current value at App Store
 */

export function useFPS(): void {
  const setFps: SetFps = useGameStore(({ setFps }) => setFps)

  const currentFrames = useRef<number>(0)

  useEffect((): (() => void) => {
    const perSecondInterval: NodeJS.Timer = setInterval((): void => {
      setFps(currentFrames.current)
      currentFrames.current = 0
    }, 1000)

    return (): void => {
      clearInterval(perSecondInterval)
    }
  }, [setFps])

  useFrame((): void => {
    currentFrames.current++
  })
}
