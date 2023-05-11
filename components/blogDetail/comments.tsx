import { useState } from 'react'
import { useAuth, useRedirectToLogin } from '~/hooks'
import Avatar from '../avatar'
import Comments from '../comments'

interface Props {
	blogId: string
	authorId: string
}

export default function BlogsComments({ blogId ,authorId}: Props) {
	const { auth } = useAuth()
	const user = auth?.data

	const [onComment, setOnComment] = useState(false)

	const redirectToLogin = useRedirectToLogin()

	return (
		<section className=''>
			<h2 id='comments' className='font-bold text-2xl'>
				Bình luận
			</h2>

			<div className='mt-10'>
				{user ? (
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
				) : (
					<p className='text-lg px-6 -mt-4 text-blue-900 rounded-2xl py-4 bg-blue-50/75'>
						Vui lòng{' '}
						<button
							onClick={redirectToLogin}
							className='text-blue-500 font-medium underline'
						>
							đăng nhập
						</button>{' '}
						để bình luận bài viết.
					</p>
				)}

				<div className='mt-16 px-1'>
					<Comments
						blogId={blogId}
						onComment={onComment}
						setOnComment={setOnComment}
						authorId={authorId}
					/>
				</div>
			</div>
		</section>
	)
}
