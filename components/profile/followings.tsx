import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { usersService } from '~/apiServices'
import { User } from '~/apiServices/usersService'
import queryKeys from '~/config/queryKeys'
import routes from '~/config/routes'
import { useAuth, useInView } from '~/hooks'
import Avatar from '../avatar'
import { MoreIcon } from '../icons'
import { useEffect } from 'react'
import Skeleton from '../skeleton'
import queryClient from '~/config/queryClient'

export default function Followings() {
	const { auth } = useAuth()
	const user = auth?.data

	const { inView, ref } = useInView()

	const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } =
		useInfiniteQuery(
			queryKeys.followings(user?._id as string),
			({ pageParam = { limit: 10 } }) =>
				usersService.getFollowings(
					auth?.accessToken as string,
					pageParam
				),
			{
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

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage()
		}
	}, [fetchNextPage, hasNextPage, inView, isFetchingNextPage])

	return (
		<div>
			<div className='row gutter-sm'>
				{data &&
					data.pages
						.map(page => page?.users as User[])
						.flat()
						.map((user, index) => (
							<div key={index} className='sm:col-6 col-12'>
								<Link
									className='bg-white/90 justify-between flex items-center pl-4 pr-6 py-5 shadow-lg shadow-blue-900/[0.02] rounded-2xl'
									href={routes.profile(user.slug)}
								>
									<div className='flex items-center'>
										<Avatar
											alt=''
											src={user.avatar}
											noRing
											size={16}
										/>

										<div className='ml-3'>
											<h3 className='font-semibold'>
												{user.fullName}
											</h3>

											<span>@{user.slug}</span>
										</div>
									</div>

									<button>
										<MoreIcon className='h-5' />
									</button>
								</Link>
							</div>
						))}

				{(isFetching || isFetchingNextPage) &&
					Array.from(Array(6)).map((_, i) => (
						<div key={i} className='sm:col-6 col-12'>
							<div className='bg-white/90 justify-between flex items-center pl-4 pr-6 py-5 shadow-lg shadow-blue-900/[0.02] rounded-2xl'>
								<div className='flex items-center'>
									<Skeleton size={16} rounded='full' />

									<div className='ml-3'>
										<Skeleton.Text width={28} />

										<Skeleton.Text width={24} />
									</div>
								</div>

								<Skeleton height={3} rounded='full' width={7} />
							</div>
						</div>
					))}
			</div>

			<div ref={ref} className='mt-16' />
		</div>
	)
}
