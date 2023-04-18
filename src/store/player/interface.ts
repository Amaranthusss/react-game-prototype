import { Hero } from '@/interfaces/hero'
import { Unit } from '@/interfaces/unit'

export interface PlayerStore {
  unitId: Unit['id']
  getHero: () => Hero | undefined
}
