import rehypeEmbed from '@hongvanpc10/rehype-embed'
import rehypeTOC from '@jsdevtools/rehype-toc'
import rehypePrism from '@mapbox/rehype-prism'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import rehypeVideo from 'rehype-video'
import {
	extendedTableHandlers,
	remarkExtendedTable,
} from 'remark-extended-table'
import remarkGfm from 'remark-gfm'
import remarkParser from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
const rehypeFigure = require('rehype-figure')

interface Options {
	toc?: boolean
}

export default async function markdownToHTML(md: string, options?: Options) {
	const professor = unified()
		.use(remarkParser)
		.use(remarkGfm)
		.use(remarkExtendedTable)
		.use(remarkRehype, null, {
			handlers: Object.assign({}, extendedTableHandlers as any),
		})
		.use(rehypeExternalLinks, { target: '_blank', rel: 'noopener' })
		.use(rehypeFigure)
		.use(rehypeEmbed)
		.use(rehypeVideo, { details: false })
		.use(rehypeStringify)
		.use(rehypePrism, { ignoreMissing: true })

	options?.toc &&
		professor
			.use(rehypeSlug)
			.use(rehypeAutolinkHeadings)
			.use(rehypeTOC, {
				headings: ['h2', 'h3', 'h4'],
				cssClasses: {
					toc: 'toc not-prose',
				},
			})

	const file = await professor.process(md)

	return `${file.value}`.replaceAll(
		/#[a-z0-9_]+/gi,
		tag =>
			`<a class="!no-underline !font-normal" href="" target="_blank">${tag}</a>`
	)
}
