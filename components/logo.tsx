import Image from 'next/image'
import Link from 'next/link'
import images from '~/assets/images'
import routes from '~/config/routes'

export default function Logo({
	image = true,
	text = true,
}: {
	image?: boolean
	text?: boolean
}) {
	return (
		<Link
			href={routes.home}
			className='font-display text-[1.375rem] font-bold tracking-wide text-blue-500 flex items-center drop-shadow'
		>
			{image && (
				<Image alt='' src={images.logo} className='h-6 w-auto mr-2' />
			)}
			{text && 'Codezer'}
		</Link>
	)
}
