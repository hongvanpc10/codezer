import Link from 'next/link'
import { MouseEventHandler, ReactNode } from 'react'
import { Icon } from './icons'

interface Props {
	children: ReactNode
	component?: 'div' | 'button'
	className?: string
	href?: string
	color?: 'blue' | 'red' | 'lightBlue' | 'slate' | 'lightRed'
	full?: boolean
	large?: boolean
	rounded?: boolean
	icon?: Icon
	onClick?: MouseEventHandler<HTMLDivElement> &
		MouseEventHandler<HTMLButtonElement> &
		MouseEventHandler<HTMLAnchorElement>
	small?: boolean
}

const colors = {
	blue: 'bg-blue-500 text-white hover:bg-blue-600 shadow-blue-900/10',
	red: 'bg-red-500 text-white hover:bg-red-600 shadow-red-900/10',
	lightBlue: 'bg-blue-100/80 hover:bg-blue-100 shadow-transparent',
	lightRed: 'bg-red-100 hover:bg-red-200 shadow-transparent',
	slate: 'bg-slate-200/80 hover:bg-slate-200 shadow-transparent',
}

export default function Button({
	children,
	component = 'button',
	className,
	href,
	color = 'blue',
	full,
	large,
	rounded,
	icon,
	onClick,
	small,
}: Props) {
	const Comp = href ? Link : component

	const Icon = icon

	return (
		<Comp
			href={href || ''}
			className={`${className} ${colors[color]} ${
				full && 'w-full'
			} font-medium ${
				large ? 'py-2.5 px-6' : small ? 'px-4 py-1.5' : 'py-2 px-4'
			} ${
				rounded ? 'rounded-full' : 'rounded-xl'
			} transition cursor-pointer inline-flex shadow-lg items-center justify-center`}
			onClick={onClick}
		>
			{Icon && <Icon className='h-6 mr-1.5 -my-10 -ml-2' />}
			{children}
		</Comp>
	)
}
