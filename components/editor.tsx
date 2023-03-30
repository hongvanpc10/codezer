import { useRef } from 'react'
import MdEditor, { Plugins } from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import markdownToHTML from '~/utils/markdownToHTML'

interface Props {
	placeholder?: string
	onChange?: (text: string) => void
	defaultValue?: string
}

MdEditor.use(Plugins.TabInsert)

export default function Editor({ placeholder, onChange, defaultValue }: Props) {
	const editorRef = useRef(null)

	async function handleChange({ text }: { text: string }) {
		onChange && onChange(text)
	}

	return (
		<MdEditor
			style={{ height: '500px' }}
			renderHTML={async text => {
				const html = await markdownToHTML(text)
				return html
			}}
			placeholder={placeholder}
			htmlClass='!prose-blue !prose mx-auto prose-img:rounded-2xl prose-img:mx-auto prose-a:underline-offset-2 prose-p:break-words prose-a:break-words prose-headings:break-words prose-pre:!rounded-2xl prose-td:!p-3 even:prose-tr:bg-blue-50 prose-th:!p-3 prose-tr:rounded-xl prose-tr:border-none prose-thead:bg-blue-100/75 prose-thead:rounded-xl prose-thead:border-none prose-table:border-separate first:prose-th:rounded-l-xl last:prose-th:rounded-r-xl first:prose-td:rounded-l-xl last:prose-td:rounded-r-xl prose-table:border-spacing-px rose-figcaption:text-center prose-figcaption:italic prose-figcaption:!mt-3 prose-video:rounded-2xl prose-pre:scroll-sm'
			markdownClass='!prose-blue !prose mx-auto'
			shortcuts
			ref={editorRef}
			onChange={handleChange}
			defaultValue={defaultValue}
		/>
	)
}
