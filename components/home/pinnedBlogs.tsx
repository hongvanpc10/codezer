import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Autoplay, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { blogsService } from '~/apiServices'
import queryKeys from '~/config/queryKeys'
import routes from '~/config/routes'
import { useAuth, useResponsive } from '~/hooks'
import Image from '../image'
import Skeleton from '../skeleton'
import Heading from './heading'

export default function PinnedBlogs() {
	const { match } = useResponsive()

	const { data } = useQuery(queryKeys.pinnedBlogs(5), () =>
		blogsService.getPinnedBlogs({ limit: 5 })
	)

	const { auth } = useAuth()

	const user = auth?.data

	return (data ? data.length > 0 : true) ? (
		<section>
			<Heading
				href={user?.role === 'admin' ? routes.pinnedBlogs : undefined}
			>
				Bài viết đã ghim
			</Heading>

			<Swiper
				spaceBetween={15}
				slidesPerView={match('xl') ? 3 : match('md') ? 2 : 1}
				pagination={{
					clickable: true,
					bulletClass:
						'w-8 h-2 rounded-full bg-slate-900/25 inline-block transition-all duration-300 mr-1.5 cursor-pointer',
					bulletActiveClass: '!bg-blue-500/75 !w-11',
					horizontalClass: '!bottom-0 !text-left !w-auto ml-4',
				}}
				modules={[Pagination, Autoplay]}
				autoplay
				speed={500}
				className='!pb-7'
			>
				{data
					? data.map((blog, index) => (
							<SwiperSlide key={index}>
								<div className='flex overflow-hidden group relative rounded-2xl'>
									<Image
										alt=''
										src={blog.thumb}
										containerClassName='aspect-w-16 lg:aspect-h-9 aspect-h-10 sm:aspect-h-9 md:aspect-h-10'
										sizes={[100, 50, 33]}
									/>

									<div className='absolute transition group-hover:opacity-100 inset-0 bg-black/30 opacity-0 duration-300 backdrop-blur-[0.5px]' />

									<div className='absolute inset-0 translate-y-full transition duration-300 group-hover:translate-y-0 p-3 pb-6 flex flex-col justify-end'>
										<div className='flex flex-wrap'>
											{blog.categories.map(
												(category, index) => (
													<Link
														href={routes.blogsByCategory(
															category.slug
														)}
														key={index}
														className='inline-block bg-blue-500/80 text-white rounded-full px-3 py-1 text-sm font-medium mb-1.5 mr-2'
													>
														{category.name}
													</Link>
												)
											)}
										</div>

										<Link href={routes.blog(blog.slug)}>
											<h3 className='text-lg text-white font-bold'>
												{blog.title}
											</h3>
										</Link>
									</div>
								</div>
							</SwiperSlide>
					  ))
					: Array.from(Array(3)).map((_, index) => (
							<SwiperSlide key={index}>
								<Skeleton
									ratio='aspect-w-16 lg:aspect-h-9 aspect-h-10 sm:aspect-h-9 md:aspect-h-10'
									rounded='2xl'
								/>
							</SwiperSlide>
					  ))}
			</Swiper>
		</section>
	) : null
}
