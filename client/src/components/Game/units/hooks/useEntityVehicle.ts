import { useGameStore } from '@/store/game/useGameStore'
import { useCallback } from 'react'

import * as THREE from 'three'
import * as YUKA from 'yuka'
import _ from 'lodash'

import { MutableRefObject } from 'react'
import { SimplePosition } from '@/interfaces/simplePosition'
import { Unit } from '@/interfaces/unit'

export function useEntityVehicle(
  id: Unit['id'],
  mesh: MutableRefObject<THREE.Mesh | null>,
  initPosition: SimplePosition
) {
  const entityManager: YUKA.EntityManager = useGameStore(
    ({ entityManager }) => entityManager
  )

  const sync = useCallback(
    (
      entity: YUKA.GameEntity,
      renderComponent: THREE.Mesh<
        THREE.BufferGeometry,
        THREE.Material | THREE.Material[]
      >
    ) => {
      //@ts-ignore YUKA.Matrix4 / THREE.Matrix4 differences
      renderComponent.matrix.copy(entity.worldMatrix)
    },
    []
  )

  const initVehicle = useCallback((): void => {
    const isEntityDefinied: boolean = _.isNull(
      entityManager.getEntityByName(id)
    )

    if (!isEntityDefinied || mesh.current == null) {
      console.error(
        `${errorPath} / initVehicle()
				\n Entity manager or model mesh is not definied
				\n Entity manager:`,
        entityManager,
        `\n Mesh:`,
        mesh
      )
      return
    }

    const vehicle: YUKA.Vehicle = new YUKA.Vehicle()

    const followPathBehavior: YUKA.FollowPathBehavior =
      new YUKA.FollowPathBehavior()

    const obstacleAvoidanceBehavior: YUKA.ObstacleAvoidanceBehavior =
      new YUKA.ObstacleAvoidanceBehavior()

    followPathBehavior.active = false
    followPathBehavior.nextWaypointDistance = 0.1 //ToDo Lets test this parameter

    obstacleAvoidanceBehavior.active = true

    mesh.current.matrixAutoUpdate = false
    vehicle.name = id
    vehicle.maxSpeed = 2
    vehicle.maxForce = 200
    vehicle.maxTurnRate = Math.PI
    vehicle.smoother = new YUKA.Smoother(20)
    vehicle.boundingRadius = 20
    vehicle.steering.add(followPathBehavior)
    vehicle.steering.add(obstacleAvoidanceBehavior)
    vehicle.setRenderComponent(mesh.current, sync)
    vehicle.position = new YUKA.Vector3(...initPosition)

    entityManager.add(vehicle)
  }, [entityManager, sync, mesh, id, initPosition])

  return { initVehicle }
}

const errorPath = `components / Game / units / hooks / useEntityVehicle`
