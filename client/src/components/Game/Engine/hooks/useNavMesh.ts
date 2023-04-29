import { useCallback, useMemo, useRef } from 'react'
import { useConvexRegionHelper } from './useConvexRegionHelper'
import { useUnitsStore } from '@/store/units/useUnitsStore'
import { useGameStore } from '@/store/game/useGameStore'

import * as THREE from 'three'
import * as YUKA from 'yuka'
import _ from 'lodash'

import { RootState, ThreeEvent } from '@react-three/fiber'
import { CreateHero } from '@/store/units/interface'

const navMeshUrl: string = '/models/arena/navmesh.glb'

export function useNavMesh(playerName: string) {
  const entityManager: YUKA.EntityManager = useGameStore(
    ({ entityManager }) => entityManager
  )

  const scene: RootState['scene'] | undefined = useGameStore(
    ({ scene }) => scene
  )

  const camera: RootState['camera'] | undefined = useGameStore(
    ({ camera }) => camera
  )

  const renderer: RootState['gl'] | undefined = useGameStore(
    ({ renderer }) => renderer
  )

  const createHero: CreateHero = useUnitsStore(({ createHero }) => createHero)

  const vehicle = useMemo((): YUKA.Vehicle | null => {
    createHero({
      //ToDo Change after add character selector
      id: playerName,
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

    return entityManager.getEntityByName(playerName) as YUKA.Vehicle | null
  }, [entityManager, playerName, createHero])

  const { createConvexRegionHelper } = useConvexRegionHelper()

  const pathMaterial = useRef<THREE.LineBasicMaterial>(
    new THREE.LineBasicMaterial({ color: 0xff0000 })
  )

  const pathHelper = useRef<THREE.Line>(
    // * Required only at the developer app version
    new THREE.Line(new THREE.BufferGeometry(), pathMaterial.current)
  )

  const navMesh = useRef<YUKA.NavMesh | null>(null)
  const navMeshGroup = useRef<THREE.Object3D<Event> | null>(null)
  const raycaster = useRef<THREE.Raycaster>(new THREE.Raycaster())
  const mouseCoordinates = useRef<THREE.Vector2>(new THREE.Vector2())
  const followPathBehavior = useRef<YUKA.FollowPathBehavior | null>(null)

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

  const findPathTo = useCallback(
    (vehicle: YUKA.Vehicle, target: YUKA.Vector3): void => {
      if (_.isNil(vehicle) || _.isNull(navMesh.current)) {
        console.error(`${errorPath} / findPathTo()
				\n Vehicle or navMesh is null / undefined
				\n Vehicle: ${vehicle}
				\n NavMesh: ${navMesh.current}`)
        return
      }

      const from: YUKA.Vector3 = vehicle.position
      const to: YUKA.Vector3 = target
      const path: YUKA.Vector3[] = navMesh.current.findPath(from, to)

      pathHelper.current.visible = true
      pathHelper.current.geometry.dispose()
      pathHelper.current.geometry = new THREE.BufferGeometry().setFromPoints(
        //@ts-ignore YUKA.Vector3 / THREE.Vector3 differences
        path
      )

      type FollowPathBehavior = YUKA.SteeringBehavior & {
        path: YUKA.Path
      }

      const followPathBehavior: FollowPathBehavior = _.first(
        vehicle.steering.behaviors
      ) as FollowPathBehavior

      followPathBehavior.active = true
      followPathBehavior.path.clear()

      for (const point of path) {
        followPathBehavior.path.add(point)
      }
    },
    [pathHelper]
  )

  const moveToPoint = useCallback(
    (event: ThreeEvent<MouseEvent>): void => {
      if (_.isUndefined(renderer) || _.isUndefined(camera)) {
        console.error(`${errorPath} / moveToPoint()
				\n Renderer or camera is undefined
				\n Camera: ${camera}
				\n Renderer: ${renderer}`)
        return
      }

      mouseCoordinates.current.x =
        (event.clientX / renderer.domElement.clientWidth) * 2 - 1
      mouseCoordinates.current.y =
        -(event.clientY / renderer.domElement.clientHeight) * 2 + 1

      raycaster.current.setFromCamera(mouseCoordinates.current, camera)

      if (_.isNull(navMeshGroup.current)) {
        console.error(`${errorPath} / moveToPoint 
				\n navMeshGroup is null`)
        return
      }

      const intersects: THREE.Intersection<THREE.Object3D<THREE.Event>>[] =
        raycaster.current.intersectObject(navMeshGroup.current, true)

      if (!_.isEmpty(intersects)) {
        const firstPoint: YUKA.Vector3 =
          //@ts-ignore YUKA.Vector3 / THREE.Vector3 differences
          intersects[0].point as YUKA.Vector3

        if (_.isNull(vehicle)) {
          return
        }

        findPathTo(vehicle, new YUKA.Vector3().copy(firstPoint))
      }
    },
    [camera, renderer, findPathTo, vehicle]
  )

  const init = useCallback(
    (nextVehicleMesh: THREE.Mesh): void => {
      if (_.isUndefined(scene)) {
        console.error(`${errorPath} / moveToPoint()
				\n Scene is undefined`)
        return
      }

      // Path helper
      pathHelper.current.visible = false
      scene.add(pathHelper.current)
      console.log('initialized')
      // Vehicle
      nextVehicleMesh.matrixAutoUpdate = false

      // Navigation mesh
      new YUKA.NavMeshLoader()
        .load(navMeshUrl)
        .then((navigationMesh: YUKA.NavMesh): void => {
          // Visualize convex regions
          const nextNavMeshGroup: THREE.Object3D<Event> =
            //@ts-ignore
            createConvexRegionHelper(navigationMesh) as THREE.Object3D<Event>

          navMesh.current = navigationMesh
          navMeshGroup.current = nextNavMeshGroup

          nextNavMeshGroup.visible = false
          scene.add(navMeshGroup.current)

          // Game setup
          followPathBehavior.current = new YUKA.FollowPathBehavior()

          if (_.isNil(vehicle)) {
            console.error(`${errorPath} / init()
					\n Hero vehicle is null or undefined`)
            return
          }

          vehicle.maxSpeed = 1.5
          vehicle.maxForce = 100
          vehicle.setRenderComponent(nextVehicleMesh, sync)
          followPathBehavior.current.active = false
          vehicle.steering.add(followPathBehavior.current)
        })
    },
    [sync, scene, pathHelper, vehicle, createConvexRegionHelper]
  )

  return { init, moveToPoint }
}

const errorPath = `components / Game / Engine / hooks / useNavMesh`

export type InitFcn = (vehicleMesh: THREE.Mesh) => void
