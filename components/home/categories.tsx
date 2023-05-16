import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'
import { categoriesService } from '~/apiServices'
import queryKeys from '~/config/queryKeys'
import routes from '~/config/routes'
import Skeleton from '../skeleton'
import Heading from './heading'

export default function Categories() {
	const { data } = useQuery(queryKeys.categories, () =>
		categoriesService.get()
	)

	const [isLimit, setIsLimit] = useState(true)

	return (
		<section>
			<Heading>Danh mục</Heading>

			<div className='flex flex-wrap'>
				{data ? (
					<>
						{data
							.slice(0, isLimit ? 10 : data.length)
							.map((category, index) => (
								<Link
									key={index}
									href={routes.blogsByCategory(category.slug)}
									className='inline-block py-1.5 px-4 mr-2 mb-2.5 rounded-2xl bg-blue-50/75 transition hover:bg-blue-100/75'
								>
									{category.name}
								</Link>
							))}

						<button
							onClick={() => setIsLimit(!isLimit)}
							className='inline-block py-1.5 px-6 mr-2 mb-2.5 rounded-3xl bg-blue-50 font-medium transition hover:bg-blue-100/75'
						>
							{isLimit ? 'Xem tất cả' : 'Thu gọn'}
						</button>
					</>
				) : (
					Array.from(Array(6)).map((_, i) => (
						<div key={i} className='mr-2 mb-2.5'>
							<Skeleton
								width={[6, 8, 7, 7.5, 8, 7][i] + 'rem'}
								height={9}
								rounded='2xl'
							/>
						</div>
					))
				)}
			</div>
		</section>
	)
}
