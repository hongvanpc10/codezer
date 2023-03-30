import { useInfiniteQuery } from '@tanstack/react-query'
import { blogsService } from '~/apiServices'
import { Blog } from '~/apiServices/blogsService'
import queryKeys from '~/config/queryKeys'
import { useAuth } from '~/hooks'
import { BlogCardVertical } from '../blogCard'
import Button from '../button'
import Loader from '../loader'
import Heading from './heading'

export default function FollowingBLogs() {
	const { auth, isLogin } = useAuth()

	const user = auth?.data

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery(
			queryKeys.followingsBlogs(user?._id as string),
			({ pageParam = { limit: 3 } }) =>
				blogsService.getFollowingsBlogs(
					auth?.accessToken as string,
					pageParam
				),
			{
				getNextPageParam(lastPage) {
					if (
						(lastPage?.pagination.currentPage as number) <
						(lastPage?.pagination.totalPages as number)
					)
						return {
							limit: 3,
							page:
								(lastPage?.pagination.currentPage as number) +
								1,
						}
				},
				enabled: isLogin,
			}
		)

	return isLogin &&
		(data
			? data.pages[0]?.blogs && data.pages[0].blogs.length > 0
			: true) ? (
		<section>
			<Heading>Đang theo dõi</Heading>

			<div className='row gutter-nm md:gutter-md xl:gutter-nm'>
				{data
					? data?.pages
							.map(page => page?.blogs as Blog[])
							.flat()
							.map((blog, index) => (
								<div
									className='lg:col-4 md:col-6 col-12'
									key={index}
								>
									<BlogCardVertical data={blog} />
								</div>
							))
					: Array.from(Array(4)).map((_, index) => (
							<div
								className='lg:col-4 md:col-6 col-12'
								key={index}
							>
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
	) : null
}
