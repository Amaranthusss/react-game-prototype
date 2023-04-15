import { YukaStore } from './useYukaStore.interface'

export function getActions(state: YukaStore): YukaStore['actions'] {
  return state.actions
}
