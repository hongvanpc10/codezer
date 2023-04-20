import { useQueryClient } from '@tanstack/react-query'
import { ReactElement, useEffect } from 'react'
import { Blog } from '~/apiServices/blogsService'
import queryKeys from '~/config/queryKeys'
import socket from '~/config/socket'

export default function SocketClient({ children }: { children: ReactElement }) {
	const queryClient = useQueryClient()

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
