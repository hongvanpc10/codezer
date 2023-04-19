import {
	InfiniteData,
	useInfiniteQuery,
	useQueryClient,
} from '@tanstack/react-query'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { commentsService } from '~/apiServices'
import { Comment as CommentType } from '~/apiServices/commentsService'
import queryKeys from '~/config/queryKeys'
import socket from '~/config/socket'
import { useInView } from '~/hooks'
import { DataWithPagination } from '~/utils/request'
import Loader from '../loader'
import Modal from '../modal'
import Comment from './comment'
import CreateComment from './createComment'

interface Props {
	blogId: string
	setOnComment: Dispatch<SetStateAction<boolean>>
	onComment: boolean
	authorId:string
}

export default function Comments({ blogId, setOnComment, onComment,authorId }: Props) {
	const queryClient = useQueryClient()

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
								allCount: (oldData.pages[0].allCount || 0) + 1,
							},
							...oldData.pages.slice(1),
						],
					}
			)
		}

		socket.on('comment:create', onCreateComment)

		return () => {
			socket.off('comment:create', onCreateComment)
		}
	}, [blogId, queryClient])

	useEffect(() => {
		function onReplyComment(data: CommentType) {
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
						pages: oldData.pages.map(page => ({
							...page,
							comments: page.comments.map(comment =>
								data.parent === comment._id
									? {
											...comment,
											children: [
												...comment.children,
												data,
											],
									  }
									: comment
							),
							allCount: (page.allCount || 0) + 1,
						})),
					}
			)
		}

		socket.on('comment:reply', onReplyComment)

		return () => {
			socket.off('comment:reply', onReplyComment)
		}
	}, [blogId, queryClient])

	useEffect(() => {
		function onUpdateComment(data: CommentType) {
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
						pages: oldData.pages.map(page => ({
							...page,
							comments: data.parent
								? page.comments.map(comment =>
										comment._id === data.parent
											? {
													...comment,
													children:
														comment.children.map(
															child =>
																child._id ===
																data._id
																	? data
																	: child
														),
											  }
											: comment
								  )
								: page.comments.map(comment =>
										data._id === comment._id
											? {
													...data,
													children: comment.children,
											  }
											: comment
								  ),
						})),
					}
			)
		}

		socket.on('comment:update', onUpdateComment)

		return () => {
			socket.off('comment:update', onUpdateComment)
		}
	}, [blogId, queryClient])

	useEffect(() => {
		function onDeleteComment(data: CommentType) {
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
						pages: oldData.pages.map(page => ({
							...page,
							comments: data.parent
								? page.comments.map(comment =>
										comment._id === data.parent
											? {
													...comment,
													children:
														comment.children.filter(
															child =>
																child._id !==
																data._id
														),
											  }
											: comment
								  )
								: page.comments.filter(
										comment => comment._id !== data._id
								  ),
							allCount:
								page.allCount - (data.children.length + 1),
						})),
					}
			)
		}

		socket.on('comment:delete', onDeleteComment)

		return () => {
			socket.off('comment:delete', onDeleteComment)
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
		<div className=''>
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

			<div className='space-y-6'>
				{data?.pages[0] && data.pages[0].comments.length > 0 ? (
					data.pages
						.map(page => page?.comments as CommentType[])
						.flat()
						.map((comment, index) => (
							<Comment key={index} authorId={authorId} data={comment} />
						))
				) : (
					<h3></h3>
				)}

				{(isFetchingNextPage || isLoading) && <Loader.Inline />}

				<div ref={ref}></div>
			</div>
		</div>
	)
}
