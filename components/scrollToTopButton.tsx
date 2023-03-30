import { Transition } from '@headlessui/react'
import { useScroll } from '~/hooks'
import { ArrowUpIcon } from './icons'

export default function ScrollToTopButton() {
	const { scrollTo, scrollTop } = useScroll()

	return (
		<Transition
			show={scrollTop > 2000}
			enter='duration-200 ease-out'
			enterFrom='opacity-0'
			enterTo='opacity-100'
			leave='duration-300 ease-in'
			leaveFrom='opacity-100'
			leaveTo='opacity-0'
		>
			<button
				onClick={() => scrollTo(0)}
				className='bg-blue-500/90 fixed flex items-center justify-center w-11 h-11 rounded-full z-50 lg:right-12 lg:bottom-12 sm:right-8 sm:bottom-8 right-4 bottom-4 transition hover:bg-blue-500 shadow-lg shadow-blue-900/20'
			>
				<ArrowUpIcon className='h-[1.375rem] text-white mb-0.5' />
			</button>
		</Transition>
	)
}
