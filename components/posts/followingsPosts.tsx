import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { postsService } from '~/apiServices'
import { Post as PostType } from '~/apiServices/postsServices'
import Post from '~/components/post'
import queryKeys from '~/config/queryKeys'
import { useAuth, useInView } from '~/hooks'
import Suggestion from './suggestion'
import Tags from './tags'

export default function FollowingsPosts() {
	const { auth } = useAuth()

	const { inView, ref } = useInView()

	const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } =
		useInfiniteQuery(
			queryKeys.followingsPosts(auth?.data._id as string),
			({ pageParam = { limit: 6 } }) =>
				postsService.getFollowingsPosts(
					auth?.accessToken as string,
					pageParam
				),
			{
				enabled: !!auth?.accessToken,
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
			<div className='hide-on-xl'>
				<Suggestion />
			</div>

			<div className='hide-on-xl'>
				<Tags />
			</div>

			{data?.pages &&
				data.pages
					.map(page => page?.posts as PostType[])
					.flat()
					.map((post, index) => <Post key={index} data={post} />)}

			{(isFetching || isFetchingNextPage) && <Post.Skeleton />}

			<div className='mt-28' ref={ref} />
		</div>
	)
}
