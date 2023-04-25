import { MutableRefObject } from 'react'
import { GroupProps } from '@react-three/fiber'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

export type GLTFResult = GLTF & {
  nodes: {
    Vampire_1: THREE.SkinnedMesh
    Vampire_2: THREE.SkinnedMesh
    mixamorigHips: THREE.Bone
    mixamorigHips_1: THREE.Bone
    mixamorigHips_2: THREE.Bone
    mixamorigHips_3: THREE.Bone
  }
  materials: {
    Vampire_1: THREE.MeshStandardMaterial
    Vampire_2: THREE.MeshStandardMaterial
  }
}

export interface RogueComponent {
  getGroupRef: () => MutableRefObject<THREE.Group | null>
}

export interface RogueProps {
  componentCallback: (component: RogueComponent) => void
  groupProps?: GroupProps
}
