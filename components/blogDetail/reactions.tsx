import { useAuth } from '~/hooks'
import LikeButton from '../like'
import useSound from 'use-sound'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import queryKeys from '~/config/queryKeys'
import { Blog } from '~/apiServices/blogsService'
import { blogsService, commentsService } from '~/apiServices'
import Link from 'next/link'
import { MessageIcon } from '../icons'

export default function Reactions({ data }: { data: Blog }) {
	const { auth } = useAuth()
	const user = auth?.data

	const [playSound] = useSound('/sounds/sound2.mp3')

	const { data: commentsQuery } = useInfiniteQuery(
		queryKeys.comments(data._id),
		({ pageParam = { limit: 10 } }) =>
			commentsService.get(data._id, pageParam)
	)

	const { mutate: like } = useMutation(
		() => blogsService.like(data._id, `${auth?.accessToken}`),
		{ onSuccess: playSound }
	)

	const { mutate: unlike } = useMutation(
		() => blogsService.unlike(data._id, `${auth?.accessToken}`),
		{ onSuccess: playSound }
	)

	return (
		<div className='flex items-center pr-4 justify-end'>
			<div className='flex items-center mr-12'>
				<LikeButton
					onLike={like}
					onUnlike={unlike}
					isLiked={data.likes.includes(user?._id as string)}
					className='mr-2'
				/>

				{data.likes.length}
			</div>

			<div className='flex items-center'>
				<Link href='#comments' className='mr-2 inline-flex'>
					<MessageIcon className='h-6' />
				</Link>
				{commentsQuery?.pages[0]?.allCount || 0}
			</div>
		</div>
	)
}
