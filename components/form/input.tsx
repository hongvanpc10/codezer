import {
	ChangeEventHandler,
	FocusEventHandler,
	forwardRef,
	LegacyRef,
	useId,
} from 'react'
import { Icon } from '../icons'

export interface Props {
	placeholder?: string
	autoFocus?: boolean
	icon?: Icon
	type?: 'text' | 'password' | 'email'
	name?: string
	onChange?: ChangeEventHandler<HTMLInputElement>
	onBlur?: FocusEventHandler<HTMLInputElement>
	maxLength?: number
	defaultValue?: string
	value?: string
}

export default forwardRef(function Input(
	{
		autoFocus,
		icon,
		placeholder,
		type,
		name,
		onBlur,
		onChange,
		maxLength,
		defaultValue,
		value,
	}: Props,
	ref: LegacyRef<HTMLInputElement>
) {
	const Icon = icon

	const id = useId()

	return (
		<div className='w-full focus-within:ring-2 focus-within:ring-blue-500/75 focus-within:ring-offset-1 bg-blue-100/50 flex rounded-[0.875rem] items-center'>
			{Icon && (
				<label htmlFor={id} className='py-[0.625rem] pl-4 pr-2.5'>
					<Icon className='h-6 text-blue-900/50' />
				</label>
			)}

			<input
				spellCheck={false}
				autoFocus={autoFocus}
				placeholder={placeholder}
				className={`flex-1 bg-transparent py-2.5 ${
					!icon && 'pl-4'
				} input pr-4`}
				type={type}
				id={id}
				ref={ref}
				name={name}
				onBlur={onBlur}
				autoComplete='off'
				onChange={onChange}
				maxLength={maxLength}
				defaultValue={defaultValue}
				value={value}
			/>
		</div>
	)
})
