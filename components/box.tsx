import { ReactNode } from 'react'

interface Props {
	children: ReactNode
}

export default function Box({ children }: Props) {
	return (
		<div className='bg-white-95 rounded-2xl shadow-xl shadow-blue-900/10 ring-2 ring-blue-900/[0.02] p-4 md:p-5'>
			{children}
		</div>
	)
}
