import { FacebookCounter, FacebookSelector } from '@charkour/react-reactions'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { commentsService } from '~/apiServices'
import {
	CommentData,
	Comment as CommentType,
} from '~/apiServices/commentsService'
import { User } from '~/apiServices/usersService'
import routes from '~/config/routes'
import { useAuth, useRedirectToLogin } from '~/hooks'
import markdownToHTML from '~/utils/markdownToHTML'
import timeFromNow from '~/utils/timeFromNow'
import Avatar from './avatar'
import Button from './button'
import Dropdown from './dropdown'
import { FormGroupTextarea } from './form'
import { MoreIcon, ReturnIcon } from './icons'
import Modal from './modal'

interface Props {
	data: CommentType
}

export default function Comment({ data }: Props) {
	const [htmlContent, setHtmlContent] = useState('')

	const [showMore, setShowMore] = useState(false)

	const { auth } = useAuth()
	const user = auth?.data

	const redirectToLogin = useRedirectToLogin()

	const [onReply, setOnReply] = useState(false)
	const [showReply, setShowReply] = useState(1)

	useEffect(() => {
		const convert = async () => {
			const html = await markdownToHTML(
				(data.tag
					? `[@${data.tag.fullName}](${routes.profile(
							data.tag.slug
					  )})`
					: '') +
					(data.content.length > 200 && !showMore
						? data.content.slice(0, 200) + '...'
						: data.content)
			)
			setHtmlContent(html)
		}
		convert()
	}, [data.content, data.tag, showMore])

	return htmlContent ? (
		<div>
			<div className='items-start flex'>
				<Link href={routes.profile(data.author.slug)} className='mt-2'>
					<Avatar alt='' src={data.author.avatar} />
				</Link>

				<div className='ml-3 group/more'>
					<div className='pt-2 pb-3 pl-4 pr-6 rounded-3xl bg-slate-100'>
						<Link
							href={routes.profile(data.author.slug)}
							className='inline-block'
						>
							<h3 className='font-medium'>
								{data.author.fullName}
							</h3>
						</Link>

						<div
							className='!prose !prose-blue prose-img:rounded-2xl prose-video:rounded-2xl prose-img:mx-auto prose-a:underline-offset-2 prose-p:break-words prose-headings:break-words prose-a:break-words prose-pre:!rounded-2xl prose-td:!p-3 even:prose-tr:bg-blue-50 prose-th:!p-3 prose-tr:rounded-xl prose-tr:border-none prose-thead:bg-blue-100/75 prose-thead:rounded-xl prose-thead:border-none prose-table:border-separate first:prose-th:rounded-l-xl last:prose-th:rounded-r-xl first:prose-td:rounded-l-xl last:prose-td:rounded-r-xl prose-table:border-spacing-px prose-figcaption:text-center prose-figcaption:italic prose-figcaption:!mt-3 prose-pre:scroll-sm prose-blockquote:!not-italic prose-blockquote:!font-normal prose-blockquote:bg-blue-50/50 [&>*]:prose-blockquote:before:hidden [&>*]:prose-blockquote:after:hidden prose-blockquote:py-1 first:[&>*]:prose-blockquote:!mt-2 last:[&>*]:prose-blockquote:!mb-2 prose-blockquote:pr-4 prose-blockquote:rounded-r-2xl prose-th:!align-middle first:prose-a:!no-underline first:prose-a:!font-medium first:prose-a:!mr-2 prose-p:!my-1'
							dangerouslySetInnerHTML={{ __html: htmlContent }}
						></div>

						{data.content.length > 200 && (
							<div className='flex justify-center'>
								<button
									onClick={() => setShowMore(!showMore)}
									className='font-medium'
								>
									{showMore ? 'Ẩn bớt' : 'Xem thêm'}
								</button>
							</div>
						)}

						<div className='last:[&_div_div]:hidden flex justify-end -mr-3 -mb-0.5'>
							<FacebookCounter
								counters={data.reactions}
							/>
						</div>
					</div>

					<div className='flex items-center justify-between'>
						<div className='flex text-sm pl-4 text-blue-900/75 mt-1 items-center space-x-2'>
							<div className='relative group/reactions'>
								<button className=''>Thích</button>

								<div className='absolute hidden group-hover/reactions:block transition-all duration-300 opacity-0 group-hover/reactions:opacity-100 left-2 bottom-1/2 group-hover/reactions:bottom-full z-10'>
									<FacebookSelector
										iconSize={24}
										onSelect={key => {
											console.log(key)
										}}
									/>
								</div>
							</div>

							<div className='w-1 h-1 rounded-full bg-blue-500' />

							<button
								onClick={() => {
									if (!user) return redirectToLogin()

									setOnReply(true)
								}}
							>
								Trả lời
							</button>

							{onReply && (
								<Modal
									render={() => (
										<ReplyCommentModal
											commentId={data.parent || data._id}
											tag={data.author}
											setOnReply={setOnReply}
										/>
									)}
									onClose={() => setOnReply(false)}
									maxWidth='3xl'
								/>
							)}

							<div className='w-1 h-1 rounded-full bg-blue-500' />

							<span>{timeFromNow(data.createdAt)}</span>
						</div>

						{(user?.role === 'admin' || data.author._id === user?._id) && (
							<Dropdown
								items={[
									{
										label: 'Chỉnh sửa',
									},
									{
										label: 'Xóa',
									},
								]}
								top='0rem'
							>
								<button className='flex items-center justify-center group-hover/more:opacity-100 opacity-0 transition px-2 py-1 ml-4'>
									<MoreIcon className='h-5 text-blue-900/80' />
								</button>
							</Dropdown>
						)}
					</div>
				</div>
			</div>

			{data.children.length > 0 && (
				<div className='mt-4 pl-12 space-y-5'>
					{data.children.slice(0, showReply).map((data, index) => (
						<Comment data={data} key={index} />
					))}

					{showReply < data.children.length && (
						<button
							onClick={() => setShowReply(showReply + 4)}
							className='!mt-2 ml-14 flex items-center text-blue-900'
						>
							<ReturnIcon className='h-5 mr-2' />
							Xem thêm{' '}
							{Math.min(data.children.length - showReply, 4)} trả
							lời
						</button>
					)}
				</div>
			)}
		</div>
	) : null
}

interface ReplyCommentModalProps {
	setOnReply: Function
	tag: User
	commentId: string
}

function ReplyCommentModal({
	setOnReply,
	tag,
	commentId,
}: ReplyCommentModalProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ content: string }>()

	const { auth } = useAuth()
	const accessToken = auth?.accessToken as string

	const { mutate } = useMutation((data: CommentData) =>
		commentsService.reply(commentId, { ...data, tag: tag._id }, accessToken)
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
					required: 'Vui lòng nhập nội câu trả lời.',
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
