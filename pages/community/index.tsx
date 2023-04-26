import { useInfiniteQuery } from '@tanstack/react-query'
import { NextSeo } from 'next-seo'
import { postsService } from '~/apiServices'
import { Post as PostType } from '~/apiServices/postsServices'
import queryKeys from '~/config/queryKeys'
import { useAuth, useInView } from '~/hooks'
import { NextPageWithLayout } from '../_app'
import { useEffect } from 'react'
import ScrollToTopButton from '~/components/scrollToTopButton'
import Post, { CreatePost } from '~/components/post'

const Community: NextPageWithLayout = () => {
	const { auth } = useAuth()

	const { inView, ref } = useInView()

	const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } =
		useInfiniteQuery(
			queryKeys.posts,
			({ pageParam = { limit: 6 } }) =>
				postsService.get(auth?.accessToken as string, pageParam),
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
		<div className='row -mt-8'>
			<NextSeo title='Cộng đồng' />

			<ScrollToTopButton />

			<div className='xl:col-3 lg:col-2 col-12'></div>

			<section className='xl:col-6 lg:col-8 col-12 space-y-8'>
				<CreatePost />

				{data?.pages &&
					data.pages
						.map(page => page?.posts as PostType[])
						.flat()
						.map((post, index) => <Post key={index} data={post} />)}

				{(isFetching || isFetchingNextPage) && <Post.Skeleton />}

				<div className='mt-28' ref={ref} />
			</section>

			<div className='xl:col-3 lg:col-2 col-12'></div>
		</div>
	)
}

Community.isPrivate = true

export default Community
