import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { postsService } from '~/apiServices'
import queryKeys from '~/config/queryKeys'
import routes from '~/config/routes'
import Skeleton from '../skeleton'
import { useState } from 'react'

export default function Tags() {
	const { data, isLoading } = useQuery(queryKeys.hashtags, () =>
		postsService.getHashtags()
	)

	const [limit, setLimit] = useState(true)

	return (
		<div className='bg-white max-w-2xl mx-auto xl:max-h-[calc(100vh-9rem)] overflow-y-auto px-2 py-4 rounded-3xl shadow-xl shadow-blue-900/5'>
			<h2 className='ml-4 text-lg font-medium'>Tags</h2>

			<div className='mt-3 flex flex-wrap'>
				{data &&
					data
						.slice(0, limit ? 10 : data.length)
						.map((tag, index) => (
							<Link
								href={routes.postsByTag(tag.slice(1))}
								key={index}
								className='bg-blue-50/25 transition text-blue-900 hover:bg-blue-50 rounded-xl py-0.5 mb-3.5 mr-2 px-3'
							>
								{tag}
							</Link>
						))}

				{isLoading &&
					Array.from(Array(5)).map((_, i) => (
						<div className='mb-3.5 mr-2' key={i}>
							<Skeleton
								height={7}
								rounded='xl'
								width={[7, 7.5, 5, 6, 8][i] + 'rem'}
							/>
						</div>
					))}
			</div>

			{data && data.length > 10 && (
				<div className='flex justify-center'>
					<button
						className='text-blue-500 font-medium'
						onClick={() => setLimit(!limit)}
					>
						{limit ? 'Xem tất cả' : 'Thu gọn'}
					</button>
				</div>
			)}
		</div>
	)
}
