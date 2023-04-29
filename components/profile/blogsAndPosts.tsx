import { Tab } from '@headlessui/react'
import Blogs from './blogs'
import Posts from './posts'

export default function BlogsAndPosts({ id }: { id: string }) {
	return (
		<section className='xl:mt-0 mt-6'>
			<Tab.Group>
				<Tab.List className='flex space-x-2 items-center mb-8 bg-white shadow-2xl shadow-blue-900/10 p-2 rounded-3xl'>
					<Tab className='flex-1'>
						{({ selected }) => (
							<div
								className={`py-2.5 transition rounded-2xl font-medium ${
									selected
										? 'bg-blue-500 text-white'
										: 'hover:bg-slate-50'
								}`}
							>
								Bài viết
							</div>
						)}
					</Tab>
					<Tab className='flex-1'>
						{({ selected }) => (
							<div
								className={`py-2.5 transition rounded-2xl font-medium ${
									selected
										? 'bg-blue-500 text-white'
										: 'hover:bg-slate-50'
								}`}
							>
								Bài viết
							</div>
						)}
					</Tab>
				</Tab.List>

				<Tab.Panels>
					<Tab.Panel>
						<Blogs id={id} />
					</Tab.Panel>

					<Tab.Panel>
						<Posts id={id} />
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</section>
	)
}
