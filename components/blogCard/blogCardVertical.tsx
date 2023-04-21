import Link from 'next/link'
import { Blog } from '~/apiServices/blogsService'
import routes from '~/config/routes'
import timeFromNow from '~/utils/timeFromNow'
import capitalizeString from '~/utils/toCapitalize'
import { EyeIcon, HeartSolidIcon, SmsICon } from '../icons'
import Image from '../image'
import Skeleton from '../skeleton'

interface Props {
	data: Blog
	showCategories?: boolean
}

function BlogCardVertical({ data, showCategories = true }: Props) {
	return (
		<div className='bg-white ring-1 ring-blue-50 lg:p-3 p-2 sm:p-4 rounded-3xl flex flex-col shadow-xl shadow-blue-900/[0.03]'>
			<Link href={routes.blog(data.slug)} className='relative flex'>
				<Image
					alt=''
					src={data.thumb}
					containerClassName='aspect-w-16 xl:aspect-h-9 aspect-h-10 sm:aspect-h-9 md:aspect-h-10'
					rounded='2xl'
					sizes={[100, 50, 33]}
				/>

				{showCategories && (
					<div className='absolute top-2 right-2 flex'>
						{data.categories.map((category, index) => (
							<span
								key={index}
								className='inline-block bg-blue-500/80 text-white rounded-full px-3 py-1 text-sm font-medium mb-1.5 ml-2'
							>
								{category.name}
							</span>
						))}
					</div>
				)}
			</Link>

			<div className='px-2 py-3'>
				<Link href={routes.blog(data.slug)}>
					<h3 className='font-bold text-[1.0625rem] leading-6 h-12 line-clamp-2'>
						{capitalizeString(data.title)}
					</h3>
				</Link>

				<div className='flex justify-between items-center mt-2 font-medium text-blue-900/75'>
					<span>{timeFromNow(data.createdAt)}</span>
					<span className='flex items-center text-blue-900/50 text-sm'>
						<EyeIcon className='h-4 mr-0.5' />
						{Math.round(data.views * 0.25)}
						<HeartSolidIcon className='h-3.5 mr-0.5 ml-2' />
						{data.likesCount}
					</span>
				</div>
			</div>
		</div>
	)
}

BlogCardVertical.Skeleton = function CardSkeleton() {
	return (
		<div className='bg-white ring-1 ring-blue-50 lg:p-3 p-2 sm:p-4 rounded-3xl flex flex-col shadow-xl shadow-blue-900/[0.03]'>
			<Skeleton
				ratio='aspect-w-16 xl:aspect-h-9 aspect-h-10 sm:aspect-h-9 md:aspect-h-10'
				rounded='2xl'
			/>

			<div className='px-2 pt-3'>
				<Skeleton.Text
					lines={2}
					text={1.0625}
					leading={1.5}
					lastLineWidth={'80%'}
				/>

				<div className='flex justify-between items-center my-3 font-medium text-blue-900/75'>
					<Skeleton.Text width={16} />

					<Skeleton.Text width={24} text={0.9375} />
				</div>
			</div>
		</div>
	)
}

export default BlogCardVertical
