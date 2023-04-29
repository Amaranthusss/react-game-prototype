import { Portrait } from './Portrait/Portrait'

import { usePlayer } from '@/hooks/usePlayer'

import { toPercents } from '@/utils/toPercents'
import _ from 'lodash'

import styles from './CharacterUI.module.scss'

export function CharacterUI(): JSX.Element {
  const { playerHero } = usePlayer()

  if (_.isNil(playerHero)) {
    return <span />
  }

  return (
    <div className={styles.container}>
      <Portrait
        level={playerHero.level}
        healthPercent={toPercents(playerHero.health, playerHero.maxHealth)}
        manaPercent={toPercents(playerHero.mana, playerHero.maxMana)}
      />
    </div>
  )
}
