import { useEffect, useRef, useState } from 'react'
import { useUnitsStore } from '@/store/units/useUnitsStore'
import { useRefState } from '@/hooks/useRefState'
import { useFrame } from '@react-three/fiber'

import { shallow } from 'zustand/shallow'
import * as THREE from 'three'
import _ from 'lodash'

import { CreateHero, FindUnit } from '@/store/units/interface'
import { UpdateUnitParameter } from '@/store/units/interface'
import { SimplePosition } from '@/interfaces/simplePosition'
import { RogueComponent } from '../../models/Rogue/Rogue.interface'
import { HeroProps } from './Hero.interface'
import { Rogue } from '../../models/Rogue/Rogue'
import { Unit } from '@/interfaces/unit'

import { Config } from '@/constants/config'

export default function Hero({ groupProps, id, init }: HeroProps) {
  console.log('%cHero rendered', 'color: green')

  const [unitId] = useState<Unit['id']>(id ?? _.uniqueId())

  const meshRef = useRef<THREE.Mesh | null>(null)

  const { get: getRogueComponent, set: setRogueComponent } =
    useRefState<RogueComponent>()

  const createHero: CreateHero = useUnitsStore(
    ({ createHero }) => createHero,
    shallow
  )

  const updateUnitParameter: UpdateUnitParameter = useUnitsStore(
    ({ updateUnitParameter }) => updateUnitParameter,
    shallow
  )

  const findUnit: FindUnit = useUnitsStore(({ findUnit }) => findUnit, shallow)

  const hasBeenInitialized = useRef<boolean>(false)

  useEffect((): void => {
    useUnitsStore.setState({
      playerHeroId: createHero({
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
      }),
    })
  }, [unitId, getRogueComponent, createHero])

  useEffect((): void => {
    if (
      _.isFunction(init) &&
      !_.isNull(meshRef.current) &&
      !hasBeenInitialized.current
    ) {
      init(meshRef.current)
      hasBeenInitialized.current = true
    }
  }, [init])

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
