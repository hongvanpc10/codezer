import Link from 'next/link'
import { User } from '~/apiServices/usersService'
import images from '~/assets/images'
import routes from '~/config/routes'
import timeFromNow from '~/utils/timeFromNow'
import Avatar from '../avatar'
import Dropdown from '../dropdown'
import { MoreIcon } from '../icons'

export default function NotificationsPopover({ user }: { user: User }) {
	return (
		<div className='w-96 pb-2'>
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
				<li className='flex relative cursor-pointer items-start after:content-[""] after:inline-block after:w-2 after:h-2 after:rounded-full after:absolute after:top-3 after:right-3 after:bg-blue-500 bg-blue-50/40 px-4 py-2.5 rounded-2xl'>
					<Avatar alt='' src={images.logo} noRing />

					<div className='pl-3'>
						<h3>
							<Link href={routes.home} className='font-medium'>
								Codezer
							</Link>{' '}
							đã theo dõi bạn
						</h3>
						<p className='text-[0.9375rem]'>
							{timeFromNow(user.createdAt, true)}
						</p>
					</div>
				</li>

				<li className='flex relative cursor-pointer items-start after:content-[""] after:inline-block after:w-2 after:h-2 after:rounded-full after:absolute after:top-3 after:right-3 after:bg-blue-500 bg-blue-50/40 px-4 py-2.5 rounded-2xl'>
					<Avatar alt='' src={images.logo} noRing />

					<div className='pl-3'>
						<h3 className='font-medium'>
							Chào mừng đến với Codezer 🤗
						</h3>
						<p className='text-[0.9375rem]'>
							{timeFromNow(user.createdAt, true)}
						</p>
					</div>
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
