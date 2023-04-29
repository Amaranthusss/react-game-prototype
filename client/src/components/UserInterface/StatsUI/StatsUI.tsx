import { useUnitsStore } from '@/store/units/useUnitsStore'
import { usePlayer } from '@/hooks/usePlayer'
import { useMemo } from 'react'

import { shallow } from 'zustand/shallow'
import _ from 'lodash'

import { FindUnit } from '@/store/units/interface'

import styles from './StatsUI.module.scss'

export function StatsUI(): JSX.Element {
  const { playerHero } = usePlayer()

  const findUnit: FindUnit = useUnitsStore(({ findUnit }) => findUnit, shallow)

  const targetUnit = useMemo(() => {
    if (_.isNil(playerHero?.target) || playerHero?.target == null) {
      return
    }

    return findUnit(playerHero.target)
  }, [findUnit, playerHero?.target])

  if (_.isNil(playerHero)) {
    return <span />
  }

  return (
    <div className={styles.container}>
      <p>
        ⚔ Damage [{playerHero.attack.type}]: {playerHero.attack.baseDamage}
      </p>

      <p>
        🛡 Armor [{playerHero.defence.type}]: {playerHero.defence.value}
      </p>

      <p>🦵 Agility: {playerHero.agility}</p>
      <p>💪 Strength: {playerHero.strength}</p>
      <p>📜 Intellect: {playerHero.intellect}</p>
      <p>📜 X: {playerHero.position[0]}</p>
      <p>📜 Z: {playerHero.position[2]}</p>
      <p>
        <b>Target name: {targetUnit?.name ?? 'None'}</b>
      </p>
      <p>State: {playerHero.state}</p>
    </div>
  )
}
