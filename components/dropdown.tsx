import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Fragment, MouseEventHandler, ReactElement } from 'react'
import { Icon } from './icons'

export interface Item {
	label: string
	href?: string
	onClick?: MouseEventHandler
	icon?: Icon
	divider?: boolean
	show?: boolean
}

interface Props {
	children: ReactElement
	items: Item[]
	top?: string
}

export default function Dropdown({ children, items, top = '0.5rem' }: Props) {
	return (
		<Menu as='div' className='inline-flex relative'>
			<Menu.Button as='div' className='inline-flex'>
				{children}
			</Menu.Button>

			<Transition
				as={Fragment}
				enter='duration-150 ease-out'
				enterFrom='-translate-y-3 opacity-0'
				enterTo='translate-y-0 opacity-100'
				leave='duration-100 ease-in'
				leaveFrom='translate-y-0 opacity-100'
				leaveTo='-translate-y-3 opacity-0'
			>
				<Menu.Items
					style={{ top: `calc(100% + ${top})` }}
					className='absolute bg-white/[.98] rounded-2xl shadow-2xl p-2 min-w-[14rem] right-0 space-y-0.5 shadow-blue-900/25 transition z-20 ring-1 ring-blue-50/50'
				>
					{items
						.filter(item =>
							item.show !== undefined ? item.show === true : true
						)
						.map((item, index) => {
							const Comp = item.href ? Link : 'button'
							const Icon = item.icon

							return (
								<div key={index}>
									<Menu.Item>
										{({ active }) => (
											<Comp
												href={item.href || ''}
												onClick={item.onClick}
												className={`flex items-center font-medium w-full px-5 py-2.5 transition rounded-xl ${
													active && 'bg-blue-100'
												}`}
											>
												{Icon && (
													<Icon className='h-6 mr-4' />
												)}
												{item.label}
											</Comp>
										)}
									</Menu.Item>

									{item.divider && (
										<div className='h-[1px] !my-1.5 bg-blue-900/[0.075] mx-3' />
									)}
								</div>
							)
						})}
				</Menu.Items>
			</Transition>
		</Menu>
	)
}
