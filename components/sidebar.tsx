import routes from '~/config/routes'
import { useAuth } from '~/hooks'
import ActiveLink from './activeLink'
import {
	DocumentIcon,
	DocumentSolidIcon,
	GridIcon,
	GridSolidIcon,
	HomeIcon,
	HomeSolidIcon,
	Icon,
	MessagesIcon,
	MessagesSolidIcon,
	SearchIcon,
	SearchSolidIcon,
} from './icons'

interface ItemProps {
	href: string
	icon: Icon
	activeIcon: Icon
	title: string
}

function Item({ activeIcon, href, icon, title }: ItemProps) {
	const Icon = icon
	const ActiveIcon = activeIcon

	return (
		<ActiveLink
			href={href}
			className={isActive =>
				`w-[3.75rem] h-[3.75rem] flex items-center justify-center ${
					isActive
						? 'bg-blue-500/90 bg-blue-500 text-white'
						: 'bg-blue-50/40 hover:bg-blue-50'
				} transition rounded-[1.2rem]`
			}
			title={title}
		>
			{isActive =>
				isActive ? (
					<ActiveIcon className='h-[1.625rem]' />
				) : (
					<Icon className='h-[1.625rem]' />
				)
			}
		</ActiveLink>
	)
}

interface Item {
	href: string
	icon: Icon
	activeIcon: Icon
	title: string
	show?: boolean
}

export default function Sidebar() {
	const { isLogin, auth } = useAuth()

	const user = auth?.data

	const items: Item[] = [
		{
			href: routes.home,
			icon: HomeIcon,
			activeIcon: HomeSolidIcon,
			title: 'Trang chủ',
		},
		{
			href: routes.blogs,
			icon: DocumentIcon,
			activeIcon: DocumentSolidIcon,
			title: 'Bài viết',
		},
		{
			href: routes.posts,
			icon: MessagesIcon,
			activeIcon: MessagesSolidIcon,
			title: 'Cộng đồng',
		},
		{
			href: routes.categories,
			icon: GridIcon,
			activeIcon: GridSolidIcon,
			title: 'Danh mục',
			show: user?.role === 'admin',
		},
		{
			href: routes.search,
			icon: SearchIcon,
			activeIcon: SearchSolidIcon,
			title: 'Tìm kiếm',
		},
	]

	return (
		<aside className='fixed !show-on-lg top-[3.75rem] -translate-x-full left-0 bg-white/[.98] backdrop-blur bottom-0 shadow-2xl shadow-blue-900/20 transition py-6 px-3 z-[29] rounded-br-2xl space-y-4 flex flex-col items-center hover:translate-x-0 duration-300 ease-in-out group'>
			{items
				.filter(item =>
					item.show !== undefined ? item.show === true : true
				)
				.map((item, index) => (
					<Item key={index} {...item} />
				))}

			<div className='absolute right-0 pr-5 translate-x-full h-1/2 top-6 cursor-pointer'>
				<div className='w-1 transition group-hover:-translate-x-full bg-blue-500/75 h-full rounded-r-full group-hover:opacity-0 duration-300 ease-in-out' />
			</div>
		</aside>
	)
}
