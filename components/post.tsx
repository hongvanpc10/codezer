import { FacebookCounter } from '@charkour/react-reactions'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Post as PostType } from '~/apiServices/postsServices'
import { useAuth } from '~/hooks'
import markdownToHTML from '~/utils/markdownToHTML'
import timeFromNow from '~/utils/timeFromNow'
import Avatar from './avatar'
import {
	CameraOutlineIcon,
	LikeIcon,
	SendIcon,
	SmsOutlineIcon,
	TickIcon,
} from './icons'
import ImagesGrid from './imagesGrid'
import routes from '~/config/routes'

interface Props {
	data: PostType
}

export default function Post({ data }: Props) {
	const [htmlContent, setHtmlContent] = useState(data.content)

	const { auth } = useAuth()
	const user = auth?.data

	useEffect(() => {
		async function convert() {
			const _html = await markdownToHTML(data.content)
			setHtmlContent(_html)
		}

		convert()
	}, [data.content])

	return user ? (
		<div className='bg-white/90 rounded-3xl px-3 pt-6 pb-4 shadow-lg shadow-blue-900/5'>
			<div className='flex items-center px-2'>
				<Link href={routes.profile(data.author.slug)}>
					<Avatar src={data.author.avatar} alt='' noRing size={9} />
				</Link>

				<div className='ml-3'>
					<Link href={routes.profile(data.author.slug)}>
						<h3 className='font-semibold leading-5 flex items-center'>
							{data.author.fullName}
							{(data.author.isVerified ||
								data.author.role === 'admin') && (
								<TickIcon className='h-[1.125rem] text-sky-500 ml-1' />
							)}
						</h3>
						<span className='text-sm'>
							{timeFromNow(data.createdAt, true)}
						</span>
					</Link>
				</div>
			</div>

			<p
				className={`px-2 !prose !prose-blue prose-img:rounded-2xl prose-video:rounded-2xl prose-img:mx-auto prose-a:underline-offset-2 prose-p:break-words prose-headings:break-words prose-a:break-words prose-pre:!rounded-2xl prose-td:!p-3 even:prose-tr:bg-blue-50 prose-th:!p-3 prose-tr:rounded-xl prose-tr:border-none prose-thead:bg-blue-100/75 prose-thead:rounded-xl prose-thead:border-none prose-table:border-separate first:prose-th:rounded-l-xl last:prose-th:rounded-r-xl first:prose-td:rounded-l-xl last:prose-td:rounded-r-xl prose-table:border-spacing-px prose-figcaption:text-center prose-figcaption:italic prose-figcaption:!mt-3 prose-pre:scroll-sm prose-blockquote:!not-italic prose-blockquote:!font-normal prose-blockquote:bg-blue-50/50 [&>*]:prose-blockquote:before:hidden [&>*]:prose-blockquote:after:hidden prose-blockquote:py-1 first:[&>*]:prose-blockquote:!mt-2 last:[&>*]:prose-blockquote:!mb-2 prose-blockquote:pr-4 prose-blockquote:rounded-r-2xl prose-th:!align-middle mt-3 mb-4 prose-p:!my-2 ${
					data.images.length === 0 &&
					(data.content.trim().length < 50
						? '!prose-2xl'
						: '!prose-lg')
				}`}
				dangerouslySetInnerHTML={{ __html: htmlContent }}
			></p>

			<ImagesGrid images={data.images} />

			<div className='flex pb-2.5 pt-3 items-center justify-between text-sm px-2'>
				<div className='last:[&_div_div]:hidden flex items-center'>
					{data.reactions.length > 0 && (
						<FacebookCounter counters={data.reactions} />
					)}

					<span className='ml-2'>
						{data.reactions.length +
							(data.reactions.length === 0 ? ' lượt thích' : '')}
					</span>
				</div>

				<div>0 bình luận</div>
			</div>

			<div className='flex items-center border-y py-1.5 border-blue-900/5'>
				<button className='flex items-center justify-center mx-1 rounded-xl transition hover:bg-slate-50 py-2 flex-1 font-medium'>
					<LikeIcon className='h-6 mr-3' />
					Thích
				</button>
				<button className='flex items-center justify-center mx-1 rounded-xl transition hover:bg-slate-50 py-2 flex-1 font-medium'>
					<SmsOutlineIcon className='h-6 mr-3' />
					Bình luận
				</button>
			</div>

			<div className='flex items-center pt-3'>
				<Avatar alt='' src={user.avatar} noRing />
				<form className='flex relative flex-1 items-center'>
					<input
						placeholder='Viết bình luận của bạn...'
						className='w-full py-2 px-6 bg-blue-50/50 rounded-full ml-2 placeholder:text-blue-900/50'
					/>

					<div className='absolute flex items-center right-3 space-x-2 text-blue-900/60'>
						<button>
							<CameraOutlineIcon className='h-5' />
						</button>
						<button>
							<SendIcon className='h-5' />
						</button>
					</div>
				</form>
			</div>
		</div>
	) : null
}
