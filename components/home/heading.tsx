import Link from 'next/link'
import Skeleton from '../skeleton'

interface Props {
	children: string
	href?: string
}

function Heading({ children, href }: Props) {
	return (
		<div className='flex items-center justify-between mb-5'>
			<h2 className='text-xl font-bold drop-shadow'>{children}</h2>

			{href && (
				<Link href={href} className='font-medium text-blue-700'>
					Tất cả
				</Link>
			)}
		</div>
	)
}

Heading.Skeleton = function HeadingSkeleton() {
	return <div className='mb-5'><Skeleton.Text size='xl' width={28} /></div>
}

export default Heading
