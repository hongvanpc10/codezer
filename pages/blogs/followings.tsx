import { useQuery } from '@tanstack/react-query'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { blogsService } from '~/apiServices'
import { BlogCardHorizontal } from '~/components/blogCard'
import { Categories } from '~/components/home'
import Pagination from '~/components/pagination'
import { Select } from '~/components/select'
import queryKeys from '~/config/queryKeys'
import { useAuth, useSort } from '~/hooks'
import { NextPageWithLayout } from '../_app'

const Followings: NextPageWithLayout = () => {
	const [page, setPage] = useState(1)

	const { sort, sortOptions } = useSort()

	const { auth } = useAuth()

	const router = useRouter()

	const { data } = useQuery(
		queryKeys.followingsBlogs(12, page, sort.value.sort, sort.value.order),
		() =>
			blogsService.getFollowingsBlogs(auth?.accessToken as string, {
				page,
				...sort.value,
				limit: 12,
			})
	)

	return (
		<div>
			<NextSeo title={'Bài viết theo dõi'} />

			<div className='row gutter-xl'>
				<section className='xl:col-8 lg:col-9 col-12'>
					<div className='flex items-center justify-between mb-10'>
						<h1 className='text-2xl font-bold'>{'Bài viết'}</h1>

						<Select
							value={sort}
							onChange={option => {
								router.push({
									query: { sort: option.type },
								})
							}}
							options={sortOptions}
						/>
					</div>

					<div className='space-y-8'>
						{data
							? data.blogs.map((blog, index) => (
									<BlogCardHorizontal
										key={index}
										data={blog}
									/>
							  ))
							: Array.from(Array(6)).map((_, index) => (
									<BlogCardHorizontal.Skeleton key={index} />
							  ))}

						{data?.pagination.totalPages && (
							<Pagination
								totalPages={data.pagination.totalPages}
								page={page}
								setPage={setPage}
							/>
						)}
					</div>
				</section>

				<section className='xl:col-4 lg:col-3 col-12'>
					<Categories showFull />
				</section>
			</div>
		</div>
	)
}

Followings.isPrivate = true

export default Followings
