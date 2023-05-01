import { useInfiniteQuery } from '@tanstack/react-query'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { searchService } from '~/apiServices'
import { Post as PostType } from '~/apiServices/postsServices'
import Post from '~/components/post'
import ScrollToTopButton from '~/components/scrollToTopButton'
import queryKeys from '~/config/queryKeys'
import { useInView } from '~/hooks'

export default function Posts() {
	const { inView, ref } = useInView()

	const router = useRouter()

	const tag = router.query.tag

	const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
		useInfiniteQuery(
			queryKeys.searchPosts(`#${tag}`, { limit: 10 }),
			({ pageParam = { limit: 6 } }) =>
				searchService.searchPosts(tag as string, {
					...pageParam,
					hashtag: true,
				}),
			{
				enabled: !!tag,
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
		<div className='max-w-2xl mx-auto'>
			<NextSeo title={'#' + tag} />

			<ScrollToTopButton />

			<h2 className='text-2xl font-semibold mb-10'>#{tag}</h2>

			<div className='space-y-8'>
				{data?.pages &&
					data.pages
						.map(page => page?.posts as PostType[])
						.flat()
						.map((post, index) => <Post key={index} data={post} />)}

				{(isFetching || isFetchingNextPage) && <Post.Skeleton />}

				<div className='mt-28' ref={ref} />
			</div>
		</div>
	)
}
