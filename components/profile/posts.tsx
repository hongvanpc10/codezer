import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { postsService } from '~/apiServices'
import { Post as PostType } from '~/apiServices/postsServices'
import Post, { CreatePost } from '~/components/post'
import queryKeys from '~/config/queryKeys'
import { useAuth, useInView } from '~/hooks'

export default function Posts({ id }: { id: string }) {
	const { inView, ref } = useInView()

	const { auth } = useAuth()
	const user = auth?.data

	const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } =
		useInfiniteQuery(
			queryKeys.userPosts(id),
			({ pageParam = { limit: 6 } }) =>
				postsService.getUserPosts(id, pageParam),
			{
				getNextPageParam(lastPage) {
					if (
						(lastPage?.pagination.currentPage as number) <
						(lastPage?.pagination.totalPages as number)
					)
						return {
							limit: 6,
							page:
								(lastPage?.pagination.currentPage as number) +
								1,
						}
				},
			}
		)

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage()
		}
	}, [fetchNextPage, hasNextPage, inView, isFetchingNextPage])

	return (
		<div className='space-y-8'>
			{user?._id === id && <CreatePost />}

			{data?.pages &&
				data.pages
					.map(page => page?.posts as PostType[])
					.flat()
					.map((post, index) => <Post key={index} data={post} />)}

			{(isFetching || isFetchingNextPage) && <Post.Skeleton />}

			{data && data.pages[0] && data.pages[0].posts.length === 0 && (
				<h3 className='text-center opacity-50 w-full mt-6 text-xl'>
					Tác giả chưa có bài viết nào
				</h3>
			)}

			<div className='mt-28' ref={ref} />
		</div>
	)
}
