import { SimplePosition } from '@/interfaces/simplePosition'

export const engine: Engine = {
  unitsRelationsInterval: 500,
  refreshUnitsPositionsInterval: 50,
  defaultAttackSpeed: 1000,
  defaultAttackDuration: 500,
  defaultPlayerPosition: [0, 0, 0],
  ignoredId: '_empty',
  rangePrecision: 2,
  aiPlayerName: '_AI',
}

interface Engine {
  unitsRelationsInterval: number
  refreshUnitsPositionsInterval: number
  defaultAttackSpeed: number
  defaultAttackDuration: number
  defaultPlayerPosition: SimplePosition
  ignoredId: '_empty'
  rangePrecision: number
  aiPlayerName: '_AI'
}
