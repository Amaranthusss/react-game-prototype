import { YukaStore } from './useYukaStore.interface'

export function getNavMesh(state: YukaStore): YukaStore['navMesh'] {
  return state.navMesh
}
