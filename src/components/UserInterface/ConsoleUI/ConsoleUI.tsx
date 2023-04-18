import { useAppStore } from '@/store/app/useAppStore'

import styles from './ConsoleUI.module.scss'

export function ConsoleUI(): JSX.Element {
  const fps: number = useAppStore().fps

  return (
    <div className={styles.container}>
      <p className={styles.version}>Prototype v0.1.0</p>
      <p suppressHydrationWarning>FPS: {fps}</p>
    </div>
  )
}
