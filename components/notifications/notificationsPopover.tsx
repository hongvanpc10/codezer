import Link from 'next/link'
import { User } from '~/apiServices/usersService'
import images from '~/assets/images'
import routes from '~/config/routes'
import timeFromNow from '~/utils/timeFromNow'
import Avatar from '../avatar'
import Dropdown from '../dropdown'
import { MoreIcon } from '../icons'
import NotificationItem from './notificationItem'

export default function NotificationsPopover({ user }: { user: User }) {
	return (
		<div className='w-96 pb-2 max-h-[calc(100vh-8rem)] overflow-y-auto scroll-sm'>
			<div className='flex items-center justify-between mb-3 p-2'>
				<h2 className='text-lg font-semibold'>Thông báo</h2>

				<Dropdown
					items={[
						{ label: 'Đánh dấu đã đọc' },
						{ label: 'Cài đặt thông báo' },
					]}
				>
					<button>
						<MoreIcon className='h-5' />
					</button>
				</Dropdown>
			</div>

			<ul className='space-y-2'>
				<li>
					<NotificationItem
						href=''
						images={[]}
						type={4}
						user={user}
						title='Python - Các Tính Năng Vi Diệu Của Python'
					/>
				</li>
				<li>
					<NotificationItem
						href=''
						images={[]}
						type={3}
						user={user}
						title='Python - Các Tính Năng Vi Diệu Của Python'
					/>
				</li>
				<li>
					<NotificationItem
						href=''
						images={[]}
						type={2}
						user={user}
						title=''
					/>
				</li>
				<li>
					<NotificationItem
						href=''
						images={[]}
						type={1}
						user={user}
						title='Python - Các Tính Năng Vi Diệu Của Python'
					/>
				</li>
				<li>
					<NotificationItem
						href=''
						images={[
							'http://localhost:3000/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fhongvandev%2Fimage%2Fupload%2Fv1681637466%2Fq2z9vdofkmrre3m3lhgp.jpg&w=384&q=75',
						]}
						type={1}
						user={user}
						title='Python - Các Tính Năng Vi Diệu Của Python'
					/>
				</li>
				<li>
					<NotificationItem
						href=''
						images={[
							'http://localhost:3000/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fhongvandev%2Fimage%2Fupload%2Fv1681637466%2Fq2z9vdofkmrre3m3lhgp.jpg&w=384&q=75',
						]}
						type={0}
						user={user}
						title='Python - Các Tính Năng Vi Diệu Của Python'
					/>
				</li>
			</ul>

			<div className='flex justify-center mt-4'>
				<Link href='' className='font-medium text-blue-600'>
					Xem tất cả
				</Link>
			</div>
		</div>
	)
}
