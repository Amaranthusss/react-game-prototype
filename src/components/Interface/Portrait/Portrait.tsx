import Image from 'next/image'

import avatar from '@/assets/images/avatar.png'

import styles from './Portrait.module.scss'

export default function Portrait(): JSX.Element {
  return (
    <Image
      className={styles.image}
      src={avatar}
      alt={'portrait'}
      priority
    />
  )
}
