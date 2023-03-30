import { Listbox, Transition } from '@headlessui/react'
import { ArrowDownIcon } from '../icons'

export interface Option<Value = any> {
	label: string
	value: Value
	[key: string]: any
}

interface Props {
	options: Option[]
	value: Option
	onChange: (option: Option) => void
}

export default function Select({ options, onChange, value }: Props) {
	return (
		<Listbox
			value={value}
			onChange={onChange}
			as='div'
			className='relative z-20'
		>
			<Listbox.Button className='py-2.5 px-6 bg-blue-50 font-medium rounded-[0.875rem] flex items-center'>
				{value.label}
				<ArrowDownIcon className='h-[1.125rem] ml-2' />
			</Listbox.Button>

			<Transition
				enter='duration-100 ease-out'
				enterFrom='-translate-y-3 opacity-0'
				enterTo='translate-y-0 opacity-100'
				leave='duration-75 ease-in'
				leaveFrom='translate-y-0 opacity-100'
				leaveTo='-translate-y-3 opacity-0'
			>
				<Listbox.Options className='absolute top-[calc(100%+0.5rem)] bg-white/[.98] rounded-2xl shadow-2xl p-2 min-w-[12rem] right-0 space-y-1 shadow-blue-900/25 transition ring-1 ring-blue-50/50'>
					{options.map((option, index) => (
						<Listbox.Option key={index} value={option}>
							{({ active }) => (
								<div
									className={`font-medium w-full px-5 py-2.5 transition rounded-xl cursor-pointer ${
										active && 'bg-blue-50'
									}`}
								>
									{option.label}
								</div>
							)}
						</Listbox.Option>
					))}
				</Listbox.Options>
			</Transition>
		</Listbox>
	)
}
