import { memo, useEffect, useState } from 'react'
import images from '~/assets/images'
import pattern from '~/config/pattern'
import routes from '~/config/routes'
import markdownToHTML from '~/utils/markdownToHTML'
import randomInteger from '~/utils/randInt'

export default memo(function Content({
	content,
	imagesLength,
}: {
	content: string
	imagesLength: number
}) {
	const [htmlContent, setHtmlContent] = useState(content)
	const [viewMore, setViewMore] = useState(false)

	useEffect(() => {
		async function convert() {
			const _html = await markdownToHTML(
				content.length > 255
					? viewMore
						? content
						: content.slice(0, 255) + '...'
					: content
			)
			setHtmlContent(
				_html.replaceAll(
					pattern.hashtag,
					tag =>
						`<a class="!no-underline !font-normal" href="${routes.postsByTag(
							tag.slice(1)
						)}">${tag}</a>`
				)
			)
		}

		convert()
	}, [content, viewMore])

	return (
		<div
			className={`${
				imagesLength === 0 && content.trim().length < 100
					? 'aspect-w-14 aspect-h-9 rounded-xl mt-4'
					: 'mb-4 mt-3'
			} sm:px-2 px-1`}
			style={{
				backgroundImage:
					imagesLength === 0 && content.trim().length < 100
						? `url(${
								images.postsBackgrounds[
									randomInteger(
										0,
										images.postsBackgrounds.length - 1
									)
								].default.src
						  })`
						: '',
			}}
		>
			<div
				className={`${
					imagesLength === 0 &&
					content.trim().length < 100 &&
					'flex items-center px-4 justify-center'
				}`}
			>
				<p
					className={`!prose !prose-blue prose-img:rounded-2xl prose-video:rounded-2xl prose-img:mx-auto prose-a:underline-offset-2 prose-p:break-words prose-headings:break-words prose-a:break-words prose-pre:!rounded-2xl prose-td:!p-3 even:prose-tr:bg-blue-50 prose-th:!p-3 prose-tr:rounded-xl prose-tr:border-none prose-thead:bg-blue-100/75 prose-thead:rounded-xl prose-thead:border-none prose-table:border-separate first:prose-th:rounded-l-xl last:prose-th:rounded-r-xl first:prose-td:rounded-l-xl last:prose-td:rounded-r-xl prose-table:border-spacing-px prose-figcaption:text-center prose-figcaption:italic prose-figcaption:!mt-3 prose-pre:scroll-sm prose-blockquote:!not-italic prose-blockquote:!font-normal prose-blockquote:bg-blue-50/50 [&>*]:prose-blockquote:before:hidden [&>*]:prose-blockquote:after:hidden prose-blockquote:py-1 first:[&>*]:prose-blockquote:!mt-2 last:[&>*]:prose-blockquote:!mb-2 prose-blockquote:pr-4 prose-blockquote:rounded-r-2xl prose-video:mx-auto prose-th:!align-middle prose-p:!my-2 ${
						imagesLength === 0 &&
						(content.trim().length < 100
							? '!prose-2xl text-center !text-white'
							: '!prose-lg')
					}`}
					dangerouslySetInnerHTML={{
						__html:
							content.length > 255 && !viewMore
								? htmlContent.slice(0, -4) +
								  '<button class="font-medium ml-1" >Xem thêm</button>'
								: htmlContent,
					}}
					onClick={() => {
						content.length > 255 && !viewMore && setViewMore(true)
					}}
				></p>
			</div>
		</div>
	)
})
