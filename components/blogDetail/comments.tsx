import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { commentsService } from '~/apiServices'
import { CommentData } from '~/apiServices/commentsService'
import { useAuth } from '~/hooks'
import Avatar from '../avatar'
import Button from '../button'
import Comments from '../comments'
import { FormGroupTextarea } from '../form'

interface Props {
	blogId: string
}

export default function BlogsComments({ blogId }: Props) {
	const { auth } = useAuth()
	const user = auth?.data

	const [onComment, setOnComment] = useState(false)

	return (
		<section className=''>
			<h2 id='comments' className='font-bold text-2xl'>
				Bình luận
			</h2>

			<div className='mt-10'>
				{user && (
					<div className='flex items-center'>
						<Avatar alt='' size={9} src={user.avatar} />
						<div className='flex-1 ml-3'>
							<input
								onClick={() => setOnComment(true)}
								placeholder='Viết bình luận của bạn'
								className='bg-blue-50/25 py-2.5 px-4 border-b border-blue-900/5 w-full'
							/>
						</div>
					</div>
				)}

				<div className='mt-16'>
					<Comments
						blogId={blogId}
						onComment={onComment}
						setOnComment={setOnComment}
					/>
				</div>
			</div>
		</section>
	)
}

interface CreateCommentProps {
	setOnComment: Function
	blogId: string
}

function CreateComment({ setOnComment, blogId }: CreateCommentProps) {
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
