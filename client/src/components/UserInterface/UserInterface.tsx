import { CharacterUI } from './CharacterUI/CharacterUI'
import { ConsoleUI } from './ConsoleUI/ConsoleUI'
import { TargetUI } from './TargetUI/TargetUI'
import { StatsUI } from './StatsUI/StatsUI'

export function UserInterface(): JSX.Element {
  return (
    <>
      <StatsUI />
      <TargetUI />
      <ConsoleUI />
      <CharacterUI />
    </>
  )
}
