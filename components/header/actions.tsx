import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { authService } from '~/apiServices'
import routes from '~/config/routes'
import { useAuth, useRedirectToLogin } from '~/hooks'
import Avatar from '../avatar'
import Button from '../button'
import Dropdown, { Item } from '../dropdown'
import {
	EditIcon,
	Icon,
	LoginIcon,
	NotificationIcon,
	SearchIcon,
} from '../icons'
import { NotificationsPopover } from '../notifications'
import Popover from '../popover'

interface ActionsButtonProps {
	href?: string
	icon: Icon
	active?: boolean
}

function ActionsButton({ href, icon, active }: ActionsButtonProps) {
	const Icon = icon
	const Comp = href ? Link : 'button'

	return (
		<Comp
			href={href || ''}
			className={`p-2.5 rounded-2xl inline-flex transition ${
				active ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-blue-50/50'
			}`}
		>
			<Icon className='h-[1.375rem]' />
		</Comp>
	)
}

function NotificationsButton({ href }: { href?: string }) {
	return (
		<div className='inline-flex relative after:content-[""] after:w-2 after:h-2 after:rounded-full after:bg-blue-500 after:absolute after:top-2 after:right-[0.7rem] before:animate-ping before:content-[""] before:w-2 before:h-2 before:rounded-full before:bg-blue-500 before:absolute before:top-2 before:right-[0.7rem]'>
			<ActionsButton icon={NotificationIcon} href={href} />
		</div>
	)
}

export default function Actions() {
	const { auth, logout } = useAuth()
	const user = auth?.data

	const redirectToLogin = useRedirectToLogin()

	const { mutate: logoutMutate } = useMutation(authService.logout)

	const menuItems: Item[] = [
		{
			label: 'Trang cá nhân',
			href: routes.profile(user?.slug as string),
			divider: true,
		},
		{
			label: 'Danh mục',
			href: routes.categories,
			show: user?.role === 'admin',
		},
		{
			label: 'Cài đặt',
			href: routes.settings,
		},
		{
			label: 'Bài viết đã lưu',
			divider: true,
			href: routes.savedBlogs,
		},
		{
			label: 'Đăng xuất',
			onClick() {
				logout()
				logoutMutate()
			},
		},
	]

	return (
		<div className='flex items-center space-x-1'>
			<div className='hide-on-lg'>
				<ActionsButton icon={SearchIcon} href={routes.search} />
			</div>

			{user && (
				<>
					<div className='show-on-md'>
						<Popover
							render={() => <NotificationsPopover user={user} />}
						>
							<NotificationsButton />
						</Popover>
					</div>

					<div className='hide-on-md'>
						<NotificationsButton href='' />
					</div>
				</>
			)}

			<div className='show-on-md'>
				<ActionsButton icon={EditIcon} />
			</div>

			<div className='md:!ml-5 !ml-4 inline-flex'>
				{user ? (
					<Dropdown top='1.25rem' items={menuItems}>
						<Avatar alt='' src={user.avatar} />
					</Dropdown>
				) : (
					<>
						<div className='show-on-lg'>
							<Button onClick={() => redirectToLogin()}>
								Đăng nhập
							</Button>
						</div>
						<div className='hide-on-lg'>
							<ActionsButton
								href={routes.login}
								icon={LoginIcon}
								active
							/>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
