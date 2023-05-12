import routes from '~/config/routes'
import Avatar from '../avatar'
import Link from 'next/link'
import timeFromNow from '~/utils/timeFromNow'
import { User } from '~/apiServices/usersService'
import { type } from 'os'
import { title } from 'process'

interface Props {
	images: string[]
	user: User
	type: number
	href: string
	title?: string
}

/*
    0: new blog
    1: new post
    2: new follower
    3: new like
    4: new comment
    5: new reaction
*/

export default function NotificationItem({
	images,
	user,
	href,
	type,
	title,
}: Props) {
	return (
		<Link
			href={href}
			className='flex relative cursor-pointer items-start after:content-[""] after:inline-block after:w-2 after:h-2 after:rounded-full after:absolute after:top-3 after:right-3 after:bg-blue-500 bg-blue-50/20 pl-4 pr-6 py-2.5 rounded-2xl'
		>
			<Avatar alt='' src={images[0] || user.avatar} noRing />

			<div className='pl-3'>
				<h3 className='line-clamp-2'>
					<Link href={routes.home} className='font-medium'>
						{user.fullName}
					</Link>{' '}
					{type === 0
						? 'đã đăng một bài viết mới: '
						: type === 1
						? `đã thêm ${
								images.length > 0
									? images.length + ' ảnh'
									: 'trạng thái'
						  } mới trong cộng đồng: `
						: type === 2
						? 'đã theo dõi bạn'
						: type === 3
						? 'đã thích bài viết của bạn: '
						: type === 4
						? 'đã bình luận về bài viết của bạn: '
						: ''}
					{title && (
						<span
							className={
								[0, 3, 4].includes(type) ? 'font-medium' : ''
							}
						>
							{title}
						</span>
					)}
				</h3>
				<p className='text-sm'>
					{timeFromNow(new Date().toISOString(), true)}
				</p>
			</div>
		</Link>
	)
}
