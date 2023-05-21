import { useMutation } from '@tanstack/react-query'
import { authService } from '~/apiServices'
import routes from '~/config/routes'
import { useAuth } from '~/hooks'
import Drawer, { Item } from '../drawer'
import {
	DocumentIcon,
	EditIcon,
	GridIcon,
	HomeIcon,
	LogoutIcon,
	MenuIcon,
	MessagesIcon,
	SearchIcon,
} from '../icons'
import Logo from '../logo'
import Actions from './actions'
import Search from './search'

export default function Header() {
	const { isLogin, logout, auth } = useAuth()
	const user = auth?.data

	const { mutate: logoutMutate } = useMutation(authService.logout)

	const menuItems: Item[] = [
		{
			label: 'Trang chủ',
			icon: HomeIcon,
			href: routes.home,
		},
		{
			label: 'Bài viết',
			icon: DocumentIcon,
			href: routes.blogs,
		},
		{
			label: 'Cộng đồng',
			icon: MessagesIcon,
			href: routes.posts,
		},
		{
			label: 'Tìm kiếm',
			icon: SearchIcon,
			divider: true,
			href: routes.search,
		},
		{
			label: 'Bài viết mới',
			icon: EditIcon,
			href: routes.createBlog,
			divider: user?.role !== 'admin',
		},
		{
			label: 'Danh mục',
			icon: GridIcon,
			divider: isLogin,
			href: routes.categories,
		},
		{
			label: 'Đăng xuất',
			icon: LogoutIcon,
			show: isLogin,
			onClick() {
				logout()
				logoutMutate()
			},
		},
	]

	return (
		<header className='bg-white/[.98] backdrop-blur h-16 fixed shadow-lg inset-x-0 shadow-blue-900/[0.03] lg:px-6 sm:px-4 px-3 flex items-center z-30 transition-all'>
			<div className='flex items-center justify-between w-full'>
				<div className='flex items-center'>
					<div className='hide-on-lg'>
						<Drawer items={menuItems}>
							<button className='p-2 rounded-2xl mr-3 transition hover:bg-blue-50/75'>
								<MenuIcon className='h-6' />
							</button>
						</Drawer>
					</div>

					<div className='show-on-sm'>
						<span className='show-on-lg'>
							<Logo />
						</span>
						<span className='hide-on-lg'>
							<Logo image={false} />
						</span>
					</div>
				</div>

				<div className='show-on-lg'>
					<Search />
				</div>

				<Actions />
			</div>
		</header>
	)
}
