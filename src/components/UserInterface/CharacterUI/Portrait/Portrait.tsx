import Image from 'next/image'

import { PortraitProps } from './Portrait.interface'

import avatar from '@/assets/icons/rogue-icon.jpg'

import styles from './Portrait.module.scss'

export function Portrait({
  level,
  manaPercent,
  healthPercent,
}: PortraitProps): JSX.Element {
  return (
    <>
      <Image className={styles.image} src={avatar} alt={'portrait'} priority />
      <div className={styles.level}>{level}</div>

      <div className={styles.health}>
        <div className={styles.bar} style={{ width: `${healthPercent}%` }} />
      </div>

      <div className={styles.mana}>
        <div className={styles.bar} style={{ width: `${manaPercent}%` }} />
      </div>
    </>
  )
}
