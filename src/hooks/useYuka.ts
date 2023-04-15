import { useContext, useEffect, useRef, useState } from 'react'

import { EntityManager, GameEntity } from 'yuka'

import { yukaContext } from '@/contexts/yukaContext'

export const useYuka = ({
  type = GameEntity,
  position = [0, 0, 0],
  name = 'unnamed',
}: {
  type: typeof GameEntity
  position?: [number, number, number]
  name?: string
}) => {
  const mgr: EntityManager = useContext(yukaContext)
  const [entity] = useState<GameEntity>(() => new type())

  const ref = useRef<THREE.Mesh<
    THREE.BufferGeometry,
    THREE.Material | THREE.Material[]
  > | null>(null)

  useEffect((): (() => void) => {
    entity.position.set(...position)
    entity.name = name
    entity.setRenderComponent(ref, (entity: GameEntity): void => {
      //@ts-ignore
      ref.current?.position.copy(entity.position)
      //@ts-ignore
      ref.current?.quaternion.copy(entity.rotation)
    })

    mgr.add(entity)

    return (() => mgr.remove(entity)) as () => void // * Method returns GameEntity but it's not necessary
  }, [entity, mgr, name, position])

  return { ref, entity }
}
