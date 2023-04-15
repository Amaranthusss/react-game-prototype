import { NavMesh, Vector3 } from 'yuka'
import { Camera } from '@react-three/fiber'
import * as THREE from 'three'

export type Clock = any

export interface YukaStore {
  raycaster: THREE.Raycaster
  camera: Camera | null
  viewport: THREE.Vector2
  clock: Clock | null
  navMesh: NavMesh | null
  intersects: Vector3
  mutation: { mouse: { x: number; y: number } }
  refs: {
    level: THREE.Mesh<
      THREE.BufferGeometry,
      THREE.Material | THREE.Material[]
    > | null
    pathHelper: null | {
      visible: boolean
      geometry: THREE.BufferGeometry
    }
  }
  level: {
    geometry: THREE.BufferGeometry
    material: THREE.MeshBasicMaterial
  }
  actions: {
    init: (camera: Camera) => void
    loadNavMesh: (url: string) => void
    updateMouse: ({
      clientX,
      clientY,
    }: {
      clientX: number
      clientY: number
    }) => void
    handleMouseDown: () => void | null
    updateRefsLevel: (level: YukaStore['refs']['level']) => void
  }
}
