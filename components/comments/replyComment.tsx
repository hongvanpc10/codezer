import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { commentsService } from '~/apiServices'
import { CommentData } from '~/apiServices/commentsService'
import { User } from '~/apiServices/usersService'
import routes from '~/config/routes'
import { useAuth } from '~/hooks'
import Button from '../button'
import FormGroupTextarea from '../form/formGroupTextarea'

export interface Props {
	setOnReply: Function
	tag: User
	commentId: string
}

export default function ReplyComment({ setOnReply, tag, commentId }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ content: string }>()

	const { auth } = useAuth()
	const accessToken = auth?.accessToken as string

	const { mutate } = useMutation(
		(data: CommentData) =>
			commentsService.reply(
				commentId,
				{ ...data, tag: tag._id },
				accessToken
			),
		{
			onSuccess() {
				setOnReply(false)
			},
		}
	)

	const onSubmit = handleSubmit(data => {
		mutate(data)
	})

	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-xl mb-6 font-bold'>
				Trả lời bình luận của{' '}
				<Link href={routes.profile(tag.slug)} className='text-blue-500'>
					@{tag.fullName}
				</Link>
			</h2>

			<FormGroupTextarea
				{...register('content', {
					required: 'Vui lòng nhập nội dung câu trả lời.',
				})}
				autoFocus
				maxLength={1000}
				label=''
				placeholder={`Trả lời bình luận của ${tag.fullName} tại đây...`}
				error={errors.content?.message}
			/>

			<div className='flex mt-6 items-center justify-end space-x-3'>
				<Button
					component='div'
					color='slate'
					onClick={() => setOnReply(false)}
				>
					Hủy
				</Button>
				<Button>Gửi</Button>
			</div>
		</form>
	)
}
