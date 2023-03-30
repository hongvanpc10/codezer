import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { blogsService } from '~/apiServices'
import { Blog } from '~/apiServices/blogsService'
import { useInView } from '~/hooks'
import { BlogCardVertical } from '../blogCard'
import Loader from '../loader'

export default function Blogs({ id }: { id: string }) {
	const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
		useInfiniteQuery(
			['blogs', 'user', id],
			({ pageParam = { limit: 4 } }) =>
				blogsService.getBlogsByUser(id, pageParam),
			{
				getNextPageParam(lastPage) {
					if (
						(lastPage?.pagination.currentPage as number) <
						(lastPage?.pagination.totalPages as number)
					)
						return {
							limit: 4,
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
		<section className='xl:mt-0 mt-6'>
			<h2 className='text-xl font-bold mb-4'>Bài viết</h2>

			<div className='row gutter-sm'>
				{data
					? data?.pages
							.map(page => page?.blogs as Blog[])
							.flat()
							.map((blog, index) => (
								<div className='md:col-6 col-12' key={index}>
									<BlogCardVertical data={blog} />
								</div>
							))
					: Array.from(Array(4)).map((_, index) => (
							<div className='md:col-6 col-12' key={index}>
								<BlogCardVertical.Skeleton />
							</div>
					  ))}
			</div>

			{isFetchingNextPage && <Loader.Inline />}

			<div ref={ref} />
		</section>
	)
}
