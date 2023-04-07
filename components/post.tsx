import { CounterObject, FacebookCounter } from '@charkour/react-reactions'
import Link from 'next/link'
import { useEffect, useState } from 'react'
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
import Image from './image'

interface Props {
	author: { name: string; avatar: string; slug: string }
	createdAt: string
	content: string
	image: string
	reacts: CounterObject[]
	commentsCount: number
}

export default function Post({
	author,
	commentsCount,
	content,
	createdAt,
	image,
	reacts,
}: Props) {
	const [htmlContent, setHtmlContent] = useState(content)

	const { auth } = useAuth()
	const user = auth?.data

	useEffect(() => {
		async function convert() {
			const _html = await markdownToHTML(content)
			setHtmlContent(_html)
		}

		convert()
	}, [content])

	return user ? (
		<div className='bg-white/90 rounded-3xl px-3 pt-6 pb-4 shadow-lg shadow-blue-900/5'>
			<div className='flex items-center px-2'>
				<Link href={''}>
					<Avatar src={author.avatar} alt='' ringWidth={0} size={9} />
				</Link>

				<div className='ml-3'>
					<Link href={''}>
						<h3 className='font-semibold leading-5 flex items-center'>
							{author.name}
							<TickIcon className='h-[1.125rem] text-sky-500 ml-1' />
						</h3>
						<span className='text-sm'>
							{timeFromNow(createdAt)}
						</span>
					</Link>
				</div>
			</div>

			<p
				className='px-2 !prose !prose-blue prose-img:rounded-2xl prose-video:rounded-2xl prose-img:mx-auto prose-a:underline-offset-2 prose-p:break-words prose-headings:break-words prose-a:break-words prose-pre:!rounded-2xl prose-td:!p-3 even:prose-tr:bg-blue-50 prose-th:!p-3 prose-tr:rounded-xl prose-tr:border-none prose-thead:bg-blue-100/75 prose-thead:rounded-xl prose-thead:border-none prose-table:border-separate first:prose-th:rounded-l-xl last:prose-th:rounded-r-xl first:prose-td:rounded-l-xl last:prose-td:rounded-r-xl prose-table:border-spacing-px prose-figcaption:text-center prose-figcaption:italic prose-figcaption:!mt-3 prose-pre:scroll-sm prose-blockquote:!not-italic prose-blockquote:!font-normal prose-blockquote:bg-blue-50/50 [&>*]:prose-blockquote:before:hidden [&>*]:prose-blockquote:after:hidden prose-blockquote:py-1 first:[&>*]:prose-blockquote:!mt-2 last:[&>*]:prose-blockquote:!mb-2 prose-blockquote:pr-4 prose-blockquote:rounded-r-2xl prose-th:!align-middle mt-3 mb-4 prose-p:!my-2'
				dangerouslySetInnerHTML={{ __html: htmlContent }}
			></p>

			<div>
				<Image alt='' src={image} ratio={[16, 14]} rounded='xl' />
			</div>

			<div className='flex py-2 items-center justify-between text-sm px-2'>
				<div className='last:[&_div_div]:hidden flex items-center'>
					<FacebookCounter counters={reacts} />

					<span className='ml-2'>{reacts.length}</span>
				</div>

				<div>{commentsCount} bình luận</div>
			</div>

			<div className='flex items-center border-y py-1.5 border-blue-900/5'>
				<button className='flex items-center justify-center mx-1 rounded-xl transition hover:bg-slate-50 py-2 flex-1'>
					<LikeIcon className='h-6' />
				</button>
				<button className='flex items-center justify-center mx-1 rounded-xl transition hover:bg-slate-50 py-2 flex-1'>
					<SmsOutlineIcon className='h-6' />
				</button>
			</div>

			<div className='flex items-center pt-3'>
				<Avatar alt='' src={user.avatar} ringWidth={0} />
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
