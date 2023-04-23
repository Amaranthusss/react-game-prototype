import { usePlayerUnit } from '@/hooks/usePlayerUnit'

import _ from 'lodash'

import styles from './StatsUI.module.scss'

export function StatsUI(): JSX.Element {
  const { hero } = usePlayerUnit()

  if (_.isNil(hero)) {
    return <span />
  }

  return (
    <div className={styles.container}>
      <p>
        ⚔ Damage [{hero.attack.type}]: {hero.attack.baseDamage}
      </p>

      <p>
        🛡 Armor [{hero.defence.type}]: {hero.defence.value}
      </p>

      <p>🦵 Agility: {hero.agility}</p>
      <p>💪 Strength: {hero.strength}</p>
      <p>📜 Intellect : {hero.intellect}</p>
    </div>
  )
}
