import { useQueryClient } from '@tanstack/react-query'
import { ReactElement, useEffect } from 'react'
import { Blog } from '~/apiServices/blogsService'
import queryKeys from '~/config/queryKeys'
import socket from '~/config/socket'
import { useAuth } from '~/hooks'

export default function SocketClient({ children }: { children: ReactElement }) {
	const queryClient = useQueryClient()

	const { auth } = useAuth()
	const user = auth?.data

	useEffect(() => {
		socket.connect()

		return () => {
			socket.disconnect()
		}
	}, [])

	useEffect(() => {
		const onLike = ({ blog, user }: { blog: string; user: string }) => {
			queryClient.setQueryData<Blog>(
				queryKeys.blog(blog),
				oldData =>
					oldData && {
						...oldData,
						likes: [...oldData.likes, user],
					}
			)
		}

		socket.on('blog:like', onLike)

		return () => {
			socket.off('blog:like', onLike)
		}
	}, [queryClient])

	useEffect(() => {
		if (user) {
			socket.emit('join-room', user._id)

			return () => {
				socket.emit('leave-room', user._id)
			}
		}
	}, [user])

	useEffect(() => {
		const onUnlike = ({ blog, user }: { blog: string; user: string }) => {
			queryClient.setQueryData<Blog>(
				queryKeys.blog(blog),
				oldData =>
					oldData && {
						...oldData,
						likes: oldData.likes.filter(id => id !== user),
					}
			)
		}

		socket.on('blog:unlike', onUnlike)

		return () => {
			socket.off('blog:unlike', onUnlike)
		}
	}, [queryClient])

	return children
}
