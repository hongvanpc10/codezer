import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { blogsService } from '~/apiServices'
import { Blog } from '~/apiServices/blogsService'
import queryKeys from '~/config/queryKeys'
import routes from '~/config/routes'

interface Props {
	data: Blog
}

export default function BlogsWithSameAuthor({ data }: Props) {
	const { data: blogsWithSameAuthor } = useQuery(
		queryKeys.blogsWithSameAuthor(data?.slug, data?.author.slug),
		() => blogsService.getBlogsByUser(data.author._id, { limit: 4 }),
		{ enabled: !!data }
	)

	return blogsWithSameAuthor &&
		blogsWithSameAuthor?.blogs.filter(blog => blog._id !== data._id)
			.length > 0 ? (
		<section className='prose prose-blue prose-a:!font-normal prose-a:!text-blue'>
			<h3>Bài viết khác của {data.author.fullName}</h3>

			<ul>
				{blogsWithSameAuthor.blogs
					.filter(blog => blog._id !== data._id)
					.map((blog, index) => (
						<li key={index}>
							<Link href={routes.blog(blog.slug)}>
								{blog.title}
							</Link>
						</li>
					))}
			</ul>
		</section>
	) : null
}
