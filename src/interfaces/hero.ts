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

type Specialisation = keyof Pick<Hero, 'intellect' | 'agility' | 'strength'>
