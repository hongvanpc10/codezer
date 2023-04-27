import { ReactElement, useEffect } from 'react'
import socket from '~/config/socket'
import { useAuth } from '~/hooks'

export default function SocketClient({ children }: { children: ReactElement }) {
	const { auth } = useAuth()
	const user = auth?.data

	useEffect(() => {
		socket.connect()

		return () => {
			socket.disconnect()
		}
	}, [])

	useEffect(() => {
		if (user) {
			socket.emit('join-room', user._id)

			return () => {
				socket.emit('leave-room', user._id)
			}
		}
	}, [user])

	return children
}
