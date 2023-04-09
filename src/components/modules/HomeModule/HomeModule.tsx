import Game from '@/components/Game/Game'

import { useCallback, useRef } from 'react'

import { GameComponent } from '@/components/Game/Game.interface'

import styles from './HomeModule.module.scss'

export const HomeModule = (): JSX.Element => {
  const canvasComponent = useRef<GameComponent>()

  const onClick = useCallback((): void => {}, [])

  return (
    <div className={styles.container}>
      <Game
        componentCallback={(component: GameComponent): void => {
          canvasComponent.current = component
        }}
      />

      <div className={styles.toolbar}>
        <button onClick={onClick}>Event</button>
      </div>
    </div>
  )
}
