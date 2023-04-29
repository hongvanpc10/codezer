import { NextSeo } from 'next-seo'
import { Posts, Suggestion } from '~/components/community'
import ScrollToTopButton from '~/components/scrollToTopButton'
import { NextPageWithLayout } from '../_app'

const Community: NextPageWithLayout = () => {
	return (
		<div className='row -mt-8'>
			<NextSeo title='Cộng đồng' />

			<ScrollToTopButton />

			<div className='xl:col-3 lg:col-2 col-12'></div>

			<div className='xl:col-6 lg:col-8 col-12'>
				<Posts />
			</div>

			<div className='xl:col-3 lg:col-2 col-12'>
				<Suggestion />
			</div>
		</div>
	)
}

Community.isPrivate = true

export default Community
