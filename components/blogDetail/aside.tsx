import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import useSound from 'use-sound'
import { blogsService, commentsService } from '~/apiServices'
import { Blog } from '~/apiServices/blogsService'
import queryKeys from '~/config/queryKeys'
import routes from '~/config/routes'
import { useAuth } from '~/hooks'
import { MessageIcon } from '../icons'
import LikeButton from '../like'

export default function Aside({ data }: { data: Blog }) {
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
		<div className='xl:w-8/12 mx-auto'>
			<Link href={routes.profile(data.author.slug)}>
				<h2 className='font-semibold text-lg'>
					{data.author.fullName}
				</h2>
			</Link>

			{data.author.bio && <p className='pt-4'>{data.author.bio}</p>}

			<hr className='border-blue-900/5 my-4' />

			<div className='flex items-center justify-around'>
				<div className='flex items-center flex-col text-lg'>
					<LikeButton
						onLike={like}
						onUnlike={unlike}
						isLiked={data.likes.includes(user?._id as string)}
						className='mb-1'
					/>

					{data.likes.length}
				</div>

				<div className='flex items-center flex-col text-lg'>
					<Link href='#comments' className='mb-1 inline-flex'>
						<MessageIcon className='h-6' />
					</Link>
					{commentsQuery?.pages[0]?.allCount || 0}
				</div>
			</div>
		</div>
	)
}
