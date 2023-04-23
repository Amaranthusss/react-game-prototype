import { Portrait } from './Portrait/Portrait'

import { usePlayerUnit } from '@/hooks/usePlayerUnit'

import { toPercents } from '@/utils/toPercents'
import _ from 'lodash'

import styles from './CharacterUI.module.scss'

export function CharacterUI(): JSX.Element {
  const { hero } = usePlayerUnit()

  if (_.isNil(hero)) {
    return <span />
  }

  return (
    <div className={styles.container}>
      <Portrait
        level={hero.level}
        healthPercent={toPercents(hero.health, hero.maxHealth)}
        manaPercent={toPercents(hero.mana, hero.maxMana)}
      />
    </div>
  )
}
