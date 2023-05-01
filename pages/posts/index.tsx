import { NextSeo } from 'next-seo'
import { CreatePost } from '~/components/post'
import { Posts, Suggestion, Tags } from '~/components/posts'
import ScrollToTopButton from '~/components/scrollToTopButton'
import { NextPageWithLayout } from '../_app'

const PostsPage: NextPageWithLayout = () => {
	return (
		<div className='row -mt-8'>
			<NextSeo title='Cộng đồng' />

			<ScrollToTopButton />

			<div className='xl:col-3 lg:col-2 col-12'>
				<div className='show-on-xl sticky top-24'>
					<Tags />
				</div>
			</div>

			<div className='xl:col-6 lg:col-8 col-12'>
				<CreatePost />

				<Posts />
			</div>

			<div className='xl:col-3 lg:col-2 col-12'>
				<div className='show-on-xl sticky top-24'>
					<Suggestion />
				</div>
			</div>
		</div>
	)
}

PostsPage.isPrivate = true

export default PostsPage
