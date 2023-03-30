import { useQuery } from '@tanstack/react-query'
import { NextSeo } from 'next-seo'
import { blogsService } from '~/apiServices'
import { BlogCardHorizontal } from '~/components/blogCard'
import queryKeys from '~/config/queryKeys'
import { NextPageWithLayout } from '../_app'

const PinnedBlogs: NextPageWithLayout = () => {
	const { data } = useQuery(queryKeys.pinnedBlogs(), () =>
		blogsService.getPinnedBlogs()
	)

	return (
		<div>
			<NextSeo title='Bài viết đã ghim' />

			<h1 className='text-2xl font-bold mb-8'>Bài viết đã ghim</h1>

			<section className='row'>
				<div className='xl:col-8 lg:col-9 col-12 space-y-8'>
					{data
						? data.map((blog, index) => (
								<BlogCardHorizontal key={index} data={blog} />
						  ))
						: Array.from(Array(4)).map((_, index) => (
								<BlogCardHorizontal.Skeleton key={index} />
						  ))}
				</div>
			</section>
		</div>
	)
}

PinnedBlogs.isAdminRequired = true

export default PinnedBlogs
