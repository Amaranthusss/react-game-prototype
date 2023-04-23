import { useEffect } from 'react'

import { io } from 'socket.io-client'

/**
 * ToDo Use SocketIO client to connect NestJS + SocketIO server
 */

export const useServer = (): void => {
  useEffect((): void => {
    const URL = 'http://localhost:3001'

    const socket = io(URL)

    socket.emit('findAllMessages', {}, (response: any) => {
      console.log(response)
    })
  }, [])
}
