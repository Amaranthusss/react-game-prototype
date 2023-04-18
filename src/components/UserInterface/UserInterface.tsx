import { CharacterUI } from './CharacterUI/CharacterUI'
import { ConsoleUI } from './ConsoleUI/ConsoleUI'
import { StatsUI } from './StatsUI/StatsUI'

export function UserInterface(): JSX.Element {
  return (
    <>
      <StatsUI />
      <ConsoleUI />
      <CharacterUI />
    </>
  )
}
