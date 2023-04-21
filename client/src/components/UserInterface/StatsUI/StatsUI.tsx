import { usePlayerStore } from '@/store/player/usePlayerStore'

import _ from 'lodash'

import { Hero } from '@/interfaces/hero'

import styles from './StatsUI.module.scss'

export function StatsUI(): JSX.Element {
  return <span />
  // const hero: Hero | undefined = usePlayerStore().getHero()

  // if (_.isUndefined(hero)) {
  //   return <span />
  // }

  // const { agility, strength, intellect, attack, defence } = hero

  // return (
  //   <div className={styles.container}>
  //     <p>
  //       ⚔ Damage [{attack.type}]: {attack.baseDamage}
  //     </p>

  //     <p>
  //       🛡 Armor [{defence.type}]: {defence.value}
  //     </p>

  //     <p>🦵 Agility: {agility}</p>
  //     <p>💪 Strength: {strength}</p>
  //     <p>📜 Intellect : {intellect}</p>
  //   </div>
  // )
}
