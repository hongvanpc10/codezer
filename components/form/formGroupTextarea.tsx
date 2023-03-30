import { forwardRef, Ref } from 'react'
import { Props } from './formGroup'
import Label from './label'
import Textarea, { Props as TextareaProps } from './textarea'

export default forwardRef(function FormGroupTextarea(
	{ label, error, ...textareaProps }: Props<TextareaProps>,
	ref: Ref<HTMLTextAreaElement>
) {
	return (
		<div>
			<Label>{label}</Label>

			<Textarea {...textareaProps} ref={ref} />

			{error && (
				<span className='inline-block text-red-500 mt-0.5'>
					{error}
				</span>
			)}
		</div>
	)
})
