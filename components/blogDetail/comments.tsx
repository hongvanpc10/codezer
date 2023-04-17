import {
	InfiniteData,
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { commentsService } from '~/apiServices'
import {
	CommentData,
	Comment as CommentType,
} from '~/apiServices/commentsService'
import Comment from '~/components/comment'
import queryKeys from '~/config/queryKeys'
import socket from '~/config/socket'
import { useAuth, useInView } from '~/hooks'
import { DataWithPagination } from '~/utils/request'
import Avatar from '../avatar'
import Button from '../button'
import { FormGroupTextarea } from '../form'
import Loader from '../loader'
import Modal from '../modal'

interface Props {
	blogId: string
}

export default function Comments({ blogId }: Props) {
	const { auth } = useAuth()
	const user = auth?.data

	const [onComment, setOnComment] = useState(false)

	const queryClient = useQueryClient()

	useEffect(() => {
		socket.emit('join-room', blogId)

		return () => {
			socket.emit('leave-room', blogId)
		}
	}, [blogId])

	useEffect(() => {
		function onCreateComment(data: CommentType) {
			queryClient.setQueryData<
				InfiniteData<
					DataWithPagination<{
						comments: CommentType[]
						allCount: number
					}>
				>
			>(
				queryKeys.comments(blogId),
				oldData =>
					oldData && {
						...oldData,
						pages: [
							{
								...oldData.pages[0],
								comments: [data, ...oldData.pages[0].comments],
								allCount: oldData.pages[0].allCount + 1,
							},
							...oldData.pages.slice(1),
						],
					}
			)
		}

		socket.on('create-comment', onCreateComment)

		return () => {
			socket.off('create-comment', onCreateComment)
		}
	}, [blogId, queryClient])

	const { data, isFetchingNextPage, fetchNextPage, isLoading } =
		useInfiniteQuery(
			queryKeys.comments(blogId),
			({ pageParam = { limit: 10 } }) =>
				commentsService.get(blogId, pageParam),
			{
				getNextPageParam(lastPage) {
					if (
						(lastPage?.pagination.currentPage as number) <
						(lastPage?.pagination.totalPages as number)
					)
						return {
							limit: 10,
							page:
								(lastPage?.pagination.currentPage as number) +
								1,
						}
				},
			}
		)

	const { inView, ref } = useInView()

	useEffect(() => {
		if (inView && !isFetchingNextPage) {
			fetchNextPage()
		}
	}, [fetchNextPage, inView, isFetchingNextPage])

	return (
		<section className=''>
			<h2 id='comments' className='font-bold text-2xl'>
				Bình luận
			</h2>

			<div className='mt-10'>
				{user && (
					<div className='flex items-center'>
						<Avatar alt='' size={9} src={user.avatar} />
						<div className='flex-1 ml-3'>
							<input
								onClick={() => setOnComment(true)}
								placeholder='Viết bình luận của bạn'
								className='bg-blue-50/25 py-2.5 px-4 border-b border-blue-900/5 w-full'
							/>
						</div>
					</div>
				)}

				{onComment && (
					<Modal
						render={() => (
							<CreateComment
								blogId={blogId}
								setOnComment={setOnComment}
							/>
						)}
						onClose={() => setOnComment(false)}
						maxWidth='3xl'
					/>
				)}

				<div className='mt-16 space-y-6'>
					{data?.pages[0] && data.pages[0].comments.length > 0 ? (
						data.pages
							.map(page => page?.comments as CommentType[])
							.flat()
							.map((comment, index) => (
								<Comment key={index} data={comment} />
							))
					) : (
						<h3></h3>
					)}

					{(isFetchingNextPage || isLoading) && <Loader.Inline />}

					<div ref={ref}></div>
				</div>
			</div>
		</section>
	)
}

interface CreateCommentProps {
	setOnComment: Function
	blogId: string
}

function CreateComment({ setOnComment, blogId }: CreateCommentProps) {
	const { auth } = useAuth()
	const accessToken = auth?.accessToken as string

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ content: string }>()

	const { mutate } = useMutation(
		(data: CommentData) =>
			commentsService.create(blogId, data, accessToken),
		{
			onSuccess() {
				setOnComment(false)
			},
		}
	)

	const onSubmit = handleSubmit(data => {
		mutate(data)
	})

	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-xl mb-6 font-bold'>Viết bình luận</h2>

			<FormGroupTextarea
				{...register('content', {
					required: 'Vui lòng nhập nội dung bình luận.',
				})}
				autoFocus
				maxLength={1000}
				label=''
				placeholder='Viết bình luận của bạn tại đây...'
				error={errors.content?.message}
			/>

			<div className='flex mt-6 items-center justify-end space-x-3'>
				<Button
					component='div'
					color='slate'
					onClick={() => setOnComment(false)}
				>
					Hủy
				</Button>
				<Button>Gửi</Button>
			</div>
		</form>
	)
}
