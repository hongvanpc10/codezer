import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { blogsService } from '~/apiServices'
import { Blog } from '~/apiServices/blogsService'
import { useInView } from '~/hooks'
import { BlogCardVertical } from '../blogCard'
import Loader from '../loader'

export default function Blogs({ id }: { id: string }) {
	const { data, isFetchingNextPage, fetchNextPage } = useInfiniteQuery(
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
						page: (lastPage?.pagination.currentPage as number) + 1,
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
		<>
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

				{data && data.pages[0] && data.pages[0].blogs.length === 0 && (
					<h3 className='text-center opacity-50 w-full mt-6 text-xl'>
						Tác giả chưa có bài viết nào
					</h3>
				)}
			</div>

			{isFetchingNextPage && <Loader.Inline />}

			<div ref={ref} />
		</>
	)
}
