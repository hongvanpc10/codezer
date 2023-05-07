import { PopAds } from '~/components/advertisments'
import {
	BlogsGroupByCategories,
	Categories,
	NewBlogs,
	PinnedBlogs,
	TopUsers,
} from '~/components/home'
import FollowingBLogs from '~/components/home/followingsBlogs'
import ScrollToTopButton from '~/components/scrollToTopButton'
import Weather from '~/components/weather'

const Home = () => {
	return (
		<div className='space-y-14'>
			<ScrollToTopButton />

			{/* <PopAds /> */}

			<div className='flex space-x-4 !-mt-8 items-center justify-end !-mb-8'>
				<Weather />
			</div>

			<PinnedBlogs />

			<div className='flex row items-start gutter-lg xl:gutter-xl'>
				<NewBlogs />

				<div className='lg:col-4 col-12 lg:mt-0 mt-5 space-y-8'>
					<Categories />

					<TopUsers />
				</div>
			</div>

			<FollowingBLogs />

			<BlogsGroupByCategories />
		</div>
	)
}

export default Home
