import { SearchIcon } from '../icons'

export default function Search() {
	return (
		<div className='overflow-hidden flex bg-blue-50/50 w-96 rounded-2xl focus-within:ring-2 focus-within:ring-blue-500/75 focus-within:ring-offset-1'>
			<button className='pl-3.5 pr-2.5 py-2 text-blue-900/75'>
				<SearchIcon className='h-5' />
			</button>

			<input
				className='bg-transparent py-2 input flex-1 pr-4'
				placeholder='Tìm kiếm bài viết, tác giả'
				spellCheck={false}
			/>
		</div>
	)
}
