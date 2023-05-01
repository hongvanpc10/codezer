import { useQuery } from '@tanstack/react-query'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { postsService } from '~/apiServices'
import Post from '~/components/post'
import queryKeys from '~/config/queryKeys'

export default function PostDetail() {
	const router = useRouter()

	const id = router.query.id

	const { data, error } = useQuery(
		queryKeys.postDetail(id as string),
		() => postsService.getDetail(id as string),
		{
			enabled: !!id,
		}
	)

	if (error) router.push('/post-not-found')

	return data ? (
		<>
			<NextSeo title={data.content} />
			<Post data={data} />
		</>
	) : (
		<Post.Skeleton />
	)
}
