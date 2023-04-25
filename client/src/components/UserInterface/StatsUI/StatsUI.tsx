import { usePlayerUnit } from '@/hooks/usePlayerUnit'
import { useUnitsStore } from '@/store/units/useUnitsStore'

import _ from 'lodash'
import { useMemo } from 'react'

import styles from './StatsUI.module.scss'

export function StatsUI(): JSX.Element {
  const { hero } = usePlayerUnit()
  const findUnit = useUnitsStore().findUnit

  const targetUnit = useMemo(() => {
    if (_.isNil(hero?.target) || hero?.target == null) {
      return
    }

    return findUnit(hero.target)
  }, [findUnit, hero?.target])

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
      <p>📜 Intellect: {hero.intellect}</p>
      <p>
        <b>Target name: {targetUnit?.name ?? 'None'}</b>
      </p>
      <p>State: {hero.state}</p>
    </div>
  )
}
