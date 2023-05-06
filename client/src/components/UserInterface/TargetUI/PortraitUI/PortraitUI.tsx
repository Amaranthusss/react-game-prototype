import Image from 'next/image'

import { useMemo } from 'react'

import { toPercents } from '@/utils/toPercents'

import { PortraitUIProps } from './PortraitUI.interface'

import styles from './PortraitUI.module.scss'

export function PortraitUI({ unit }: PortraitUIProps): JSX.Element {
  const healthPercent = useMemo((): number => {
    return toPercents(unit.health, unit.maxHealth)
  }, [unit.health, unit.maxHealth])

  const manaPercent = useMemo((): number => {
    return toPercents(unit.mana, unit.maxMana)
  }, [unit.mana, unit.maxMana])

  return (
    <div className={styles.portrait}>
      <Image alt={'portrait'} src={unit.icon} className={styles.icon} />

      <div className={styles.health}>
        <div className={styles.bar} style={{ width: `${healthPercent}%` }} />
      </div>

      <div className={styles.mana}>
        <div className={styles.bar} style={{ width: `${manaPercent}%` }} />
      </div>
    </div>
  )
}
