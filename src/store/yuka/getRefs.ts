import { YukaStore } from './useYukaStore.interface'

export function getRefs(state: YukaStore): YukaStore['refs'] {
  return state.refs
}
