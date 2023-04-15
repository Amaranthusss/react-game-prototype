import { YukaStore } from './useYukaStore.interface'

export function getLevel(state: YukaStore): YukaStore['level'] {
  return state.level
}
