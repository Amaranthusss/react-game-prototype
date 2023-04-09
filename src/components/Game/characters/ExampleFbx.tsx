import { useFBX } from '@react-three/drei'

import { Group } from 'three'

const modelFileName: string = 'Vampire A Lusth'

export default function Rouge(): JSX.Element {
  const model: Group = useFBX(
    `http://localhost:3000/models/${modelFileName}.fbx`
  )

  return <primitive object={model} />
}
