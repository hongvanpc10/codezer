import { CounterObject, FacebookSelector } from '@charkour/react-reactions'
import { Transition } from '@headlessui/react'
import { Fragment, ReactNode, useState } from 'react'
import { useAuth, useRedirectToLogin } from '~/hooks'

interface Props {
	children: (reaction?: CounterObject) => ReactNode
	iconSize?: number
	onAdd: (data: CounterObject) => void
	onRemove: (data: CounterObject) => void
	reaction?: CounterObject
}

export default function Reactions({
	children,
	iconSize = 24,
	onAdd,
	onRemove,
	reaction,
}: Props) {
	const [isOpen, setIsOpen] = useState(false)

	const redirectToLogin = useRedirectToLogin()

	const { auth } = useAuth()
	const user = auth?.data

	function onSelect(key?: string) {
		if (!user) return redirectToLogin()

		if (reaction) onRemove(reaction)
		else onAdd({ by: user._id, emoji: key || 'like' })
	}

	return (
		<div
			className='inline-flex relative'
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
		>
			<div
				className='cursor-pointer inline-flex'
				onClick={() => onSelect()}
			>
				{children(reaction)}
			</div>

			<Transition
				show={isOpen && !reaction}
				as={Fragment}
				enter='duration-150 delay-700'
				enterFrom='opacity-0 bottom-1/2'
				enterTo='opacity-100 bottom-full'
				leave='duration-75'
				leaveFrom='opacity-100 bottom-full'
				leaveTo='opacity-0 bottom-1/2'
			>
				<div className='absolute transition-all left-2 bottom-full z-10'>
					<FacebookSelector iconSize={iconSize} onSelect={onSelect} />
				</div>
			</Transition>
		</div>
	)
}
