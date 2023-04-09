export interface GameComponent {}

export interface GameProps {
  componentCallback: (component: GameComponent) => void
}
