import { Dialog, Transition } from '@headlessui/react'
import {
	Dispatch,
	Fragment,
	ReactElement,
	SetStateAction,
	useState,
} from 'react'
import fonts from '~/config/fonts'

export type SetIsOpen = Dispatch<SetStateAction<boolean>>

export interface Props {
	children?: (setIsOpen: SetIsOpen) => ReactElement
	closeable?: boolean
	onClose?: Function
	render: (setIsOpen: SetIsOpen) => ReactElement
	defaultOpen?: boolean
	scale?: boolean
	maxWidth?: 'lg' | 'xl' | '2xl' | '3xl'
}

export default function Modal({
	children,
	closeable = true,
	onClose,
	render,
	defaultOpen = true,
	scale = true,
	maxWidth = 'lg',
}: Props) {
	const [isOpen, setIsOpen] = useState(defaultOpen)

	return (
		<>
			{children && children(setIsOpen)}

			<Transition show={isOpen} appear as={Fragment}>
				<Dialog
					onClose={() => {
						closeable && setIsOpen(false)
						closeable && onClose && onClose()
					}}
					className={`fixed inset-0 flex items-center justify-center p-3 ${fonts.baloo2.variable} ${fonts.montserrat.variable} font-sans text-blue z-50`}
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
						enterFrom={`opacity-0 ${scale && 'scale-90'}`}
						enterTo={`opacity-100 ${scale && 'scale-100'}`}
						leave='ease-in duration-200'
						leaveFrom={`opacity-100 ${scale && 'scale-100'}`}
						leaveTo={`opacity-0 ${scale && 'scale-90'}`}
					>
						<Dialog.Panel
							className={`transition ${
								scale
									? 'bg-white/95 backdrop-blur'
									: 'bg-white/[.98]'
							} shadow-2xl w-full max-w-${maxWidth} shadow-blue-900/10 px-5 py-6 rounded-3xl z-50`}
						>
							{render(setIsOpen)}
						</Dialog.Panel>
					</Transition.Child>
				</Dialog>
			</Transition>
		</>
	)
}
