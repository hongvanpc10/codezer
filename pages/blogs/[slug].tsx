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
import { useSort } from '~/hooks'
import { Error } from '~/utils/request'

export default function BlogsByCategory() {
	const [page, setPage] = useState(1)
	const { sort, sortOptions } = useSort()

	const router = useRouter()

	const slug = router.query.slug as string

	const { data, error } = useQuery(
		queryKeys.blogsByCategory(
			slug,
			page,
			sort.value.sort,
			sort.value.order
		),
		() =>
			blogsService.getBlogsByCategory(slug, {
				page,
				...sort.value,
				limit: 12,
			}),
		{ enabled: !!slug }
	)

	if (error && (error as Error).errorCode === 'bc4046')
		router.push('/category-not-found')

	return (
		<div>
			<NextSeo
				title={
					data?.category.name ? `${data.category.name}` : 'Bài viết'
				}
			/>

			<div className='row gutter-xl'>
				<section className='xl:col-8 lg:col-9 col-12'>
					<div className='flex items-center justify-between mb-10'>
						<h1 className='text-2xl font-bold'>
							{data?.category.name
								? `${data.category.name}`
								: 'Bài viết'}
						</h1>

						<Select
							value={sort}
							onChange={option => {
								router.push({
									query: { sort: option.type, slug },
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
					{data?.category.description && (
						<p className='mb-6 pb-3 border-blue-900/5 border-b'>
							{data.category.description}
						</p>
					)}

					<Categories />
				</section>
			</div>
		</div>
	)
}
