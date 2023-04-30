import { useInfiniteQuery } from '@tanstack/react-query'
import { NextSeo } from 'next-seo'
import { blogsService } from '~/apiServices'
import { Blog } from '~/apiServices/blogsService'
import { BlogCardHorizontal } from '~/components/blogCard'
import queryKeys from '~/config/queryKeys'
import { useAuth, useInView } from '~/hooks'
import { NextPageWithLayout } from '../_app'
import { useEffect } from 'react'
import Loader from '~/components/loader'

const SavedBlogs: NextPageWithLayout = () => {
	const { auth } = useAuth()
	const user = auth?.data

	const { inView, ref } = useInView()

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery(
			queryKeys.savedBlogs(user?._id as string),
			({ pageParam = { limit: 10 } }) =>
				blogsService.getSavedBlogs(
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
							limit: 10,
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
		<div>
			<NextSeo title={'Bài viết đã lưu'} />

			<div className='row gutter-xl'>
				<section className='xl:col-8 lg:col-9 col-12 mx-auto'>
					<h1 className='text-2xl mb-10 font-bold'>
						{'Bài viết đã lưu'}
					</h1>

					<div className='space-y-8'>
						{data
							? data?.pages
									.map(page => page?.blogs as Blog[])
									.flat()
									.map((blog, index) => (
										<BlogCardHorizontal
											key={index}
											data={blog}
										/>
									))
							: Array.from(Array(4)).map((_, index) => (
									<BlogCardHorizontal.Skeleton key={index} />
							  ))}

						{isFetchingNextPage && <Loader.Inline />}

						<div ref={ref} />
					</div>
				</section>
			</div>
		</div>
	)
}

SavedBlogs.isPrivate = true

export default SavedBlogs
