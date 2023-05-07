import { useUnitsStore } from '@/store/units/useUnitsStore'
import { usePlayer } from '@/hooks/usePlayer'

import _ from 'lodash'

import styles from './StatsUI.module.scss'

export function StatsUI(): JSX.Element {
  const { playerHero } = usePlayer()

  const targetUnit = useUnitsStore(({ list }) =>
    list.get(playerHero?.target ?? '_empty')
  )

  const getDistanceBetweenUnits = useUnitsStore(
    ({ getDistanceBetweenUnits }) => getDistanceBetweenUnits
  )

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
      <span>
        <b>Target name: {targetUnit?.name ?? 'None'}</b>
        <p>
          Distance to hero:{' '}
          {_.round(
            getDistanceBetweenUnits(playerHero.id, targetUnit?.id ?? '_empty'),
            2
          )}
        </p>
        <p>Target of target: {targetUnit?.target ?? 'None'}</p>
        <p>Target X: {_.round(targetUnit?.position?.[0] ?? 0, 2)}</p>
        <p>Target Z: {_.round(targetUnit?.position?.[2] ?? 0, 2)}</p>
        <p>Target state: {targetUnit?.state ?? '-'}</p>
      </span>
      <p>State: {playerHero.state}</p>
    </div>
  )
}
