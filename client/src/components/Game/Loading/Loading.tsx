import { Html } from '@react-three/drei'

import { useProgress } from '@react-three/drei'

export function Loading(): JSX.Element {
  const { progress } = useProgress()

  return (
    <Html center>
      <span style={{ color: 'white' }}>{progress}% loaded</span>
    </Html>
  )
}
