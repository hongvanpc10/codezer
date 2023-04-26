import { FacebookCounter } from '@charkour/react-reactions'
import {
	InfiniteData,
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { commentsService, postsService } from '~/apiServices'
import { Post as PostType } from '~/apiServices/postsServices'
import queryKeys from '~/config/queryKeys'
import routes from '~/config/routes'
import socket from '~/config/socket'
import { useAuth } from '~/hooks'
import markdownToHTML from '~/utils/markdownToHTML'
import { DataWithPagination } from '~/utils/request'
import timeFromNow from '~/utils/timeFromNow'
import Avatar from '../avatar'
import Comments from '../comments'
import Dropdown from '../dropdown'
import {
	CameraOutlineIcon,
	LikeIcon,
	MoreIcon,
	SendIcon,
	SmsOutlineIcon,
	TickIcon,
} from '../icons'
import ImagesGrid from '../imagesGrid'
import Loader from '../loader'
import Modal from '../modal'
import Skeleton from '../skeleton'
import UpdatePostModal from './updatePostModal'

interface Props {
	data: PostType
}

const Post = ({ data }: Props) => {
	const [htmlContent, setHtmlContent] = useState(data.content)

	const [onUpdate, setOnUpdate] = useState(false)
	const [onComment, setOnComment] = useState(false)
	const [viewMore, setViewMore] = useState(false)

	const { auth } = useAuth()
	const user = auth?.data

	useEffect(() => {
		async function convert() {
			const _html = await markdownToHTML(
				data.content.length > 255
					? viewMore
						? data.content
						: data.content.slice(0, 255) + '...'
					: data.content
			)
			setHtmlContent(_html)
		}

		convert()
	}, [data.content, viewMore])

	const queryClient = useQueryClient()

	const { isLoading, mutate: deletePost } = useMutation(
		() => postsService.deletePost(data._id, auth?.accessToken as string),
		{
			onSuccess(data) {
				if (data) {
					queryClient.setQueryData<
						InfiniteData<DataWithPagination<{ posts: PostType[] }>>
					>(
						queryKeys.posts,
						oldData =>
							oldData && {
								...oldData,
								pages: oldData.pages.map(page => ({
									...page,
									posts: page.posts.filter(
										post => post._id !== data._id
									),
								})),
							}
					)
				}
			},
		}
	)

	useEffect(() => {
		socket.emit('join-room', data._id)

		return () => {
			socket.emit('leave-room', data._id)
		}
	}, [data._id])

	const { data: commentsQuery } = useInfiniteQuery(
		queryKeys.comments(data._id),
		({ pageParam = { limit: 10 } }) =>
			commentsService.get(data._id, pageParam)
	)

	return user ? (
		<div className='bg-white/90 rounded-3xl px-3 pt-6 pb-4 shadow-lg shadow-blue-900/5'>
			{isLoading && <Loader />}

			<div className='flex items-start justify-between px-3'>
				<div className='flex items-center'>
					<Link href={routes.profile(data.author.slug)}>
						<Avatar
							src={data.author.avatar}
							alt=''
							noRing
							size={9}
						/>
					</Link>

					<div className='ml-3'>
						<Link href={routes.profile(data.author.slug)}>
							<h3 className='font-semibold leading-5 flex items-center'>
								{data.author.fullName}
								{(data.author.isVerified ||
									data.author.role === 'admin') && (
									<TickIcon className='h-[1.125rem] text-sky-500 ml-1' />
								)}
							</h3>
							<span className='text-sm'>
								{timeFromNow(data.createdAt, true)}
							</span>
						</Link>
					</div>
				</div>

				<Dropdown
					items={[
						{
							label: 'Chỉnh sửa',
							show:
								user._id === data.author._id ||
								user.role === 'admin',
							onClick: () => setOnUpdate(true),
						},
						{
							label: 'Xóa',
							show:
								user._id === data.author._id ||
								user.role === 'admin',
							onClick: () => deletePost(),
						},
						{
							label: 'Lưu',
						},
					]}
				>
					<button>
						<MoreIcon className='w-6' />
					</button>
				</Dropdown>
			</div>

			{onUpdate && (
				<Modal
					render={() => (
						<UpdatePostModal
							data={data}
							accessToken={auth.accessToken}
							setIsOpen={setOnUpdate}
							user={user}
						/>
					)}
					maxWidth='xl'
					scale={false}
					closeable={false}
				/>
			)}

			<p
				className={`px-2 !prose !prose-blue prose-img:rounded-2xl prose-video:rounded-2xl prose-img:mx-auto prose-a:underline-offset-2 prose-p:break-words prose-headings:break-words prose-a:break-words prose-pre:!rounded-2xl prose-td:!p-3 even:prose-tr:bg-blue-50 prose-th:!p-3 prose-tr:rounded-xl prose-tr:border-none prose-thead:bg-blue-100/75 prose-thead:rounded-xl prose-thead:border-none prose-table:border-separate first:prose-th:rounded-l-xl last:prose-th:rounded-r-xl first:prose-td:rounded-l-xl last:prose-td:rounded-r-xl prose-table:border-spacing-px prose-figcaption:text-center prose-figcaption:italic prose-figcaption:!mt-3 prose-pre:scroll-sm prose-blockquote:!not-italic prose-blockquote:!font-normal prose-blockquote:bg-blue-50/50 [&>*]:prose-blockquote:before:hidden [&>*]:prose-blockquote:after:hidden prose-blockquote:py-1 first:[&>*]:prose-blockquote:!mt-2 last:[&>*]:prose-blockquote:!mb-2 prose-blockquote:pr-4 prose-blockquote:rounded-r-2xl prose-th:!align-middle mt-3 mb-4 prose-p:!my-2 ${
					data.images.length === 0 &&
					(data.content.trim().length < 50
						? '!prose-2xl'
						: '!prose-lg')
				}`}
				dangerouslySetInnerHTML={{
					__html:
						data.content.length > 255 && !viewMore
							? htmlContent.slice(0, -4) +
							  '<button class="font-medium ml-1" >Xem thêm</button>'
							: htmlContent,
				}}
				onClick={() => setViewMore(true)}
			></p>

			<ImagesGrid images={data.images} />

			<div className='flex pb-2.5 pt-3 items-center justify-between text-sm px-2'>
				<div className='last:[&_div_div]:hidden flex items-center'>
					{data.reactions.length > 0 && (
						<FacebookCounter counters={data.reactions} />
					)}

					<span className='ml-2'>
						{data.reactions.length +
							(data.reactions.length === 0 ? ' lượt thích' : '')}
					</span>
				</div>

				<div>{commentsQuery?.pages[0]?.allCount || 0} bình luận</div>
			</div>

			<div className='flex items-center border-y py-1.5 border-blue-900/5'>
				<button className='flex items-center justify-center mx-1 rounded-xl transition hover:bg-slate-50 py-2 flex-1 font-medium'>
					<LikeIcon className='h-6 mr-3' />
					Thích
				</button>
				<button
					onClick={() => setOnComment(true)}
					className='flex items-center justify-center mx-1 rounded-xl transition hover:bg-slate-50 py-2 flex-1 font-medium'
				>
					<SmsOutlineIcon className='h-6 mr-3' />
					Bình luận
				</button>
			</div>

			<div className='flex items-center pt-3'>
				<Avatar alt='' src={user.avatar} noRing />
				<div className='flex relative flex-1 items-center'>
					<input
						placeholder='Viết bình luận của bạn...'
						className='w-full py-2 px-6 bg-blue-50/50 rounded-full ml-2 placeholder:text-blue-900/50'
						onClick={() => setOnComment(true)}
					/>

					<div className='absolute flex items-center right-3 space-x-2 text-blue-900/60'>
						<button>
							<CameraOutlineIcon className='h-5' />
						</button>
						<button>
							<SendIcon className='h-5' />
						</button>
					</div>
				</div>
			</div>

			<div className='pt-6'>
				<Comments
					authorId={data.author._id}
					blogId={data._id}
					onComment={onComment}
					setOnComment={setOnComment}
					small
					viewMore
					limit={5}
				/>
			</div>
		</div>
	) : null
}

Post.Skeleton = function PostSkeleton() {
	return (
		<div className='bg-white/90 rounded-3xl px-3 pt-6 pb-4 shadow-lg shadow-blue-900/5'>
			<div className='flex items-center px-2'>
				<Skeleton size={9} rounded='full' />

				<div className='ml-3'>
					<Skeleton.Text width={32} />
					<Skeleton.Text size='sm' width={24} />
				</div>
			</div>

			<div className='mt-3 mb-4'>
				<Skeleton.Text lines={2} lastLineWidth='60%' />
			</div>

			<Skeleton ratio={[16, 9]} rounded='md' />

			<div className='flex pb-2.5 pt-3 items-center justify-between text-sm px-2'>
				<Skeleton.Text width={20} size='sm' />
				<Skeleton.Text width={28} size='sm' />
			</div>

			<div className='flex items-center border-y py-1.5 border-blue-900/5'>
				<button className='flex items-center justify-center mx-1 rounded-xl transition hover:bg-slate-50 py-2 flex-1 font-medium'>
					<Skeleton.Text width={28} size='lg' />
				</button>
				<button className='flex items-center justify-center mx-1 rounded-xl transition hover:bg-slate-50 py-2 flex-1 font-medium'>
					<Skeleton.Text width={28} size='lg' />
				</button>
			</div>

			<div className='flex items-center pt-3'>
				<Skeleton size={8} rounded='full' />

				<div className='ml-2 flex-1'>
					<Skeleton height={10} rounded='full' />
				</div>
			</div>
		</div>
	)
}

export default Post
