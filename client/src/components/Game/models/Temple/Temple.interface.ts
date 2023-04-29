import { GroupProps } from '@react-three/fiber'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

export interface TempleProps {
  groupProps?: GroupProps
}

export type GLTFResult = GLTF & {
  nodes: {
    TEMPLE_27f3765_0: THREE.SkinnedMesh
    TEMPLE001_27f3765_0: THREE.SkinnedMesh
    TEMPLE004_water_0: THREE.SkinnedMesh
    TEMPLE005_d605deea_0: THREE.SkinnedMesh
    TEMPLE006_water_0: THREE.SkinnedMesh
    TEMPLE010_5b86a32a_0: THREE.SkinnedMesh
    TEMPLE011_93d99f61_0: THREE.SkinnedMesh
    TEMPLE012_emit_0: THREE.SkinnedMesh
    TEMPLE002_5b86a32a_0: THREE.SkinnedMesh
    TEMPLE003_27f3765_0: THREE.SkinnedMesh
    TEMPLE007_5b86a32a_0: THREE.SkinnedMesh
    TEMPLE008_27f3765_0: THREE.SkinnedMesh
    monk_5b86a32a_0: THREE.SkinnedMesh
    monk_27f3765_0: THREE.SkinnedMesh
    monk_eye_0: THREE.SkinnedMesh
    monk001_5b86a32a_0: THREE.SkinnedMesh
    monk001_27f3765_0: THREE.SkinnedMesh
    monk001_eye_0: THREE.SkinnedMesh
    monk002_5b86a32a_0: THREE.SkinnedMesh
    monk002_27f3765_0: THREE.SkinnedMesh
    monk003_5b86a32a_0: THREE.SkinnedMesh
    monk003_27f3765_0: THREE.SkinnedMesh
    monk002_eye_0: THREE.SkinnedMesh
    monk003_eye_0: THREE.SkinnedMesh
    TEMPLE009_d605deea_0: THREE.SkinnedMesh
  }
  materials: {
    d605deea: THREE.MeshStandardMaterial
    '93d99f61': THREE.MeshStandardMaterial
    '5b86a32a': THREE.MeshStandardMaterial
    emit: THREE.MeshStandardMaterial
  }
}
