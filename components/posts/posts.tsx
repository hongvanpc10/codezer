import { Tab } from '@headlessui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FollowingsPosts } from '~/components/posts'
import AllPost from '~/components/posts/allPosts'

export default function Posts() {
	const [selectedTab, setSelectedTab] = useState(0)

	const router = useRouter()

	useEffect(() => {
		const tab = router.query.tab
		if (tab === 'followings') {
			setSelectedTab(1)
		} else {
			setSelectedTab(0)
		}
	}, [router.query.tab])

	return (
		<Tab.Group
			selectedIndex={selectedTab}
			onChange={index => {
				if (index === 1) router.push({ query: { tab: 'followings' } })
				else router.push('')
			}}
			as='div'
			className='mt-12'
		>
			<Tab.List className='flex max-w-2xl mx-auto space-x-2 items-center mb-8 bg-white shadow-2xl shadow-blue-900/10 p-2 rounded-3xl'>
				{['Tất cả', 'Theo dõi'].map((label, index) => (
					<Tab key={index} className='flex-1'>
						{({ selected }) => (
							<div
								className={`py-3 transition rounded-2xl font-medium ${
									selected
										? 'bg-blue-500 text-white'
										: 'hover:bg-slate-50'
								}`}
							>
								{label}
							</div>
						)}
					</Tab>
				))}
			</Tab.List>

			<Tab.Panels>
				<Tab.Panel>
					<AllPost />
				</Tab.Panel>

				<Tab.Panel>
					<FollowingsPosts />
				</Tab.Panel>
			</Tab.Panels>
		</Tab.Group>
	)
}
