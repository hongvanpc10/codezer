import images from '~/assets/images'
import { TickIcon } from './icons'
import Image from './image'

interface Props {
	src: string
	alt: string
	size?: number | string
	isAdmin?: boolean
	isVerified?: boolean
	ringWidth?: number
	className?: string
	sizes?: [number, number, number]
}

export default function Avatar({
	alt,
	src,
	size = 8,
	isAdmin,
	isVerified,
	ringWidth = 2,
	sizes = [20, 10, 5],
	className,
}: Props) {
	return (
		<div className='relative inline-flex justify-center items-center'>
			<Image
				src={src}
				alt={alt}
				width={size}
				height={size}
				rounded='full'
				className={`ring-${ringWidth} ${
					isAdmin ? 'ring-amber-500' : 'ring-blue-500'
				} ring-offset-2 cursor-pointer ${className}`}
				sizes={sizes}
				fallback={images.avatarPlaceholder}
			/>

			{isVerified && (
				<span className='absolute left-full top-full -translate-x-2/3 -translate-y-2/3'>
					<TickIcon className='text-sky-500 h-[1.125rem]' />
				</span>
			)}
		</div>
	)
}
