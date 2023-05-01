import { useInfiniteQuery } from '@tanstack/react-query'
import { searchService } from '~/apiServices'
import { Post as PostType } from '~/apiServices/postsServices'
import Loader from '~/components/loader'
import queryKeys from '~/config/queryKeys'
import Post from '../post'
import { useInView } from '~/hooks'
import { useEffect } from 'react'

export default function Posts({ searchQuery }: { searchQuery: string }) {
	const { inView, ref } = useInView()

	const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
		useInfiniteQuery(
			queryKeys.searchPosts(searchQuery, { limit: 10 }),
			({ pageParam = { limit: 6 } }) =>
				searchService.searchPosts(searchQuery, pageParam),
			{
				enabled: searchQuery.trim().length > 1,
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
		<>
			{data && data.pages[0] && data.pages[0].posts.length > 0 && (
				<section className='max-w-2xl mx-auto'>
					<h2 className='text-xl font-semibold mb-8'>Bài viết</h2>

					<div className='space-y-6'>
						{data.pages
							.map(page => page?.posts as PostType[])
							.flat()
							.map((blog, index) => (
								<Post key={index} data={blog} />
							))}

						{(isFetching || isFetchingNextPage) && (
							<Loader.Inline />
						)}

						<div className='mt-28' ref={ref} />
					</div>
				</section>
			)}
		</>
	)
}
