import { UserInterface } from '@/components/UserInterface/UserInterface'
import { Game } from '@/components/Game/Game'

export default function Application(): JSX.Element {
  return (
    <>
      <Game />
      <UserInterface />
    </>
  )
}
