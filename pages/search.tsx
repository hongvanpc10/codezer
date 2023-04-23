import { useInfiniteQuery } from '@tanstack/react-query'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { searchService } from '~/apiServices'
import { Blog } from '~/apiServices/blogsService'
import Avatar from '~/components/avatar'
import { BlogCardHorizontal } from '~/components/blogCard'
import Box from '~/components/box'
import Button from '~/components/button'
import { Input } from '~/components/form'
import { TickIcon } from '~/components/icons'
import Loader from '~/components/loader'
import { Select } from '~/components/select'
import queryKeys from '~/config/queryKeys'
import routes from '~/config/routes'
import { useSort } from '~/hooks'

const Search = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [inputValue, setInputValue] = useState('')

	const { sort, sortOptions } = useSort()

	const router = useRouter()

	const blogsQuery = useInfiniteQuery(
		queryKeys.searchBlogs(searchQuery, { ...sort.value, limit: 6 }),
		({ pageParam = { limit: 6 } }) =>
			searchService.searchBlogs(searchQuery, {
				...pageParam,
				...sort.value,
			}),
		{
			enabled: searchQuery.trim().length > 1,
			getNextPageParam(lastPage) {
				if (
					(lastPage?.pagination.currentPage as number) <
					(lastPage?.pagination.totalPages as number)
				)
					return {
						limit: 6,
						page: (lastPage?.pagination.currentPage as number) + 1,
					}
			},
		}
	)

	const usersQuery = useInfiniteQuery(
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
						page: (lastPage?.pagination.currentPage as number) + 1,
					}
			},
		}
	)

	useEffect(() => {
		setInputValue((router.query.q as string) || '')
		setSearchQuery((router.query.q as string) || '')
	}, [router.query.q])

	return (
		<div className='mx-auto w-full lg:w-10/12 xl:w-8/12'>
			<NextSeo
				title={'Tìm kiếm' + (searchQuery ? ` - ${searchQuery}` : '')}
			/>

			<h1 className='text-3xl font-bold mb-6'>Tìm kiếm</h1>

			<Box>
				<form
					onSubmit={e => {
						e.preventDefault()
						router.push('?q=' + inputValue)
					}}
					className='flex items-center'
				>
					<Input
						placeholder='Nhập từ khóa tìm kiếm tại đây'
						autoFocus
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
					/>
				</form>
			</Box>

			{searchQuery && (
				<div className='space-y-16 mt-16'>
					<section>
						<div className='flex items-center justify-between mb-8'>
							<h2 className='text-xl font-semibold'>Bài viết</h2>

							<Select
								value={sort}
								onChange={option => {
									router.push({
										query: {
											q: searchQuery,
											sort: option.type,
										},
									})
								}}
								options={sortOptions}
							/>
						</div>

						{blogsQuery.data &&
							blogsQuery.data.pages[0] &&
							(blogsQuery.data.pages[0].blogs.length > 0 ? (
								<>
									<div className='space-y-6'>
										{blogsQuery.data.pages
											.map(page => page?.blogs as Blog[])
											.flat()
											.map((blog, index) => (
												<BlogCardHorizontal
													key={index}
													data={blog}
												/>
											))}
									</div>

									{blogsQuery.hasNextPage &&
										!blogsQuery.isFetchingNextPage && (
											<div className='flex justify-center mt-6'>
												<Button
													color='lightBlue'
													className='text-blue-500 font-medium'
													onClick={() =>
														blogsQuery.fetchNextPage()
													}
												>
													Xem thêm
												</Button>
											</div>
										)}
								</>
							) : (
								<h3 className='text-lg pl-4'>
									Không tìm thấy bài viết nào cho{' '}
									{`"${searchQuery}"`}.
								</h3>
							))}

						{blogsQuery.isFetching && <Loader.Inline />}
					</section>

					<section>
						<h2 className='text-xl font-semibold mb-8'>Tác giả</h2>
						{usersQuery.data &&
							usersQuery.data.pages[0] &&
							(usersQuery.data.pages[0].users.length > 0 ? (
								<Box>
									<div className='space-y-4'>
										{usersQuery.data.pages[0].users.map(
											(user, index) => (
												<Link
													key={index}
													href={routes.profile(
														user.slug
													)}
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
																{(user.role ===
																	'admin' ||
																	user.isVerified) && (
																	<TickIcon className='h-5 ml-2 text-sky-500' />
																)}
															</h4>

															<span>
																@{user.slug}
															</span>
														</div>
													</div>

													<span className='font-medium'>
														{user.scores}
													</span>
												</Link>
											)
										)}
									</div>

									{usersQuery.hasNextPage &&
										!usersQuery.isFetchingNextPage && (
											<div className='flex justify-center mt-6'>
												<button
													onClick={() =>
														usersQuery.fetchNextPage()
													}
													className='text-blue-500 font-medium'
												>
													Xem thêm
												</button>
											</div>
										)}
								</Box>
							) : (
								<h3 className='text-lg pl-4'>
									Không tìm thấy tác giả nào cho{' '}
									{`"${searchQuery}"`}.
								</h3>
							))}

						{usersQuery.isFetching && <Loader.Inline />}
					</section>
				</div>
			)}
		</div>
	)
}

export default Search
