import { useEffect, useMemo, useRef, useState } from 'react'
import { usePlayerStore } from '@/store/player/usePlayerStore'
import { useUnitsStore } from '@/store/units/useUnitsStore'
import { useRefState } from '@/hooks/useRefState'
import { useFrame } from '@react-three/fiber'

import * as THREE from 'three'
import _ from 'lodash'

import { CreateHero, FindUnit } from '@/store/units/interface'
import { UpdateUnitParameter } from '@/store/units/interface'
import { SimplePosition } from '@/interfaces/simplePosition'
import { RogueComponent } from '../../Rogue/Rogue.interface'
import { HeroProps } from './Hero.interface'
import { Rogue } from '../../Rogue/Rogue'
import { Unit } from '@/interfaces/unit'

import { Config } from '@/constants/config'

export default function Hero({ groupProps, onInitialized }: HeroProps) {
  const [unitId] = useState<Unit['id']>(_.uniqueId())

  const meshRef = useRef<THREE.Mesh | null>(null)

  const { get: getRogueComponent, set: setRogueComponent } =
    useRefState<RogueComponent>()

  const createHero = useMemo(
    (): CreateHero => useUnitsStore.getState().createHero,
    []
  )

  const updateUnitParameter = useMemo(
    (): UpdateUnitParameter => useUnitsStore.getState().updateUnitParameter,
    []
  )

  const findUnit = useMemo(
    (): FindUnit => useUnitsStore.getState().findUnit,
    []
  )

  useEffect((): void => {
    onInitialized({
      getGroup: getRogueComponent()?.getGroupRef,
      getMesh: () => meshRef.current,
    })
  }, [onInitialized, getRogueComponent])

  useEffect((): void => {
    createHero({
      id: unitId,
      name: 'Rogue',
      position: [0, 0, 0],
      specialisation: 'agility',
      agility: 5,
      intellect: 5,
      strength: 5,
      attack: { baseDamage: 20, range: 4, speed: 2, type: 'normal' },
      defence: { dodge: 0, type: 'medium', value: 2 },
      health: 420,
      mana: 100,
      movementSpeed: 2.5,
      fieldOfView: 60,
    })

    usePlayerStore.setState({ unitId })
  }, [unitId, createHero])

  useFrame((): void => {
    const prevPosition: SimplePosition =
      findUnit(unitId)?.position ?? Config.defaultPlayerPosition

    const worldPosition: THREE.Vector3 | undefined =
      meshRef.current?.getWorldPosition?.(new THREE.Vector3(0, 0, 0))

    if (worldPosition == null) {
      return
    }

    const nextPosition = _.map(
      [worldPosition.x, worldPosition.y, worldPosition.z],
      (point: number): number => _.round(point, 2)
    ) as SimplePosition

    if (_.isEqual(prevPosition, nextPosition)) {
      return
    }

    updateUnitParameter<'position'>(unitId, 'position', nextPosition)
  })

  return (
    <mesh ref={meshRef}>
      <Rogue groupProps={groupProps} componentCallback={setRogueComponent} />
    </mesh>
  )
}
