import { Tab } from '@headlessui/react'
import { Fragment, ReactElement } from 'react'
import { User } from '~/apiServices/usersService'
import Activities from './activities'
import Blogs from './blogs'
import Followers from './followers'
import Followings from './followings'
import Introduction from './introduction'
import Posts from './posts'

const items: {
	title: string
	component: ({ id }: { id: string }) => ReactElement
	layout?: boolean
	type: string
}[] = [
	{
		title: 'Bài viết',
		component: Blogs,
		layout: true,
		type: 'blogs',
	},
	{
		title: 'Bài post',
		component: Posts,
		layout: true,
		type: 'posts',
	},
	{
		title: 'Follower',
		component: Followers,
		type: 'followers',
	},
	{
		title: 'Đang follow',
		component: Followings,
		type: 'followings',
	},
]

export default function Main({ data }: { data: User }) {
	return (
		<Tab.Group>
			<Tab.List className='flex space-x-2 items-stretch mb-10 bg-white shadow-2xl shadow-blue-900/5 p-2 rounded-3xl'>
				{items.map((item, index) => (
					<Tab key={index} className='flex-1'>
						{({ selected }) => (
							<div
								className={`py-3 h-full flex items-center justify-center hover:bg-slate-50 rounded-2xl transition after:content-[""] after:absolute relative after:h-[0.1875rem] after:rounded-full after:transition-all after:left-1/2 after:-translate-x-1/2 after:-bottom-1.5 font-medium ${
									selected
										? 'after:bg-blue-500 text-blue-500 after:md:w-[60%] after:w-[80%]'
										: 'after:md:w-[30%] after:w-[40%]'
								}`}
							>
								{item.title}
							</div>
						)}
					</Tab>
				))}
			</Tab.List>

			<Tab.Panels>
				{items.map((item, index) => {
					const Comp = item.component
					const Layout = item.layout
						? ({ children }: { children: ReactElement }) => (
								<div className='row'>
									<div className='xl:col-4 col-12 space-y-6'>
										<section className='row'>
											<div className='xl:col-12 col-12 lg:col-6'>
												<Introduction data={data} />
											</div>

											<div className='xl:col-12 col-12 lg:col-6'>
												<Activities data={data} />
											</div>
										</section>
									</div>

									<div className='xl:col-8 col-12'>
										{children}
									</div>
								</div>
						  )
						: Fragment

					return (
						<Tab.Panel key={index}>
							<Layout>
								<Comp id={data._id} />
							</Layout>
						</Tab.Panel>
					)
				})}
			</Tab.Panels>
		</Tab.Group>
	)
}
