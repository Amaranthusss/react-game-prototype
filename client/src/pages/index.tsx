import { UserInterface } from '@/components/UserInterface/UserInterface'
import { Game } from '@/components/_Game/Game'
import { useEffect } from 'react'
import { io } from 'socket.io-client'

export default function Application(): JSX.Element {
  useEffect((): void => {
    const URL = 'http://localhost:3001'

    const socket = io(URL)

    socket.emit('findAllMessages', {}, (response: any) => {
      console.log(response)
    })
  }, [])

  return (
    <>
      <Game />
      <UserInterface />
    </>
  )
}
