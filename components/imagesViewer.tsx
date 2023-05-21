/* eslint-disable @next/next/no-img-element */
import { Transition } from '@headlessui/react'
import { Dispatch, Fragment, SetStateAction, memo, useEffect } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from './icons'

interface Props {
	images: string[]
	isOpen: number
	setIsOpen: Dispatch<SetStateAction<number>>
}

export default memo(function ImagesViewer({
	isOpen = -1,
	images,
	setIsOpen,
}: Props) {
	useEffect(() => {
		isOpen >= 0 && document.body.classList.add('overflow-hidden')

		return () => document.body.classList.remove('overflow-hidden')
	}, [isOpen])

	function onPrevious() {
		if (isOpen > 0) {
			setIsOpen(prev => prev - 1)
		}
	}

	function onNext() {
		if (isOpen < images.length - 1 && isOpen >= 0) {
			setIsOpen(prev => prev + 1)
		}
	}

	return (
		<Transition show={isOpen >= 0}>
			<div className='fixed flex inset-0 items-center justify-center z-50'>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div
						onClick={() => setIsOpen(-1)}
						className='fixed z-[50] transition inset-0 backdrop-blur-[0.5px] bg-black/75'
					/>
				</Transition.Child>

				<Transition.Child
					enter='ease-out duration-300'
					enterFrom='opacity-0 scale-75'
					enterTo='opacity-100 scale-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100 scale-100'
					leaveTo='opacity-0 scale-75'
					as={Fragment}
				>
					<img
						alt=''
						src={images[isOpen]}
						className='max-h-[calc(100vh-5rem)] transition z-50 absolute shadow-2xl shadow-blue-900/25 max-w-[calc(100vw-1rem)] rounded-2xl'
					/>
				</Transition.Child>

				{isOpen > 0 && (
					<button
						onClick={onPrevious}
						className='absolute flex transition hover:bg-black/30 items-center justify-center left-6 w-10 h-10 z-50 rounded-full bg-black/25 text-white'
					>
						<ArrowLeftIcon className='h-6' />
					</button>
				)}

				{isOpen < images.length - 1 && isOpen >= 0 && (
					<button
						onClick={onNext}
						className='absolute flex transition hover:bg-black/30 items-center justify-center right-6 w-10 h-10 z-50 rounded-full bg-black/25 text-white'
					>
						<ArrowRightIcon className='h-6' />
					</button>
				)}

				<button
					onClick={() => setIsOpen(-1)}
					className='absolute top-4 right-5 p-2 z-50 rounded-full text-white'
				>
					<CloseIcon className='h-6' />
				</button>
			</div>
		</Transition>
	)
})
