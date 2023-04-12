import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { blogsService } from '~/apiServices'
import { Blog } from '~/apiServices/blogsService'
import queryKeys from '~/config/queryKeys'
import routes from '~/config/routes'
import { useAuth } from '~/hooks'
import {
	ArchiveIcon,
	ArchiveSolidIcon,
	HeartIcon,
	HeartSolidIcon,
	MessageIcon,
} from '../icons'

export default function Aside({ data }: { data: Blog }) {
	const { auth } = useAuth()
	const user = auth?.data

	const { data: supportData } = useQuery(queryKeys.blog(data.slug), () =>
		blogsService.getDetail(data.slug)
	)

	return (
		<div className='xl:w-8/12 mx-auto'>
			<Link href={routes.profile(data.author.slug)}>
				<h2 className='font-semibold text-lg'>
					{data.author.fullName}
				</h2>
			</Link>

			{data.author.bio && <p className='pt-4'>{data.author.bio}</p>}

			<hr className='border-blue-900/5 my-4' />

			<div className='flex items-center justify-around'>
				<div className='flex items-center flex-col text-lg'>
					<button className='mb-1'>
						{(supportData
							? supportData.likes
							: data.likes
						).includes(user?._id as string) ? (
							<HeartSolidIcon className='h-6 text-rose-500' />
						) : (
							<HeartIcon className='h-6' />
						)}
					</button>

					{(supportData ? supportData.likes : data.likes).length}
				</div>

				<div className='flex items-center flex-col text-lg'>
					<button className='mb-1'>
						{false ? (
							<ArchiveSolidIcon className='h-6 text-rose-500' />
						) : (
							<ArchiveIcon className='h-6' />
						)}
					</button>
					1
				</div>

				<div className='flex items-center flex-col text-lg'>
					<Link href='#comments' className='mb-1 inline-flex'>
						<MessageIcon className='h-6' />
					</Link>
					{0}
				</div>
			</div>
		</div>
	)
}
