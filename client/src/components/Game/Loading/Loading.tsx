import { Html } from '@react-three/drei'

import { useProgress } from '@react-three/drei'

import _ from 'lodash'

export function Loading(): JSX.Element {
  const { progress } = useProgress()

  return (
    <Html center>
      <span style={{ color: 'white' }}>{_.round(progress, 0)}% loaded</span>
    </Html>
  )
}
