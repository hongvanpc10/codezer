import Link from 'next/link'
import { Icon } from '../icons'

interface Props {
	url: string
	icon: Icon
}

export default function SocialLink({ url, icon }: Props) {
	const Icon = icon

	return url ? (
		<div className='flex items-center'>
			<label className='font-medium mr-3'>
				<Icon className='h-5' />
			</label>

			<Link
				href={url}
				target='_blank'
				className='line-clamp-1 font-medium text-blue-600'
			>
				{url}
			</Link>
		</div>
	) : null
}
