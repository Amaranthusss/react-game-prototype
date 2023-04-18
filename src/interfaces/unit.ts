import { SimplePosition } from './simplePosition'
import { AttackType } from './attackType'
import { ArmorType } from './armorType'
import { Hero } from './hero'

export interface Unit {
  id: string
  name: string
  mana: number
  health: number
  maxMana: number
  maxHealth: number
  movementSpeed: number
  position: SimplePosition
  target: Unit['id'] | undefined
  targets: Unit['id'][]
  defence: {
    value: number
    type: ArmorType
    dodge: number
  }
  attack: {
    baseDamage: number
    range: number
    speed: number
    type: AttackType
    model?: JSX.Element
  }
  bonus: { source: string; value: number; stat: BonusStatName }[]
}

type BonusStatName =
  | keyof Omit<Unit, 'bonus' | 'name' | 'id'>
  | keyof Unit['attack']
  | keyof Unit['defence']