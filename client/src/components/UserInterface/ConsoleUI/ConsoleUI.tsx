import { useAppStore } from '@/store/app/useAppStore'

import styles from './ConsoleUI.module.scss'

export function ConsoleUI(): JSX.Element {
  const fps: number = useAppStore().fps

  const APP_VERSION: string | undefined = process.env.npm_package_version

  return (
    <div className={styles.container}>
      <p className={styles.version}>Prototype v{APP_VERSION ?? '?'}</p>
      <p suppressHydrationWarning>FPS: {fps}</p>
    </div>
  )
}
