import { Portrait } from './Portrait/Portrait'

import { usePlayerStore } from '@/store/player/usePlayerStore'

import { toPercents } from '@/utils/toPercents'

import styles from './CharacterUI.module.scss'

export function CharacterUI(): JSX.Element {
  const { mana, health, maxMana, maxHealth, level } = usePlayerStore()

  return (
    <div className={styles.container}>
      <Portrait
        level={level}
        healthPercent={toPercents(health, maxHealth)}
        manaPercent={toPercents(mana, maxMana)}
      />
    </div>
  )
}
