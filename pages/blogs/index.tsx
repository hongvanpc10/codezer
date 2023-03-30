import { useQuery } from '@tanstack/react-query'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { blogsService } from '~/apiServices'
import { BlogCardHorizontal } from '~/components/blogCard'
import { Categories } from '~/components/home'
import Pagination from '~/components/pagination'
import { Select } from '~/components/select'
import { Option } from '~/components/select/select'
import queryKeys from '~/config/queryKeys'

const sortOptions: Option<{
	sort?: string
	order?: 1 | -1
}>[] = [
	{
		type: 'newest',
		label: 'Mới nhất',
		value: {},
	},
	{
		type: 'oldest',
		label: 'Cũ nhất',
		value: {
			order: 1,
		},
	},
	{
		type: 'popular',
		label: 'Phổ biến',
		value: {
			sort: 'views',
		},
	},
]

const Blogs = () => {
	const [page, setPage] = useState(1)
	const [sort, setSort] = useState(sortOptions[0])

	const router = useRouter()

	const { data } = useQuery(
		queryKeys.blogs(page, sort.value.sort, sort.value.order),
		() => blogsService.getBlogs({ page, ...sort.value, limit: 12 })
	)

	useEffect(() => {
		const query = router.query.sort

		const sortOption = sortOptions.find(option => option.type === query)

		if (sortOption) {
			setSort(sortOption)
		} else {
			setSort(sortOptions[0])
		}
	}, [router.query])

	return (
		<div>
			<NextSeo title='Bài viết' />

			<div className='row gutter-xl'>
				<section className='xl:col-8 lg:col-9 col-12'>
					<div className='flex items-center justify-between mb-10'>
						<h1 className='text-2xl font-bold'>Bài viết</h1>

						<Select
							value={sort}
							onChange={option => {
								router.push({ query: { sort: option.type } })
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

						{data && (
							<Pagination
								totalPages={data.pagination.totalPages}
								page={page}
								setPage={setPage}
							/>
						)}
					</div>
				</section>

				<section className='xl:col-4 lg:col-3 col-12'>
					<Categories />
				</section>
			</div>
		</div>
	)
}

export default Blogs
