import { useQuery } from '@tanstack/react-query'
import { blogsService } from '~/apiServices'
import queryKeys from '~/config/queryKeys'
import routes from '~/config/routes'
import { BlogCardVertical } from '../blogCard'
import Heading from './heading'

export default function BlogsGroupByCategories() {
	const { data } = useQuery(queryKeys.blogsGroupByCategories, () =>
		blogsService.getBlogsGroupByCategories()
	)

	return (
		<>
			{data ? (
				data.map((category, index) => (
					<section key={index}>
						<Heading href={routes.blogsByCategory(category.slug)}>
							{category.name}
						</Heading>

						<div className='row gutter-nm md:gutter-md xl:gutter-nm'>
							{category.blogs.map((blog, index) => (
								<div
									key={index}
									className='lg:col-4 md:col-6 col-12'
								>
									<BlogCardVertical
										data={blog}
										showCategories={false}
									/>
								</div>
							))}
						</div>
					</section>
				))
			) : (
				<section>
					<Heading.Skeleton />

					<div className='row'>
						{Array.from(Array(3)).map((_, index) => (
							<div
								key={index}
								className='lg:col-4 md:col-6 col-12'
							>
								<BlogCardVertical.Skeleton />
							</div>
						))}
					</div>
				</section>
			)}
		</>
	)
}
