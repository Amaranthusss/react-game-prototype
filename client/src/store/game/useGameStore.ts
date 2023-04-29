import { devtools } from 'zustand/middleware'
import { create } from 'zustand'
import _ from 'lodash'
import * as YUKA from 'yuka'

import { RootState } from '@react-three/fiber'
import { GameStore } from './interface'
import { Unit } from '@/interfaces/unit'

export const useGameStore = create<GameStore>()(
  devtools(
    (set, get): GameStore => {
      const entityManager = new YUKA.EntityManager()

      return {
        fps: 0,
        playerName: 'amaranthus',
        entityManager,
        camera: undefined,
        renderer: undefined,
        scene: undefined,

        getVehicles: (ids?: Unit['id'][] | undefined): YUKA.Vehicle[] => {
          const { entityManager } = get()

          const getVehiclesFromIds = (ids: Unit['id'][]): YUKA.Vehicle[] => {
            const vehicles: YUKA.GameEntity[] = []

            _.forEach(
              entityManager.entities,
              (gameEntity: YUKA.GameEntity): void => {
                if (
                  gameEntity instanceof YUKA.Vehicle &&
                  _.some(ids, (id: Unit['id']): boolean => {
                    return _.isEqual(id, gameEntity.name)
                  })
                ) {
                  vehicles.push(gameEntity)
                }
              }
            )

            // * Vehicle extends GameEntity
            return vehicles as YUKA.Vehicle[]
          }

          return (
            (_.isEmpty(ids) || _.isUndefined(ids)
              ? (entityManager.entities.filter(
                  (entity) => entity instanceof YUKA.Vehicle
                ) as YUKA.Vehicle[])
              : getVehiclesFromIds(ids)) ?? []
          )
        },

        setFps: (fps: number) => set({ fps }),
        setScene: (scene: RootState['scene']) => set({ scene }),
        setCamera: (camera: RootState['camera']) => set({ camera }),
        setRenderer: (renderer: RootState['gl']) => set({ renderer }),
      }
    },
    { name: 'game-storage' }
  )
)
