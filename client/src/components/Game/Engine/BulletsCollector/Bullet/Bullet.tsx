import { Sphere } from '@react-three/drei'

import { useEffect, useRef } from 'react'
import { useEntitySync } from '../../../Unit/hooks/useEntitySync'
import { useGameStore } from '@/store/game/useGameStore'

import * as THREE from 'three'
import * as YUKA from 'yuka'
import _ from 'lodash'

import { BulletProps } from './Bullet.interface'

export function Bullet({ index, bullet }: BulletProps): JSX.Element {
  const entityManager: YUKA.EntityManager = useGameStore(
    ({ entityManager }) => entityManager
  )

  const { sync } = useEntitySync()

  const meshRef = useRef<THREE.Mesh | null>(null)

  useEffect((): (() => void) => {
    const attackingGameEntity: YUKA.GameEntity | null =
      entityManager.getEntityByName(bullet.attackingUnitId)

    const targetGameEntity: YUKA.GameEntity | null =
      entityManager.getEntityByName(bullet.targetUnitId)

    if (_.isNull(attackingGameEntity)) {
      console.error(
        `${errorPath} / useEffect()\nAttacking game entity could not be found`
      )

      return (): void => {}
    }

    if (_.isNull(targetGameEntity)) {
      console.error(
        `${errorPath} / useEffect()\nTargeted game entity could not be found`
      )

      return (): void => {}
    }

    if (_.isNull(meshRef.current)) {
      console.error(`${errorPath} / useEffect()\nMesh reference is null`)

      return (): void => {}
    }

    const vehicle: YUKA.Vehicle = new YUKA.Vehicle()

    const behavior: YUKA.SeekBehavior = new YUKA.SeekBehavior(
      targetGameEntity.position
    )

    meshRef.current.matrixAutoUpdate = false
    vehicle.maxTurnRate = 10 * Math.PI
    vehicle.smoother = new YUKA.Smoother(20)
    vehicle.steering.add(behavior)
    vehicle.maxSpeed = 5
    vehicle.name = `${bullet.attackingUnitId}-${
      bullet.targetUnitId
    }-${index}-${_.uniqueId()}`
    vehicle.position = attackingGameEntity.position.clone()
    vehicle.setRenderComponent(meshRef.current, sync)
    entityManager.add(vehicle)

    const clear = (): void => {
      entityManager.remove(vehicle)
    }

    return (): void => {
      clear()
    }
  }, [entityManager, bullet, index, sync])

  return (
    <mesh ref={meshRef}>
      <Sphere scale={0.25}>
        <meshStandardMaterial color={'red'} />
      </Sphere>
    </mesh>
  )
}

const errorPath = `components / Game / vehicles / BulletsCollector / Bullet`
