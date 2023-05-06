import { Specialisation } from './specialisation'
import { Unit } from './unit'

export interface Hero extends Unit {
  level: number
  experience: number
  maxExperience: number
  intellect: number
  strength: number
  agility: number
  specialisation: Specialisation
}
