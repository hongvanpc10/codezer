import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { usersService } from '~/apiServices'
import { User } from '~/apiServices/usersService'
import queryKeys from '~/config/queryKeys'
import routes from '~/config/routes'
import { useAuth } from '~/hooks'
import Avatar from '../avatar'
import Skeleton from '../skeleton'

const SuggestionItem = ({ data }: { data: User }) => {
	const { auth } = useAuth()
	const user = auth?.data
	const accessToken = auth?.accessToken

	const queryClient = useQueryClient()

	const { mutate: follow } = useMutation(
		(id: string) => usersService.follow(id, accessToken as string),
		{
			onMutate() {
				queryClient.setQueryData<User>(
					queryKeys.user(data.slug),
					oldData =>
						oldData && {
							...oldData,
							followers: [
								...oldData.followers,
								user?._id as string,
							],
						}
				)

				data &&
					queryClient.setQueryData<User>(
						queryKeys.user(user?.slug as string),
						oldData =>
							oldData && {
								...oldData,
								followings: [...oldData.followings, data?._id],
							}
					)

				queryClient.setQueryData<User[]>(
					queryKeys.suggestion(user?._id as string),
					oldData =>
						oldData && oldData.filter(user => user._id !== data._id)
				)
			},
		}
	)

	return (
		<li className='flex justify-between items-center py-3 rounded-2xl pl-4 pr-3 transition hover:bg-slate-50'>
			<Link
				href={routes.profile(data.slug)}
				className='flex items-center'
			>
				<Avatar
					noRing
					alt=''
					isAdmin={data.role === 'admin'}
					isVerified={data.isVerified}
					src={data.avatar}
				/>

				<div className='ml-2'>
					<h3 className='font-medium line-clamp-1 text-base leading-4'>
						{data.fullName}
					</h3>
					<span className='text-sm leading-[0.875rem]'>
						@{data.slug}
					</span>
				</div>
			</Link>

			<button
				onClick={() => follow(data._id)}
				className='px-1.5 py-0.5 text-xs rounded-md bg-blue-50'
			>
				Theo dõi
			</button>
		</li>
	)
}

SuggestionItem.Skeleton = function SuggestionItemSkeleton() {
	return (
		<li className='flex justify-between items-center py-3 rounded-2xl pl-4 pr-3 transition hover:bg-slate-50'>
			<div className='flex items-center'>
				<Skeleton size={9} rounded='full' />

				<div className='ml-2'>
					<Skeleton.Text leading={0} width={24} />
				</div>
			</div>

			<Skeleton.Text width={16} />
		</li>
	)
}

export default SuggestionItem
