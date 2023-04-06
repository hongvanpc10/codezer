import { useState } from 'react'
import { useAuth } from '~/hooks'
import Avatar from '../avatar'
import Button from '../button'
import Editor from '../editor'
import Comment from './comment'



export default function Comments() {
	const { auth } = useAuth()
	const user = auth?.data

	const [isEdit, setIsEdit] = useState(false)

	return (
		<section className=''>
			<h2 id='comments' className='font-bold text-2xl'>
				Bình luận
			</h2>

			<div className='mt-10'>
				{user && (
					<div
						className={`flex ${
							isEdit ? 'items-start' : 'items-center'
						}`}
					>
						<Avatar alt='' size={9} src={user.avatar} />
						<form className='flex-1 ml-3'>
							{isEdit ? (
								<>
									<Editor
										view={{
											md: true,
											html: false,
											menu: true,
										}}
										height={300}
										autoFocus={true}
										placeholder='Viết bình luận của bạn tại đây...'
									/>
									<div className='flex mt-3 items-center justify-end space-x-3'>
										<Button
											small
											component='div'
											color='slate'
											onClick={() => setIsEdit(false)}
										>
											Hủy
										</Button>
										<Button small>Gửi</Button>
									</div>
								</>
							) : (
								<input
									onClick={() => setIsEdit(true)}
									placeholder='Viết bình luận của bạn'
									className='bg-blue-50/25 py-2.5 px-4 border-b border-blue-900/5 w-full'
								/>
							)}
						</form>
					</div>
				)}

				<div className='mt-16 space-y-5'>
					<Comment />
				</div>
			</div>
		</section>
	)
}
