import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { searchService } from '~/apiServices'
import { Blog } from '~/apiServices/blogsService'
import { BlogCardHorizontal } from '~/components/blogCard'
import Button from '~/components/button'
import Loader from '~/components/loader'
import { Select } from '~/components/select'
import queryKeys from '~/config/queryKeys'
import { useSort } from '~/hooks'

export default function Blogs({ searchQuery }: { searchQuery: string }) {
	const { sort, sortOptions } = useSort()

	const router = useRouter()

	const blogsQuery = useInfiniteQuery(
		queryKeys.searchBlogs(searchQuery, { ...sort.value, limit: 6 }),
		({ pageParam = { limit: 6 } }) =>
			searchService.searchBlogs(searchQuery, {
				...pageParam,
				...sort.value,
			}),
		{
			enabled: searchQuery.trim().length > 1,
			getNextPageParam(lastPage) {
				if (
					(lastPage?.pagination.currentPage as number) <
					(lastPage?.pagination.totalPages as number)
				)
					return {
						limit: 6,
						page: (lastPage?.pagination.currentPage as number) + 1,
					}
			},
		}
	)

	return (
		<>
			{blogsQuery.data &&
				blogsQuery.data.pages[0] &&
				blogsQuery.data.pages[0].blogs.length > 0 && (
					<section>
						<div className='flex items-center justify-between mb-8'>
							<h2 className='text-xl font-semibold'>Bài viết</h2>

							<Select
								value={sort}
								onChange={option => {
									router.push({
										query: {
											q: searchQuery,
											sort: option.type,
										},
									})
								}}
								options={sortOptions}
							/>
						</div>

						<div className='space-y-6'>
							{blogsQuery.data.pages
								.map(page => page?.blogs as Blog[])
								.flat()
								.map((blog, index) => (
									<BlogCardHorizontal
										key={index}
										data={blog}
									/>
								))}
						</div>

						{blogsQuery.hasNextPage &&
							!blogsQuery.isFetchingNextPage && (
								<div className='flex justify-center mt-6'>
									<Button
										color='lightBlue'
										className='text-blue-500 font-medium'
										onClick={() =>
											blogsQuery.fetchNextPage()
										}
									>
										Xem thêm
									</Button>
								</div>
							)}
					</section>
                )}
            
			{blogsQuery.isFetching && <Loader.Inline />}
		</>
	)
}
