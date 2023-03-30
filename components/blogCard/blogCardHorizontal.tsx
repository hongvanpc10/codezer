import Link from 'next/link'
import { Blog } from '~/apiServices/blogsService'
import routes from '~/config/routes'
import timeFromNow from '~/utils/timeFromNow'
import Avatar from '../avatar'
import Image from '../image'
import Skeleton from '../skeleton'
import BlogCardVertical from './blogCardVertical'

interface Props {
	data: Blog
}

function BlogCardHorizontal({ data }: Props) {
	return (
		<>
			<div className='bg-white show-on-md p-2 sm:p-4 ring-1 ring-blue-50 rounded-3xl shadow-xl shadow-blue-900/[0.03]'>
				<div className='row items-stretch gutter-sm'>
					<Link
						href={routes.blog(data.slug)}
						className='xl:col-5 col-6 flex items-center'
					>
						<Image
							src={data.thumb}
							alt=''
							rounded='2xl'
							ratio={[16, 10]}
							sizes={[100, 50, 30]}
						/>
					</Link>

					<div className='xl:col-7 col-6'>
						<Link
							href={routes.profile(data.author.slug)}
							className='flex items-center mb-2'
						>
							<Avatar alt='' src={data.author.avatar} size={7} />
							<h3 className='font-semibold ml-3'>
								{data.author.fullName}
							</h3>
						</Link>

						<Link href={routes.blog(data.slug)}>
							<h2 className='text-lg font-bold line-clamp-2'>
								{data.title}
							</h2>
						</Link>

						<p className='line-clamp-2 mt-1'>{data.description}</p>

						<div className='flex items-center justify-between mt-2.5'>
							<div className='flex items-center -mb-1.5'>
								{data.categories.map((category, index) => (
									<Link
										key={index}
										href={routes.blogsByCategory(
											category.slug
										)}
										className='py-0.5 mr-2 mb-1.5 px-3 bg-blue-50 rounded-xl text-[0.9375rem]'
									>
										{category.name}
									</Link>
								))}
							</div>

							<span className='text-[0.9375rem]'>
								{timeFromNow(data.createdAt)}
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className='hide-on-md'>
				<BlogCardVertical data={data} />
			</div>
		</>
	)
}

BlogCardHorizontal.Skeleton = function CardSkeleton() {
	return (
		<>
			<div className='bg-white show-on-md ring-1 ring-blue-50 p-4 rounded-3xl shadow-xl shadow-blue-900/[0.03]'>
				<div className='row items-stretch gutter-sm'>
					<div className='xl:col-5 col-6 flex items-center'>
						<div className='flex-1'>
							<Skeleton ratio={[16, 10]} rounded='2xl' />
						</div>
					</div>

					<div className='xl:col-7 col-6'>
						<div className='flex items-center mb-2'>
							<Skeleton size={7} rounded='full' />
							<div className='ml-2'>
								<Skeleton.Text width={28} />
							</div>
						</div>

						<Skeleton.Text
							lines={2}
							lastLineWidth='50%'
							size='lg'
						/>

						<div className='mt-1'>
							<Skeleton.Text lines={2} lastLineWidth='75%' />
						</div>

						<div className='flex items-center justify-between mt-2.5'>
							<div className='flex items-center -mb-1.5'>
								<Skeleton
									height='1.635rem'
									width={24}
									rounded='xl'
								/>
							</div>

							<Skeleton
								height='0.9375rem'
								rounded='lg'
								width={24}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='hide-on-md'>
				<BlogCardVertical.Skeleton />
			</div>
		</>
	)
}

export default BlogCardHorizontal
