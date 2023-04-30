import { useUnitsStore } from '@/store/units/useUnitsStore'
import { useGameStore } from '@/store/game/useGameStore'

import { useMemo } from 'react'

import _ from 'lodash'

import { FindUnit } from '@/store/units/interface'
import { Unit } from '@/interfaces/unit'

import styles from './TargetUI.module.scss'
import Image from 'next/image'
import { Hero } from '@/interfaces/hero'
import { HeroUI } from './HeroUI/HeroUI'

export function TargetUI(): JSX.Element {
  const uiTargetId: Unit['id'] | undefined = useGameStore(
    ({ uiTargetId }) => uiTargetId
  )

  const findUnit: FindUnit = useUnitsStore(({ findUnit }) => findUnit)

  const uiTargetUnit = useMemo((): Unit | Hero | null => {
    if (_.isUndefined(uiTargetId)) {
      return null
    }

    return findUnit(uiTargetId)
  }, [findUnit, uiTargetId])

  const isHero = useMemo((): boolean => {
    //@ts-ignore // ToDo Add unit type to unit interface
    return !_.isUndefined(uiTargetUnit?.level)
  }, [uiTargetUnit])

  if (_.isNull(uiTargetUnit)) {
    return <span />
  }

  return (
    <div className={styles.container}>
      <div className={styles.name}>
        {uiTargetUnit.name}&nbsp;#{uiTargetUnit.id}
      </div>
      {isHero ? <HeroUI hero={uiTargetUnit as Hero} /> : <span />}
    </div>
  )
}
