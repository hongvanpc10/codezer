import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { commentsService } from "~/apiServices"
import { CommentData } from "~/apiServices/commentsService"
import { useAuth } from "~/hooks"
import { FormGroupTextarea } from "../form"
import Button from "../button"

 interface Props {
	setOnComment: Function
	blogId: string
}

export default function CreateComment({ setOnComment, blogId }: Props) {
	const { auth } = useAuth()
	const accessToken = auth?.accessToken as string

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ content: string }>()

	const { mutate } = useMutation(
		(data: CommentData) =>
			commentsService.create(blogId, data, accessToken),
		{
			onSuccess() {
				setOnComment(false)
			},
		}
	)

	const onSubmit = handleSubmit(data => {
		mutate(data)
	})

	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-xl mb-6 font-bold'>Viết bình luận</h2>

			<FormGroupTextarea
				{...register('content', {
					required: 'Vui lòng nhập nội dung bình luận.',
				})}
				autoFocus
				maxLength={1000}
				label=''
				placeholder='Viết bình luận của bạn tại đây...'
				error={errors.content?.message}
			/>

			<div className='flex mt-6 items-center justify-end space-x-3'>
				<Button
					component='div'
					color='slate'
					onClick={() => setOnComment(false)}
				>
					Hủy
				</Button>
				<Button>Gửi</Button>
			</div>
		</form>
	)
}