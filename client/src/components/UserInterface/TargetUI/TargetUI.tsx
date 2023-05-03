import { PortraitUI } from './PortraitUI/PortraitUI'
import { HeroUI } from './HeroUI/HeroUI'

import { useUnitsStore } from '@/store/units/useUnitsStore'
import { useGameStore } from '@/store/game/useGameStore'
import { useMemo } from 'react'

import _ from 'lodash'

import { FindUnit } from '@/store/units/interface'
import { UnitUI } from './UnitUI/UnitUI'
import { Hero } from '@/interfaces/hero'
import { Unit } from '@/interfaces/unit'

import styles from './TargetUI.module.scss'

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
      <PortraitUI unit={uiTargetUnit} />

      <div className={styles.info}>
        <div className={styles.name}>
          {uiTargetUnit.name}&nbsp;#{uiTargetUnit.id}
        </div>
        {isHero ? (
          <HeroUI hero={uiTargetUnit as Hero} />
        ) : (
          <UnitUI unit={uiTargetUnit} />
        )}
      </div>
    </div>
  )
}
