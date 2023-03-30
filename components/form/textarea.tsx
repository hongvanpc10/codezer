import {
	ChangeEventHandler,
	FocusEventHandler,
	forwardRef,
	LegacyRef,
} from 'react'

export interface Props {
	placeholder?: string
	autoFocus?: boolean
	name?: string
	onChange?: ChangeEventHandler<HTMLTextAreaElement>
	onBlur?: FocusEventHandler<HTMLTextAreaElement>
	rows?: number
	maxLength?: number
	defaultValue?: string
}

export default forwardRef(function Textarea(
	{
		autoFocus,
		placeholder,
		name,
		onBlur,
		onChange,
		rows = 5,
		maxLength,
		defaultValue,
	}: Props,
	ref: LegacyRef<HTMLTextAreaElement>
) {
	return (
		<textarea
			className='w-full px-4 py-3 focus:ring-2 focus:ring-blue-500/75 focus:ring-offset-1 bg-blue-100/50 rounded-[0.875rem] input'
			autoFocus={autoFocus}
			placeholder={placeholder}
			name={name}
			onBlur={onBlur}
			onChange={onChange}
			ref={ref}
			rows={rows}
			maxLength={maxLength}
			spellCheck={false}
			defaultValue={defaultValue}
		/>
	)
})
