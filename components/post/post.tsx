import { CounterObject, FacebookCounter } from '@charkour/react-reactions'
import {
	InfiniteData,
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useSound from 'use-sound'
import { commentsService, postsService } from '~/apiServices'
import { Post as PostType } from '~/apiServices/postsServices'
import queryKeys from '~/config/queryKeys'
import routes from '~/config/routes'
import socket from '~/config/socket'
import { useAuth, useInView, useRedirectToLogin } from '~/hooks'
import markdownToHTML from '~/utils/markdownToHTML'
import { DataWithPagination } from '~/utils/request'
import timeFromNow from '~/utils/timeFromNow'
import Avatar from '../avatar'
import Comments from '../comments'
import Dropdown from '../dropdown'
import {
	AngryIcon,
	GlobalIcon,
	HeartSolidIcon,
	LikeIcon,
	LikeSolidIcon,
	MoreIcon,
	SadIcon,
	SendIcon,
	SmileIcon,
	SmsOutlineIcon,
	SurpriseIcon,
	TickIcon,
} from '../icons'
import ImagesGrid from '../imagesGrid'
import Loader from '../loader'
import Modal from '../modal'
import Reactions, { emoji } from '../reactions'
import Skeleton from '../skeleton'
import UpdatePostModal from './updatePostModal'
import copyToClipboard from '~/utils/copyToClipboard'
import { useRouter } from 'next/router'
import pattern from '~/config/pattern'

interface Props {
	data: PostType
}

const Post = ({ data }: Props) => {
	const [htmlContent, setHtmlContent] = useState(data.content)

	const [onUpdate, setOnUpdate] = useState(false)
	const [onComment, setOnComment] = useState(false)
	const [viewMore, setViewMore] = useState(false)

	const { inView, ref } = useInView()

	const { auth } = useAuth()
	const user = auth?.data

	const router = useRouter()

	const queryClient = useQueryClient()

	const redirectToLogin = useRedirectToLogin()

	const [playSound] = useSound('/sounds/sound2.mp3')

	useEffect(() => {
		if (inView) socket.emit('join-room', data._id)
		else socket.emit('leave-room', data._id)

		return () => {
			socket.emit('leave-room', data._id)
		}
	}, [data._id, inView])

	useEffect(() => {
		function onAddReaction(post: PostType) {
			queryClient.setQueryData<PostType>(
				queryKeys.postDetail(post._id),
				oldData => oldData && { ...oldData, reactions: post.reactions }
			)

			return [
				queryKeys.posts,
				queryKeys.followingsPosts(user?._id as string),
				queryKeys.userPosts(data.author._id),
			].forEach(key =>
				queryClient.setQueryData<
					InfiniteData<DataWithPagination<{ posts: PostType[] }>>
				>(
					key,
					oldData =>
						oldData && {
							...oldData,
							pages: oldData.pages.map(page => ({
								...page,
								posts: page.posts.map(item =>
									item._id === post._id
										? { ...item, reactions: post.reactions }
										: item
								),
							})),
						}
				)
			)
		}

		socket.on('post:reaction:add/' + data._id, onAddReaction)

		return () => {
			socket.off('post:reaction:add/' + data._id, onAddReaction)
		}
	}, [data._id, data.author._id, queryClient, user?._id])

	useEffect(() => {
		function onRemoveReaction(post: PostType) {
			queryClient.setQueryData<PostType>(
				queryKeys.postDetail(post._id),
				oldData => oldData && { ...oldData, reactions: post.reactions }
			)

			return [
				queryKeys.posts,
				queryKeys.followingsPosts(user?._id as string),
				queryKeys.userPosts(data.author._id),
			].forEach(key =>
				queryClient.setQueryData<
					InfiniteData<DataWithPagination<{ posts: PostType[] }>>
				>(
					key,
					oldData =>
						oldData && {
							...oldData,
							pages: oldData.pages.map(page => ({
								...page,
								posts: page.posts.map(item =>
									item._id === post._id
										? { ...item, reactions: post.reactions }
										: item
								),
							})),
						}
				)
			)
		}

		socket.on('post:reaction:remove/' + data._id, onRemoveReaction)

		return () => {
			socket.off('post:reaction:remove/' + data._id, onRemoveReaction)
		}
	}, [data._id, data.author._id, queryClient, user?._id])

	useEffect(() => {
		async function convert() {
			const content = data.content

			const _html = await markdownToHTML(
				content.length > 255
					? viewMore
						? content
						: content.slice(0, 255) + '...'
					: content
			)
			setHtmlContent(
				_html.replaceAll(
					pattern.hashtag,
					tag =>
						`<a class="!no-underline !font-normal" href="${routes.postsByTag(
							tag.slice(1)
						)}">${tag}</a>`
				)
			)
		}

		convert()
	}, [data.content, viewMore])

	const { isLoading, mutate: deletePost } = useMutation(
		() => postsService.deletePost(data._id, auth?.accessToken as string),
		{
			onSuccess(data) {
				data &&
					[
						queryKeys.posts,
						queryKeys.followingsPosts(user?._id as string),
						queryKeys.userPosts(data.author._id),
					].forEach(key =>
						queryClient.setQueryData<
							InfiniteData<
								DataWithPagination<{ posts: PostType[] }>
							>
						>(
							key,
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
					)
			},
		}
	)

	const { data: commentsQuery } = useInfiniteQuery(
		queryKeys.comments(data._id),
		({ pageParam = { limit: 10 } }) =>
			commentsService.get(data._id, pageParam)
	)

	const { mutate: addReaction } = useMutation(
		(reaction: CounterObject) =>
			postsService.addReaction(
				data._id,
				reaction,
				`${auth?.accessToken}`
			),
		{ onSuccess: playSound }
	)

	const { mutate: removeReaction } = useMutation(
		(reaction: CounterObject) =>
			postsService.removeReaction(
				data._id,
				reaction,
				`${auth?.accessToken}`
			),
		{ onSuccess: playSound }
	)

	return (
		<div
			ref={ref}
			className='bg-white/90 max-w-2xl mx-auto rounded-3xl sm:px-3 px-2 pt-5 sm:pt-6 pb-4 shadow-lg shadow-blue-900/5'
		>
			{isLoading && <Loader />}

			<div className='flex items-start justify-between px-2 sm:px-3'>
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
							<div className='flex items-center'>
								<span className='text-sm'>
									{timeFromNow(data.createdAt, true)}
								</span>

								<div className='h-[0.1875rem] mx-1.5 w-[0.1875rem] rounded-full bg-blue-500' />

								<GlobalIcon className='h-2.5' />
							</div>
						</Link>
					</div>
				</div>

				<Dropdown
					items={[
						{
							label: 'Xem chi tiết',
							onClick: () =>
								router.push(routes.postDetail(data._id)),
							divider: true,
						},
						{
							label: 'Chỉnh sửa',
							show:
								user?._id === data.author._id ||
								user?.role === 'admin',
							onClick: () => setOnUpdate(true),
						},
						{
							label: 'Xóa',
							show:
								user?._id === data.author._id ||
								user?.role === 'admin',
							onClick: () => deletePost(),
							divider: true,
						},

						{
							label: 'Sao chép liên kết',
							onClick: () => {
								copyToClipboard(
									window.location.origin +
										routes.postDetail(data._id)
								)
							},
						},
					]}
				>
					<button>
						<MoreIcon className='w-6' />
					</button>
				</Dropdown>
			</div>

			{onUpdate && user && (
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
				/>
			)}

			<p
				className={`sm:px-2 px-1 !prose !prose-blue prose-img:rounded-2xl prose-video:rounded-2xl prose-img:mx-auto prose-a:underline-offset-2 prose-p:break-words prose-headings:break-words prose-a:break-words prose-pre:!rounded-2xl prose-td:!p-3 even:prose-tr:bg-blue-50 prose-th:!p-3 prose-tr:rounded-xl prose-tr:border-none prose-thead:bg-blue-100/75 prose-thead:rounded-xl prose-thead:border-none prose-table:border-separate first:prose-th:rounded-l-xl last:prose-th:rounded-r-xl first:prose-td:rounded-l-xl last:prose-td:rounded-r-xl prose-table:border-spacing-px prose-figcaption:text-center prose-figcaption:italic prose-figcaption:!mt-3 prose-pre:scroll-sm prose-blockquote:!not-italic prose-blockquote:!font-normal prose-blockquote:bg-blue-50/50 [&>*]:prose-blockquote:before:hidden [&>*]:prose-blockquote:after:hidden prose-blockquote:py-1 first:[&>*]:prose-blockquote:!mt-2 last:[&>*]:prose-blockquote:!mb-2 prose-blockquote:pr-4 prose-blockquote:rounded-r-2xl prose-video:mx-auto prose-th:!align-middle mt-3 mb-4 prose-p:!my-2 ${
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
				onClick={() => {
					setViewMore(true)
				}}
			></p>

			<ImagesGrid images={data.images} />

			<div className='flex pb-2.5 pt-3 items-center justify-between text-sm px-2'>
				<div className='last:[&_div_div]:hidden cursor-pointer group flex items-center relative'>
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
				<button className='flex mx-1 rounded-xl justify-center transition hover:bg-slate-50 py-2 flex-1 font-medium'>
					<Reactions
						onAdd={addReaction}
						onRemove={removeReaction}
						reaction={data.reactions.find(
							reaction => reaction.by === user?._id
						)}
						iconSize={32}
					>
						{reaction => (
							<span
								className={`flex items-center ${
									reaction && emoji[reaction.emoji].color
								}`}
							>
								{(() => {
									const list: {
										[key: string]: Function
									} = {
										like: LikeSolidIcon,
										love: HeartSolidIcon,
										haha: SmileIcon,
										wow: SurpriseIcon,
										sad: SadIcon,
										angry: AngryIcon,
									}

									const Icon = reaction
										? list[reaction?.emoji] || LikeIcon
										: LikeIcon

									return <Icon className='h-6 mr-2.5' />
								})()}

								{reaction
									? emoji[reaction.emoji].text
									: 'Thích'}
							</span>
						)}
					</Reactions>
				</button>

				<button
					onClick={() => {
						if (!user) return redirectToLogin()

						setOnComment(true)
					}}
					className='flex items-center justify-center mx-1 rounded-xl transition hover:bg-slate-50 py-2 flex-1 font-medium'
				>
					<SmsOutlineIcon className='h-6 mr-2.5' />
					Bình luận
				</button>
			</div>

			{user && (
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
								<SendIcon className='h-5' />
							</button>
						</div>
					</div>
				</div>
			)}

			<div className='pt-6'>
				<Comments
					authorId={data.author._id}
					blogId={data._id}
					onComment={onComment}
					setOnComment={setOnComment}
					small
					viewMore
					limit={5}
					showLoading={false}
				/>
			</div>
		</div>
	)
}

Post.Skeleton = function PostSkeleton() {
	return (
		<div className='bg-white/90 max-w-2xl mx-auto rounded-3xl sm:px-3 px-2 pt-5 sm:pt-6 pb-4 shadow-lg shadow-blue-900/5'>
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
