import { Switch } from '@headlessui/react'
import { Fragment, useState } from 'react'

interface Props {
	defaultChecked?: boolean
	onChange?: (isChecked: boolean) => void
}

export default function Toggle({ defaultChecked = false, onChange }: Props) {
	const [enabled, setEnabled] = useState(defaultChecked)

	return (
		<Switch
			checked={enabled}
			onChange={checked => {
				setEnabled(checked)
				onChange && onChange(checked)
			}}
			as={Fragment}
		>
			{({ checked }) => (
				<button
					className={`${
						checked ? 'bg-blue-500' : 'bg-gray-200'
					} relative inline-flex h-6 transition w-10 items-center rounded-full`}
				>
					<span
						className={`${
							checked ? 'translate-x-5' : 'translate-x-1'
						} inline-block h-4 w-4 transform rounded-full bg-white transition`}
					/>
				</button>
			)}
		</Switch>
	)
}
