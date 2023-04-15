import { createConvexRegionHelper } from '@/utils/createConvexRegionHelper'
import { NavMesh, NavMeshLoader, Vector3 } from 'yuka'
import { devtools, persist } from 'zustand/middleware'
import { create } from 'zustand'
import * as THREE from 'three'
import _ from 'lodash'

import { Camera } from '@react-three/fiber'

import { YukaStore } from './useYukaStore.interface'

export const useYukaStore = create<YukaStore>()(
  devtools(
    persist(
      (set, get) => ({
        raycaster: new THREE.Raycaster(),
        camera: null,
        viewport: new THREE.Vector2(1280, 720), //window.innerWidth, window.innerHeight),
        clock: null,
        navMesh: null,
        intersects: new Vector3(),
        mutation: { mouse: { x: 0, y: 0 } },
        refs: { level: null, pathHelper: null },
        level: {
          geometry: new THREE.BufferGeometry(),
          material: new THREE.MeshBasicMaterial(),
        },
        actions: {
          init(camera: Camera): void {
            set({ camera })
          },
          loadNavMesh(url: string): void {
            const loader: NavMeshLoader = new NavMeshLoader()

            loader.load(url).then((navMesh: NavMesh): void => {
              const { geometry, material } = createConvexRegionHelper(navMesh)

              set({ navMesh })
              set({ level: { geometry, material } })
            })
          },
          updateMouse({ clientX, clientY }): void {
            const { viewport, mutation } = get()

            mutation.mouse.x = (clientX / viewport.x) * 2 - 1
            mutation.mouse.y = -(clientY / viewport.y) * 2 + 1
          },
          handleMouseDown(): void | null {
            const { mutation, raycaster, camera, refs } = get()

            if (!refs.level || _.isNull(camera)) {
              return null
            }

            raycaster.setFromCamera(mutation.mouse as THREE.Vector2, camera)

            const intersects: THREE.Intersection<
              THREE.Object3D<THREE.Event>
            >[] = raycaster.intersectObject(refs.level)

            if (intersects.length > 0) {
              //@ts-ignore ToDo Verify vector types: Yuka vs Three
              const point: Vector3 = new Vector3().copy(intersects[0].point)

              set({ intersects: point })
            }
          },
          updateRefsLevel(level: YukaStore['refs']['level']): void {
            const { refs } = get()

            set({ refs: { ...refs, level } })
          },
        },
      }),
      { name: 'controller-storage' }
    )
  )
)
