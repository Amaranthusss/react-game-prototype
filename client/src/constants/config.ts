import { SimplePosition } from '@/interfaces/simplePosition'

export const Config: IConfig = {
  defaultPlayerPosition: [0, 0, 0],
}

interface IConfig {
  defaultPlayerPosition: SimplePosition
}
