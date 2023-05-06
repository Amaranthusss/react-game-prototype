import { StaticImageData } from 'next/image'
import { SimplePosition } from './simplePosition'
import { AttackType } from './attackType'
import { ArmorType } from './armorType'
import { UnitState } from './unitState'

export interface Unit {
  id: string
  name: string
  mana: number
  health: number
  maxMana: number
  maxHealth: number
  movementSpeed: number
  fieldOfView: number
  position: SimplePosition
  target: Unit['id'] | null
  /** All units' IDs in range */
  targets: Unit['id'][]
  state: UnitState
  lastUpdate: number
  defence: {
    value: number
    type: ArmorType
    dodge: number
  }
  attack: {
    baseDamage: number
    range: number
    /** Delay between attacks, milliseconds*/
    speed: number
    /** Delay to finish attack animation and deal damage, milliseconds*/
    duration: number
    type: AttackType
    model?: JSX.Element
  }
  bonus: { source: string; value: number; stat: BonusStatName }[]
  icon: StaticImageData
}

type BonusStatName =
  | keyof Omit<Unit, 'bonus' | 'name' | 'id'>
  | keyof Unit['attack']
  | keyof Unit['defence']
