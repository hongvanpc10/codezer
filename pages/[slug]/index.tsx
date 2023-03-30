import { useQueries } from '@tanstack/react-query'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { ArticleJsonLd, NextSeo } from 'next-seo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { blogsService } from '~/apiServices'
import { Blog } from '~/apiServices/blogsService'
import { NativeAds } from '~/components/advertisments'
import { Aside, Header, Viewer } from '~/components/blogDetail'
import Loader from '~/components/loader'
import ScrollToTopButton from '~/components/scrollToTopButton'
import queryKeys from '~/config/queryKeys'
import routes from '~/config/routes'
import markdownToHTML from '~/utils/markdownToHTML'

export const getStaticPaths: GetStaticPaths = async () => {
	const data = await blogsService.getBlogs({
		sort: 'views',
		limit: process.env.NODE_ENV === 'production' ? 20 : 1,
	})

	return {
		paths:
			data?.blogs?.map(blog => ({ params: { slug: blog.slug } })) || [],
		fallback: true,
	}
}

export const getStaticProps: GetStaticProps<{ data: Blog }> = async context => {
	try {
		const blog = await blogsService.getDetail(
			context.params?.slug as string
		)

		if (!blog) return { notFound: true }

		const html = await markdownToHTML(blog.content, { toc: true })

		return {
			props: {
				data: { ...blog, content: html },
			},
			revalidate: 60,
		}
	} catch (error) {
		return { notFound: true }
	}
}

const BlogDetail = ({
	data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const router = useRouter()

	const [{ data: blogsWithSameAuthor }, { data: popularBlogs }] = useQueries({
		queries: [
			{
				queryKey: queryKeys.blogsWithSameAuthor(
					data?.slug,
					data?.author.slug
				),
				queryFn: () =>
					blogsService.getBlogsByUser(data.author._id, { limit: 4 }),
				enabled: !!data,
			},
			{
				queryKey: queryKeys.popularBlogs,
				queryFn: () =>
					blogsService.getBlogs({ sort: 'views', limit: 4 }),
				enabled: !!data,
			},
		],
	})

	if (router.isFallback) return <Loader.Inline />

	return (
		<div>
			<ScrollToTopButton />

			<ArticleJsonLd
				type='BlogPosting'
				url={process.env.NEXT_PUBLIC_SITE_URL + routes.blog(data.slug)}
				title={data.title}
				images={[data.thumb]}
				datePublished={data.createdAt}
				dateModified={data.updatedAt}
				authorName={data.author.fullName}
				description={data.description}
			/>

			<NextSeo
				title={data.title}
				description={data.description}
				openGraph={{
					title: data.title,
					description: data.description,
					url:
						process.env.NEXT_PUBLIC_SITE_URL +
						routes.blog(data.slug),

					type: 'article',
					article: {
						publishedTime: data.createdAt,
						modifiedTime: data.updatedAt,
						authors: [
							process.env.NEXT_PUBLIC_SITE_URL +
								routes.profile(data.author.slug),
						],
						tags: data.categories.map(category => category.name),
					},
					images: [
						{
							url: data.thumb,

							width: 800,
							height: 600,
							alt: data.title,
						},
					],
				}}
			/>

			<div className='row gutter-xl'>
				<div className='xl:col-3 lg:col-2 col-12'>
					<div className='show-on-xl sticky top-32'>
						<Aside data={data} />
					</div>
				</div>

				<div className='xl:col-6 lg:col-8 col-12'>
					<h1 className='text-3xl font-bold mb-16'>{data.title}</h1>

					<Header data={data} />

					<Viewer content={data.content} />

					<div className='flex items-center flex-wrap mt-16'>
						{data.categories.map((category, index) => (
							<Link
								key={index}
								href={routes.blogsByCategory(category.slug)}
								className='py-1 px-3 bg-blue-50 rounded-xl transition hover:bg-blue-100 mr-2 mb-2'
							>
								#{category.name}
							</Link>
						))}
					</div>

					<hr className='border-blue-900/10 mt-4 mb-12' />

					{blogsWithSameAuthor && (
						<section className='prose prose-blue prose-a:!text-blue'>
							<h3>Bài viết khác của {data.author.fullName}</h3>

							<ul>
								{blogsWithSameAuthor.blogs.map(
									(blog, index) => (
										<li key={index}>
											<Link href={routes.blog(blog.slug)}>
												{blog.title}
											</Link>
										</li>
									)
								)}
							</ul>
						</section>
					)}

					<NativeAds />
				</div>

				<div className='xl:col-3 lg:col-2 col-12'></div>
			</div>
		</div>
	)
}

export default BlogDetail
