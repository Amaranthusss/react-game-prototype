import Image from 'next/image'

import { HeroUIProps } from './HeroUI.interface'

import melee from '@/assets/icons/melee.jpg'
import leather from '@/assets/icons/leather.jpg'
import agility from '@/assets/icons/agility.jpg'
import strength from '@/assets/icons/strength.jpg'
import intellect from '@/assets/icons/intellect.jpg'

import styles from './HeroUI.module.scss'
import _ from 'lodash'
import { Specialisation } from '@/interfaces/specialisation'

export function HeroUI({ hero }: HeroUIProps): JSX.Element {
  return (
    <>
      <div className={styles.level}>
        Level&nbsp;{hero.level}&nbsp;{hero.name}
      </div>

      <div className={styles.stats}>
        <div className={styles.base}>
          <div className={styles.singleStat}>
            <Image
              className={styles.icon}
              src={melee}
              alt={'damage'}
              priority
            />

            <div className={styles.text}>
              <span className={styles.caption}>Damage:</span>
              <span>{hero.attack.baseDamage}</span>
            </div>
          </div>

          <div className={styles.singleStat}>
            <Image
              className={styles.icon}
              src={leather}
              alt={'armor'}
              priority
            />

            <div className={styles.text}>
              <span className={styles.caption}>Damage:</span>
              <span>{hero.defence.value}</span>
            </div>
          </div>
        </div>

        <div className={styles.hero}>
          <div className={styles.primaryAttr}>
            <Image
              className={styles.icon}
              src={
                _.eq(hero.specialisation, Specialisation.Strength)
                  ? strength
                  : _.eq(hero.specialisation, Specialisation.Agility)
                  ? agility
                  : intellect
              }
              alt={'specialisation'}
              priority
            />
          </div>

          <div className={styles.values}>
            <span className={styles.caption}>Strength:</span>
            <span>{hero.strength}</span>

            <span className={styles.caption}>Agility:</span>
            <span>{hero.agility}</span>

            <span className={styles.caption}>Intelligence:</span>
            <span>{hero.intellect}</span>
          </div>
        </div>
      </div>
    </>
  )
}
