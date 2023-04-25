import { useCallback, useEffect, useRef } from 'react'
import { useConvexRegionHelper } from './useConvexRegionHelper'
import { usePlayerUnit } from '@/hooks/usePlayerUnit'
import { useRefState } from '../../../hooks/useRefState'

import * as THREE from 'three'
import * as YUKA from 'yuka'
import _ from 'lodash'

import { RootState, ThreeEvent } from '@react-three/fiber'

const navMeshUrl: string = '/models/arena/navmesh.glb'

export function useNavMesh() {
  const { createConvexRegionHelper } = useConvexRegionHelper()

  const { hero } = usePlayerUnit()

  const pathMaterial = useRef<THREE.LineBasicMaterial>(
    new THREE.LineBasicMaterial({ color: 0xff0000 })
  )

  const pathHelper = useRef<THREE.Line>(
    new THREE.Line(new THREE.BufferGeometry(), pathMaterial.current)
  )

  const { get: getRenderer, set: setRenderer } = useRefState<RootState['gl']>()
  const { get: getCamera, set: setCamera } = useRefState<RootState['camera']>()
  const { get: getScene, set: setScene } = useRefState<RootState['scene']>()

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
    (target: YUKA.Vector3): void => {
      if (
        _.isNil(hero) ||
        _.isNil(hero?.vehicle) ||
        _.isNull(navMesh.current)
      ) {
        console.error(`${errorPath} / findPathTo()
				\n Hero vehicle or navMesh is null / undefined
				\n Hero vehicle: ${hero?.vehicle}
				\n NavMesh: ${navMesh.current}`)
        return
      }

      const from: YUKA.Vector3 = hero.vehicle.position
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
        hero.vehicle.steering.behaviors
      ) as FollowPathBehavior

      followPathBehavior.active = true
      followPathBehavior.path.clear()
      console.log(followPathBehavior.path)

      for (const point of path) {
        followPathBehavior.path.add(point)
      }
    },
    [pathHelper, hero]
  )

  const moveToPoint = useCallback(
    (event: ThreeEvent<MouseEvent>): void => {
      mouseCoordinates.current.x =
        (event.clientX / getRenderer().domElement.clientWidth) * 2 - 1
      mouseCoordinates.current.y =
        -(event.clientY / getRenderer().domElement.clientHeight) * 2 + 1

      raycaster.current.setFromCamera(mouseCoordinates.current, getCamera())

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

        findPathTo(new YUKA.Vector3().copy(firstPoint))
      }
    },
    [getCamera, getRenderer, findPathTo]
  )

  const init = useCallback(
    (nextVehicleMesh: THREE.Mesh): void => {
      // Path helper
      pathHelper.current.visible = false
      getScene().add(pathHelper.current)

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
          getScene().add(navMeshGroup.current)

          // Game setup
          followPathBehavior.current = new YUKA.FollowPathBehavior()

          if (_.isNil(hero) || _.isNil(hero?.vehicle)) {
            console.error(`${errorPath} / init()
					\n Hero vehicle is null or undefined`)
            return
          }

          hero.vehicle.maxSpeed = 1.5
          hero.vehicle.maxForce = 100
          hero.vehicle.setRenderComponent(nextVehicleMesh, sync)
          followPathBehavior.current.active = false
          hero.vehicle.steering.add(followPathBehavior.current)
        })
    },
    [sync, getScene, pathHelper, hero, createConvexRegionHelper]
  )

  const navMeshHasBeenInitialized = useRef<boolean>(false)

  useEffect((): void => {
    if (
      _.isNull(hero) ||
      _.isNil(hero?.meshRef.current) ||
      navMeshHasBeenInitialized.current
    ) {
      return
    }

    init(hero.meshRef.current)
    navMeshHasBeenInitialized.current = true
  }, [init, hero])

  return {
    getScene,
    setScene,
    getCamera,
    setCamera,
    getRenderer,
    setRenderer,
    moveToPoint,
  }
}

const errorPath = `hooks / useNavMesh`

export type InitFcn = (vehicleMesh: THREE.Mesh) => void
