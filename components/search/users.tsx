import { useInfiniteQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { searchService } from '~/apiServices'
import Avatar from '~/components/avatar'
import Box from '~/components/box'
import { TickIcon } from '~/components/icons'
import Loader from '~/components/loader'
import queryKeys from '~/config/queryKeys'
import routes from '~/config/routes'

export default function Users({ searchQuery }: { searchQuery: string }) {
	const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
		useInfiniteQuery(
			queryKeys.searchUsers(searchQuery, { limit: 10 }),
			({ pageParam = { limit: 10 } }) =>
				searchService.searchUsers(searchQuery, pageParam),
			{
				enabled: searchQuery.trim().length > 1,
				getNextPageParam(lastPage) {
					if (
						(lastPage?.pagination.currentPage as number) <
						(lastPage?.pagination.totalPages as number)
					)
						return {
							limit: 10,
							page:
								(lastPage?.pagination.currentPage as number) +
								1,
						}
				},
			}
		)

	return (
		<>
			{data && data.pages[0] && data.pages[0].users.length > 0 && (
				<section>
					<h2 className='text-xl font-semibold mb-8'>Tác giả</h2>

					<Box>
						<div className='space-y-4'>
							{data.pages[0].users.map((user, index) => (
								<Link
									key={index}
									href={routes.profile(user.slug)}
									className='flex items-center justify-between rounded-3xl py-4 px-6 transition hover:bg-blue-50/50'
								>
									<div className='flex items-center'>
										<Avatar
											size={9}
											alt=''
											src={user.avatar}
										/>

										<div className='ml-4'>
											<h4 className='font-semibold flex items-center'>
												{user.fullName}
												{(user.role === 'admin' ||
													user.isVerified) && (
													<TickIcon className='h-5 ml-2 text-sky-500' />
												)}
											</h4>

											<span>@{user.slug}</span>
										</div>
									</div>

									<span className='font-medium'>
										{user.scores}
									</span>
								</Link>
							))}
						</div>

						{hasNextPage && !isFetchingNextPage && (
							<div className='flex justify-center mt-6'>
								<button
									onClick={() => fetchNextPage()}
									className='text-blue-500 font-medium'
								>
									Xem thêm
								</button>
							</div>
						)}

						{isFetching && <Loader.Inline />}
					</Box>
				</section>
			)}
		</>
	)
}
