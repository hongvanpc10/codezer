import { FacebookCounter, FacebookSelector } from '@charkour/react-reactions'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Comment as CommentType } from '~/apiServices/commentsService'
import routes from '~/config/routes'
import markdownToHTML from '~/utils/markdownToHTML'
import timeFromNow from '~/utils/timeFromNow'
import Avatar from './avatar'
import { MoreIcon } from './icons'
import Dropdown from './dropdown'

interface Props {
	data: CommentType
}

export default function Comment({ data }: Props) {
	const [htmlContent, setHtmlContent] = useState('')

	const [showMore, setShowMore] = useState(false)

	useEffect(() => {
		const convert = async () => {
			const html = await markdownToHTML(
				data.content.length > 200 && !showMore
					? data.content.slice(0, 200) + '...'
					: data.content
			)
			setHtmlContent(html)
		}
		convert()
	}, [data.content, showMore])

	return htmlContent ? (
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
						<h3 className='font-medium'>{data.author.fullName}</h3>
					</Link>

					<p
						className='!prose !prose-blue prose-img:rounded-2xl prose-video:rounded-2xl prose-img:mx-auto prose-a:underline-offset-2 prose-p:break-words prose-headings:break-words prose-a:break-words prose-pre:!rounded-2xl prose-td:!p-3 even:prose-tr:bg-blue-50 prose-th:!p-3 prose-tr:rounded-xl prose-tr:border-none prose-thead:bg-blue-100/75 prose-thead:rounded-xl prose-thead:border-none prose-table:border-separate first:prose-th:rounded-l-xl last:prose-th:rounded-r-xl first:prose-td:rounded-l-xl last:prose-td:rounded-r-xl prose-table:border-spacing-px prose-figcaption:text-center prose-figcaption:italic prose-figcaption:!mt-3 prose-pre:scroll-sm prose-blockquote:!not-italic prose-blockquote:!font-normal prose-blockquote:bg-blue-50/50 [&>*]:prose-blockquote:before:hidden [&>*]:prose-blockquote:after:hidden prose-blockquote:py-1 first:[&>*]:prose-blockquote:!mt-2 last:[&>*]:prose-blockquote:!mb-2 prose-blockquote:pr-4 prose-blockquote:rounded-r-2xl prose-th:!align-middle prose-p:!my-1'
						dangerouslySetInnerHTML={{ __html: htmlContent }}
					></p>

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
							counters={[{ by: 'Codezer', emoji: 'like' }]}
						/>
					</div>
				</div>

				<div className='flex items-center justify-between'>
					<div className='flex text-sm pl-4 text-blue-900/75 mt-1 items-center space-x-2'>
						<div className='relative group/reactions'>
							<button>Thích</button>

							<div className='absolute hidden group-hover/reactions:block transition-all duration-300 opacity-0 group-hover/reactions:opacity-100 left-2 bottom-1/2 group-hover/reactions:bottom-full z-10'>
								<FacebookSelector iconSize={24} />
							</div>
						</div>

						<div className='w-1 h-1 rounded-full bg-blue-500' />

						<span>Trả lời</span>

						<div className='w-1 h-1 rounded-full bg-blue-500' />

						<span>{timeFromNow(data.createdAt)}</span>
					</div>

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
				</div>
			</div>
		</div>
	) : null
}
