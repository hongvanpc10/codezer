import { CounterObject, FacebookSelector } from '@charkour/react-reactions'
import { ReactNode } from 'react'
import { useAuth, useRedirectToLogin } from '~/hooks'

export const emoji: { [key: string]: { text: string; color: string } } = {
	like: { text: 'Thích', color: 'text-blue-500' },
	love: { text: 'Yêu thích', color: 'text-rose-500' },
	haha: { text: 'Haha', color: 'text-amber-400' },
	wow: { text: 'Wow', color: 'text-amber-400' },
	angry: { text: 'Phẫn nộ', color: 'text-orange-500' },
	sad: { text: 'Buồn', color: 'text-amber-400' },
}

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
	const redirectToLogin = useRedirectToLogin()

	const { auth } = useAuth()
	const user = auth?.data

	function onSelect(key?: string) {
		if (!user) return redirectToLogin()

		if (reaction) {
			onRemove(reaction)
		} else onAdd({ by: user._id, emoji: key || 'like' })
	}

	return (
		<div className='inline-flex group relative'>
			<div
				className='cursor-pointer inline-flex'
				onClick={() => onSelect()}
			>
				{children(reaction)}
			</div>

			<div
				className={`absolute transition-all delay-300 after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-[10%] invisible ${
					!reaction &&
					'group-hover:visible group-hover:opacity-100 group-hover:bottom-[calc(110%)]'
				} opacity-0 bottom-1/2 left-1 z-10`}
			>
				<FacebookSelector iconSize={iconSize} onSelect={onSelect} />
			</div>
		</div>
	)
}
