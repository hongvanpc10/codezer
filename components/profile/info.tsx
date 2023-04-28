import { ReactNode } from 'react'

interface Props {
	label: string
	value: ReactNode
}

export default function Info({ label, value }: Props) {
	return (
		<div className='flex items-center'>
			<label className='font-medium mr-2'>{label}:</label>
			{value}
		</div>
	)
}
