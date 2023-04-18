import { useEffect, useRef } from 'react'
import { useAppStore } from '@/store/app/useAppStore'
import { useFrame } from '@react-three/fiber'

/**
 * Calculates frames per second and stores current value at App Store
 */

export function useFPS(): void {
  const currentFrames = useRef<number>(0)

  useEffect((): (() => void) => {
    const perSecondInterval: NodeJS.Timer = setInterval((): void => {
      useAppStore.setState({ fps: currentFrames.current })
      currentFrames.current = 0
    }, 1000)

    return (): void => {
      clearInterval(perSecondInterval)
    }
  }, [])

  useFrame((): void => {
    currentFrames.current++
  })
}
