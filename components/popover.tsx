import { Popover as BasePopover, Transition } from '@headlessui/react'
import { Fragment, ReactElement } from 'react'

interface Props {
	children: ReactElement
	render: () => ReactElement
}

export default function Popover({ children, render }: Props) {
	return (
		<BasePopover className='relative z-20'>
			<BasePopover.Button as='div'>{children}</BasePopover.Button>

			<Transition
				as={Fragment}
				enter='duration-150 ease-out'
				enterFrom='-translate-y-3 opacity-0'
				enterTo='translate-y-0 opacity-100'
				leave='duration-100 ease-in'
				leaveFrom='translate-y-0 opacity-100'
				leaveTo='-translate-y-3 opacity-0'
			>
				<BasePopover.Panel className='absolute bg-white/[.98] rounded-2xl p-2 shadow-2xl right-0 shadow-blue-900/25 transition ring-1 ring-blue-50/50 min-w-[12rem] top-[calc(100%+1rem)]'>
					{render()}
				</BasePopover.Panel>
			</Transition>
		</BasePopover>
	)
}
