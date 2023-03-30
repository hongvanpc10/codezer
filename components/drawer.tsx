import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Fragment, MouseEventHandler, ReactElement, useState } from 'react'
import fonts from '~/config/fonts'
import { CloseIcon, Icon } from './icons'

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
}

export default function Drawer({ children, items }: Props) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<div onClick={() => setIsOpen(true)} className='inline-flex'>
				{children}
			</div>

			<Transition show={isOpen} as={Fragment}>
				<Dialog
					onClose={() => setIsOpen(false)}
					className={`relative z-40 ${fonts.montserrat.variable} font-sans text-blue`}
				>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-black/30 transition' />
					</Transition.Child>

					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 -translate-x-full'
						enterTo='opacity-100 translate-x-0'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 translate-x-0'
						leaveTo='opacity-50 -translate-x-full'
					>
						<Dialog.Panel className='bg-white/95 shadow-blue-900/10 shadow-xl backdrop-blur px-3 py-5 fixed top-2 left-2 bottom-2 rounded-2xl transition w-72'>
							<div className='flex justify-end'>
								<button
									onClick={() => setIsOpen(false)}
									className='-mt-2 -mr-1.5 p-1'
								>
									<CloseIcon className='h-5 text-blue-900' />
								</button>
							</div>

							<div className='space-y-2 mt-6'>
								{items
									.filter(item =>
										item.show !== undefined
											? item.show === true
											: true
									)
									.map((item, index) => {
										const Comp = item.href ? Link : 'button'
										const Icon = item.icon

										return (
											<div key={index}>
												<Comp
													href={item.href || ''}
													onClick={e => {
														item.onClick &&
															item.onClick(e)
														setIsOpen(false)
													}}
													className='flex items-center font-medium w-full px-4 py-3 transition rounded-xl hover:bg-blue-100/50'
												>
													{Icon && (
														<Icon className='h-6 mr-6' />
													)}
													{item.label}
												</Comp>

												{item.divider && (
													<div className='h-[1px] !my-2.5 bg-blue-900/[0.075] mx-4' />
												)}
											</div>
										)
									})}
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</Dialog>
			</Transition>
		</>
	)
}
