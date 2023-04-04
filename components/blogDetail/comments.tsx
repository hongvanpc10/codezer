import { useAuth } from '~/hooks'
import Avatar from '../avatar'
import { useState } from 'react'
import Editor from '../editor'
import Button from '../button'
import images from '~/assets/images'
import Link from 'next/link'

export default function Comments() {
	const { auth } = useAuth()
	const user = auth?.data

	const [isEdit, setIsEdit] = useState(false)

	return (
		<section className=''>
			<h2 id='comments' className='font-bold text-2xl'>Bình luận</h2>

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

				<ul className='mt-16'>
					<li className='flex items-start'>
						<Link href='' className='mt-2'>
							<Avatar alt='' src={images.logo} />
						</Link>

						<div className='ml-3'>
							<div className='pt-2 pb-3 pl-4 pr-6 rounded-3xl bg-slate-100'>
								<Link href='' className='mb-2 inline-block'>
									<h3 className='font-medium'>Codezer</h3>
								</Link>

								<p className='!prose !prose-blue prose-img:rounded-2xl prose-video:rounded-2xl prose-img:mx-auto prose-a:underline-offset-2 prose-p:break-words prose-headings:break-words prose-a:break-words prose-pre:!rounded-2xl prose-td:!p-3 even:prose-tr:bg-blue-50 prose-th:!p-3 prose-tr:rounded-xl prose-tr:border-none prose-thead:bg-blue-100/75 prose-thead:rounded-xl prose-thead:border-none prose-table:border-separate first:prose-th:rounded-l-xl last:prose-th:rounded-r-xl first:prose-td:rounded-l-xl last:prose-td:rounded-r-xl prose-table:border-spacing-px prose-figcaption:text-center prose-figcaption:italic prose-figcaption:!mt-3 prose-pre:scroll-sm prose-blockquote:!not-italic prose-blockquote:!font-normal prose-blockquote:bg-blue-50/50 [&>*]:prose-blockquote:before:hidden [&>*]:prose-blockquote:after:hidden prose-blockquote:py-1 first:[&>*]:prose-blockquote:!mt-2 last:[&>*]:prose-blockquote:!mb-2 prose-blockquote:pr-4 prose-blockquote:rounded-r-2xl prose-th:!align-middle'>
									Nếu thấy hay hãy nhớ like và theo dõi.
								</p>
							</div>

							<div className='flex text-sm pl-4 text-blue-900/75 mt-1 items-center space-x-2'>
								<span>Thích</span>

								<div className='w-1 h-1 rounded-full bg-blue-500' />

								<span>Trả lời</span>

								<div className='w-1 h-1 rounded-full bg-blue-500' />

								<span>1 giờ trước</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</section>
	)
}
