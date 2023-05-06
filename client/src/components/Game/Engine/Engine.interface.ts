import { GameCanvas } from '../Game.interface'

export interface EngineProps {
  children: JSX.Element
  getCanvas: () => GameCanvas | undefined
}
