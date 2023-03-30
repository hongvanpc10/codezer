import { forwardRef, Ref } from 'react'
import Input, { Props as InputProps } from './input'
import Label from './label'

export type Props<P> = P & {
	label: string
	error?: string
}

export default forwardRef(function FormGroup(
	{ label, error, ...inputProps }: Props<InputProps>,
	ref: Ref<HTMLInputElement>
) {
	return (
		<div>
			<Label>{label}</Label>

			<Input {...inputProps} ref={ref} />

			{error && (
				<span className='inline-block text-red-500 mt-0.5'>
					{error}
				</span>
			)}
		</div>
	)
})
