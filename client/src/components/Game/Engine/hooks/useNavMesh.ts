import { useCallback, useRef } from 'react'
import { useConvexRegionHelper } from './useConvexRegionHelper'
import { useGameStore } from '@/store/game/useGameStore'

import { transformBehaviors } from '@/utils/transformBehaviors'
import * as THREE from 'three'
import * as YUKA from 'yuka'
import _ from 'lodash'

import { RootState, ThreeEvent } from '@react-three/fiber'
import { GameCanvas } from '../../Game.interface'
import { SetNavMesh } from '@/store/game/interface'

const navMeshUrl: string = '/models/arena/navmesh.glb'

export function useNavMesh(
  playerName: string,
  getCanvas: () => GameCanvas | undefined
) {
  const entityManager: YUKA.EntityManager = useGameStore(
    ({ entityManager }) => entityManager
  )

  const navMesh: YUKA.NavMesh | undefined = useGameStore(
    ({ navMesh }) => navMesh
  )

  const setNavMesh: SetNavMesh = useGameStore(({ setNavMesh }) => setNavMesh)

  const { createConvexRegionHelper } = useConvexRegionHelper()

  const pathHelper = useRef<THREE.Line>(
    // * Required only at the developer app version
    new THREE.Line(
      new THREE.BufferGeometry(),
      new THREE.LineBasicMaterial({ color: 0xff0000 })
    )
  )

  const navMeshGroup = useRef<THREE.Object3D<Event> | null>(null)
  const raycaster = useRef<THREE.Raycaster>(new THREE.Raycaster())
  const mouseCoordinates = useRef<THREE.Vector2>(new THREE.Vector2())

  const findPathTo = useCallback(
    (vehicle: YUKA.Vehicle, target: YUKA.Vector3): void => {
      if (_.isNil(vehicle) || _.isUndefined(navMesh)) {
        console.error(`${errorPath} / findPathTo()
				\n Vehicle or navMesh is null / undefined
				\n Vehicle: ${vehicle}
				\n NavMesh: ${navMesh}`)
        return
      }

      const from: YUKA.Vector3 = vehicle.position
      const to: YUKA.Vector3 = target
      const path: YUKA.Vector3[] = navMesh.findPath(from, to)

      pathHelper.current.visible = true
      pathHelper.current.geometry.dispose()
      pathHelper.current.geometry = new THREE.BufferGeometry().setFromPoints(
        //@ts-ignore YUKA.Vector3 / THREE.Vector3 differences
        path
      )

      const followPathBehavior: YUKA.FollowPathBehavior | null =
        transformBehaviors(vehicle.steering).followPath

      if (_.isNil(followPathBehavior)) {
        console.error(`${errorPath} / findPathTo()
				\n Vehicle follow path behavior is null`)
        return
      }

      followPathBehavior.active = true
      followPathBehavior.path.clear()

      for (const point of path) {
        followPathBehavior.path.add(point)
      }
    },
    [pathHelper, navMesh]
  )

  const moveToPoint = useCallback(
    (event: ThreeEvent<MouseEvent>): void => {
      const camera: RootState['camera'] | undefined = getCanvas()?.camera
      const renderer: RootState['gl'] | undefined = getCanvas()?.renderer

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

        const vehicle = entityManager.getEntityByName(
          playerName
        ) as YUKA.Vehicle | null

        if (_.isNull(vehicle)) {
          console.error(`${errorPath} / moveToPoint 
					\n Vehicle is null`)
          return
        }

        findPathTo(vehicle, new YUKA.Vector3().copy(firstPoint))
      }
    },
    [getCanvas, findPathTo, entityManager, playerName]
  )

  const initNavMesh = useCallback((): void => {
    const scene: RootState['scene'] | undefined = getCanvas()?.scene

    if (_.isUndefined(scene)) {
      console.error(`${errorPath} / init()
				\n Scene is undefined`)
      return
    }

    // Path helper
    pathHelper.current.visible = false
    scene.add(pathHelper.current)

    // Navigation mesh
    new YUKA.NavMeshLoader()
      .load(navMeshUrl)
      .then((navigationMesh: YUKA.NavMesh): void => {
        // Visualize convex regions
        const nextNavMeshGroup: THREE.Object3D<Event> =
          //@ts-ignore
          createConvexRegionHelper(navigationMesh) as THREE.Object3D<Event>

        setNavMesh(navigationMesh)
        navMeshGroup.current = nextNavMeshGroup

        nextNavMeshGroup.visible = false
        scene.add(navMeshGroup.current)

        console.log('%c[NavMesh] Initialized', 'color: gray')
      })
  }, [getCanvas, pathHelper, createConvexRegionHelper, setNavMesh])

  const previousMoveToPoint = useRef<number>(new Date().valueOf())

  const onMoveToPoint = useCallback(
    (event: ThreeEvent<MouseEvent>): void => {
      const currentTime: number = new Date().valueOf()
      const timeDifference: number = currentTime - previousMoveToPoint.current

      if (timeDifference < 100) return

      moveToPoint(event)
      previousMoveToPoint.current = currentTime
    },
    [moveToPoint]
  )

  return { initNavMesh, onMoveToPoint, navMesh }
}

const errorPath = `components / Game / Engine / hooks / useNavMesh`

export type InitFcn = (vehicleMesh: THREE.Mesh) => void
