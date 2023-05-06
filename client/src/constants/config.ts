import { SimplePosition } from '@/interfaces/simplePosition'

export const Config: IConfig = {
  defaultPlayerPosition: [0, 0, 0],
  ignoredId: '_empty',
}

interface IConfig {
  defaultPlayerPosition: SimplePosition
  ignoredId: string
}
