import { useInfiniteQuery } from '@tanstack/react-query'
import { blogsService } from '~/apiServices'
import { Blog } from '~/apiServices/blogsService'
import queryKeys from '~/config/queryKeys'
import routes from '~/config/routes'
import { BlogCardVertical } from '../blogCard'
import Button from '../button'
import Loader from '../loader'
import Heading from './heading'

export default function NewBlogs() {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery(
			queryKeys.newBlogs,
			({ pageParam = { limit: 4 } }) => blogsService.getBlogs(pageParam),
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

	return (
		<section className='lg:col-8 col-12'>
			<Heading href={routes.blogs}>Bài viết mới</Heading>

			<div className='row gutter-nm md:gutter-md xl:gutter-nm'>
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

			{hasNextPage && !isFetchingNextPage && (
				<div className='flex justify-center mt-10'>
					<Button color='lightBlue' onClick={() => fetchNextPage()}>
						Xem thêm
					</Button>
				</div>
			)}

			{isFetchingNextPage && <Loader.Inline />}
		</section>
	)
}
