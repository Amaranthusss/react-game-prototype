import { Temple } from '../../../../models/Temple/Temple'

import { useGLTF } from '@react-three/drei'

import _ from 'lodash'

import { EnvironmentProps } from './Environment.interface'

const url: string = '/models/arena/arena.glb'

export function Environment({ onMoveToPoint }: EnvironmentProps) {
  return <Temple groupProps={{ onContextMenu: onMoveToPoint }} />
}

useGLTF.preload(url)
