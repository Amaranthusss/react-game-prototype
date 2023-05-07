import { Bullet as BulletJSX } from './Bullet/Bullet'

import { useCallback, useEffect, useState } from 'react'

import _ from 'lodash'

import { AddBullet, RemoveBullet } from './BulletsCollector.interface'
import { BulletsCollectorProps } from './BulletsCollector.interface'
import { Bullet } from '@/interfaces/bullet'
import { Unit } from '@/interfaces/unit'

export function BulletsCollector({
  componentCallback,
}: BulletsCollectorProps): JSX.Element {
  const [bullets, setBullets] = useState<Set<Bullet>>(new Set())

  const addBullet: AddBullet = useCallback(
    (attackingUnitId: Unit['id'], targetUnitId: Unit['id']): void => {
      const nextBullets: Set<Bullet> = new Set(bullets)

      nextBullets.add({
        targetUnitId,
        attackingUnitId,
      })

      setBullets(nextBullets)
    },
    [bullets, setBullets]
  )

  const removeBullet: RemoveBullet = useCallback((): void => {
    // bullets.delete({ id })
  }, [])

  useEffect((): void => {
    componentCallback({ addBullet, removeBullet })
  }, [componentCallback, addBullet, removeBullet])

  return (
    <>
      {_.map(
        Array.from(bullets),
        (bullet: Bullet, index: number): JSX.Element => (
          <BulletJSX key={index} index={index} bullet={bullet} />
        )
      )}
    </>
  )
}
