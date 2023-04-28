import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { usersService } from '~/apiServices'
import queryKeys from '~/config/queryKeys'
import routes from '~/config/routes'
import Avatar from '../avatar'
import { CoinIcon, CupIcon } from '../icons'
import Skeleton from '../skeleton'
import Heading from './heading'

export default function TopUsers() {
	const { data } = useQuery(queryKeys.topUsers, () =>
		usersService.getTopUsers()
	)

	return (
		<section>
			<Heading>Bảng xếp hạng</Heading>

			<ul className='bg-white p-3 rounded-2xl space-y-2 shadow-xl shadow-blue-900/5'>
				{data
					? data.map((user, index) => (
							<li
								key={index}
								className='flex items-center py-3.5 px-4 transition hover:bg-blue-50 rounded-2xl cursor-pointer'
							>
								{index < 3 ? (
									<CupIcon
										className={`h-6 mr-4 ${
											[
												'text-yellow-500',
												'text-zinc-300',
												'text-yellow-900',
											][index]
										}`}
									/>
								) : (
									<span className='w-6 mr-4 inline-flex justify-center text-xl font-semibold text-blue-800'>
										{index + 1}
									</span>
								)}

								<div className='flex items-center justify-between flex-1'>
									<Link
										href={routes.profile(user.slug)}
										className='flex items-center'
									>
										<Avatar
											alt=''
											src={user.avatar}
											isVerified={
												user.isVerified ||
												user.role === 'admin'
											}
											isAdmin={user.role === 'admin'}
										/>

										<h3 className='font-semibold ml-4'>
											{user.fullName}
										</h3>
									</Link>

									<span className='font-medium flex items-center'>
										{user.scores}
										<CoinIcon className='h-3.5 ml-1' />
									</span>
								</div>
							</li>
					  ))
					: Array.from(Array(3)).map((_, index) => (
							<li
								key={index}
								className='flex items-center py-3 px-4 transition hover:bg-blue-50 rounded-2xl cursor-pointer'
							>
								<CupIcon
									className={`h-6 mr-6 ${
										[
											'text-[#ffda49]',
											'text-[#d6d8d7]',
											'text-[#ab611f]',
										][index]
									}`}
								/>

								<div className='flex items-center justify-between flex-1'>
									<div className='flex items-center'>
										<Skeleton size={9} rounded='full' />
										<div className='ml-3.5'>
											<Skeleton.Text width={20} />
										</div>
									</div>

									<Skeleton.Text width={12} />
								</div>
							</li>
					  ))}
			</ul>
		</section>
	)
}
