import { useQuery } from '@tanstack/react-query'
import { usersService } from '~/apiServices'
import queryKeys from '~/config/queryKeys'
import { useAuth } from '~/hooks'
import SuggestionItem from './suggestionItem'

export default function Suggestion() {
	const { auth } = useAuth()
	const user = auth?.data
	const accessToken = auth?.accessToken

	const { data, isLoading } = useQuery(
		queryKeys.suggestion(user?._id as string),
		() => usersService.getSuggestion(accessToken as string)
	)

	return (
		<div className='bg-white px-2 py-4 rounded-3xl shadow-xl shadow-blue-900/5'>
			<h2 className='ml-4 text-lg font-medium'>Đề cử</h2>
			<ul className='space-y-1 mt-3'>
				{data &&
					data.map((user, index) => (
						<SuggestionItem data={user} key={index} />
					))}

				{isLoading	 &&
					Array.from(Array(5)).map((_, i) => (
						<SuggestionItem.Skeleton key={i} />
					))}
			</ul>
		</div>
	)
}
