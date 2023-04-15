import Portrait from './Portrait/Portrait'
import Debug from './Debug/Debug'

import styles from './Interface.module.scss'

export default function Interface(): JSX.Element {
  return (
    <>
      <Debug />

      <div className={styles.portrait}>
        <Portrait />
      </div>
    </>
  )
}
