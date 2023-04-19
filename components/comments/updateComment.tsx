import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { commentsService } from '~/apiServices'
import { Comment, CommentData } from '~/apiServices/commentsService'
import { useAuth } from '~/hooks'
import Button from '../button'
import { FormGroupTextarea } from '../form'

interface Props {
	setOnUpdate: Function
	comment: Comment
}

export default function UpdateComment({ setOnUpdate, comment }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ content: string }>({
		defaultValues: { content: comment.content },
	})

	const { auth } = useAuth()
	const accessToken = auth?.accessToken as string

	const { mutate } = useMutation(
		(data: CommentData) =>
			commentsService.update(comment._id, data, accessToken),
		{
			onSuccess() {
				setOnUpdate(false)
			},
		}
	)

	const onSubmit = handleSubmit(data => {
		mutate(data)
	})

	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-xl mb-6 font-bold'>Chỉnh sửa bình luận</h2>

			<FormGroupTextarea
				{...register('content', {
					required: 'Vui lòng nhập nội dung bình luận.',
				})}
				autoFocus
				maxLength={1000}
				label=''
				placeholder={`Nhập bình luận mới của bạn`}
				error={errors.content?.message}
			/>

			<div className='flex mt-6 items-center justify-end space-x-3'>
				<Button
					component='div'
					color='slate'
					onClick={() => setOnUpdate(false)}
				>
					Hủy
				</Button>
				<Button>Sửa</Button>
			</div>
		</form>
	)
}
