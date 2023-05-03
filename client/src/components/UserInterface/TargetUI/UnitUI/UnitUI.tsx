import Image from 'next/image'

import { UnitUIProps } from './UnitUI.interface'

import leather from '@/assets/icons/leather.jpg'
import melee from '@/assets/icons/melee.jpg'

import styles from './UnitUI.module.scss'

export function UnitUI({ unit }: UnitUIProps): JSX.Element {
  return (
    <div className={styles.base}>
      <div className={styles.singleStat}>
        <Image className={styles.icon} src={melee} alt={'damage'} priority />

        <div className={styles.text}>
          <span className={styles.caption}>Damage:</span>
          <span>{unit.attack.baseDamage}</span>
        </div>
      </div>

      <div className={styles.singleStat}>
        <Image className={styles.icon} src={leather} alt={'armor'} priority />

        <div className={styles.text}>
          <span className={styles.caption}>Armor:</span>
          <span>{unit.defence.value}</span>
        </div>
      </div>
    </div>
  )
}
