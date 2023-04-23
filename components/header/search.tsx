import { Transition } from '@headlessui/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useRef, useState } from 'react'
import { searchService } from '~/apiServices'
import queryKeys from '~/config/queryKeys'
import routes from '~/config/routes'
import { useDebounce } from '~/hooks'
import Avatar from '../avatar'
import { CloseIcon, LoaderIcon, SearchIcon, TickIcon } from '../icons'

export default function Search() {
	const [searchQuery, setSearchQuery] = useState('')
	const [isFocus, setIsFocus] = useState(false)

	const debouncedValue = useDebounce(searchQuery)

	const inputRef = useRef<HTMLInputElement>(null)

	const router = useRouter()

	const blogsQuery = useInfiniteQuery(
		queryKeys.searchBlogs(debouncedValue, { limit: 4 }),
		() => searchService.searchBlogs(debouncedValue, { limit: 4 }),
		{
			enabled:
				debouncedValue.trim().length > 1 &&
				router.pathname !== routes.search,
		}
	)

	const usersQuery = useInfiniteQuery(
		queryKeys.searchUsers(debouncedValue, { limit: 4 }),
		() => searchService.searchUsers(debouncedValue, { limit: 4 }),
		{
			enabled:
				debouncedValue.trim().length > 1 &&
				router.pathname !== routes.search,
		}
	)

	useEffect(() => {
		setSearchQuery('')
	}, [router.pathname])

	return (
		<div className='relative'>
			<form
				onSubmit={e => {
					e.preventDefault()
					searchQuery.trim().length > 1 &&
						router.push(routes.search + '?q=' + searchQuery)
				}}
				className='overflow-hidden flex bg-blue-50/50 w-[28em] rounded-2xl focus-within:ring-2 focus-within:ring-blue-500/75 focus-within:ring-offset-1 pr-10 items-center'
			>
				<button className='pl-3.5 pr-2.5 py-2 text-blue-900/75'>
					<SearchIcon className='h-5' />
				</button>

				<input
					className='bg-transparent py-2 input flex-1'
					placeholder='Tìm kiếm bài viết, tác giả'
					spellCheck={false}
					value={searchQuery}
					onChange={e => {
						setSearchQuery(e.target.value)
					}}
					onFocus={() => setIsFocus(true)}
					onBlur={() => setIsFocus(false)}
					ref={inputRef}
				/>

				<div className='flex items-center justify-center absolute right-3 opacity-50'>
					{searchQuery.length > 0 && !blogsQuery.isFetching && (
						<span
							onClick={() => {
								setSearchQuery('')
								inputRef.current?.focus()
							}}
							className='cursor-pointer'
						>
							<CloseIcon className='h-4' />
						</span>
					)}

					{(blogsQuery.isFetching || usersQuery.isFetching) && (
						<LoaderIcon className='h-4 animate-spin' />
					)}
				</div>
			</form>

			<Transition
				show={searchQuery.trim().length > 1 && isFocus}
				as={Fragment}
				enter='duration-150 ease-out'
				enterFrom='top-9 opacity-0'
				enterTo='top-14 opacity-100'
				leave='duration-100 ease-in'
				leaveFrom='top-14 opacity-100'
				leaveTo='top-9 opacity-0'
			>
				<div className='bg-white/[.99] backdrop-blur-3xl px-3 py-4 rounded-2xl w-full shadow-2xl shadow-blue-900/25 absolute left-0 ring-1 space-y-4 transition-all ring-blue-50/50 max-h-[calc(100vh-7rem)]'>
					{!blogsQuery.isFetching &&
						!usersQuery.isFetching &&
						blogsQuery.data?.pages &&
						usersQuery.data?.pages &&
						blogsQuery.data?.pages[0] &&
						usersQuery.data?.pages[0] && (
							<>
								{blogsQuery.data.pages[0].blogs.length > 0 && (
									<div className='space-y-0.5'>
										<h3 className='font-semibold !mb-1 pl-2'>
											Bài viết
										</h3>

										{blogsQuery.data.pages[0].blogs.map(
											(blog, index) => (
												<Link
													className='flex items-center pr-4 pl-2 py-2.5 rounded-2xl transition hover:bg-blue-50/25'
													key={index}
													href={routes.blog(
														blog.slug
													)}
												>
													<Avatar
														noRing
														alt=''
														src={blog.thumb}
													/>
													<h4 className='ml-3 flex-1 line-clamp-1'>
														{blog.title}
													</h4>
												</Link>
											)
										)}
									</div>
								)}

								{usersQuery.data.pages[0]?.users.length > 0 && (
									<div className='space-y-0.5'>
										<h3 className='font-semibold !mb-1 pl-2'>
											Tác giả
										</h3>

										{usersQuery.data.pages[0].users.map(
											(user, index) => (
												<Link
													className='flex items-center pr-4 pl-2 py-2.5 rounded-2xl transition hover:bg-blue-50/25'
													key={index}
													href={routes.profile(
														user.slug
													)}
												>
													<Avatar
														noRing
														alt=''
														src={user.avatar}
													/>
													<h4 className='ml-4 flex items-center font-medium flex-1'>
														<span className='line-clamp-1'>
															{user.fullName}
														</span>
														{(user.role ===
															'admin' ||
															user.isVerified) && (
															<TickIcon className='h-5 ml-2 text-sky-500' />
														)}
													</h4>
												</Link>
											)
										)}
									</div>
								)}

								{(blogsQuery.data.pages[0].blogs.length > 0 ||
									usersQuery.data.pages[0].users.length >
										0) && (
									<div className='flex justify-center'>
										<Link
											href={
												routes.search +
												'?q=' +
												searchQuery
											}
											className='text-blue-500 font-medium'
										>
											Xem tất cả
										</Link>
									</div>
								)}

								{blogsQuery.data?.pages[0].blogs.length === 0 &&
									usersQuery.data?.pages[0].users.length ===
										0 && (
										<h3 className='px-2 opacity-50 flex items-center'>
											<SearchIcon className='h-4 mr-4' />
											Không tìm thấy kết quả cho{' '}
											{`"${
												searchQuery.length > 8
													? searchQuery.slice(0, 8) +
													  '...'
													: searchQuery
											}"`}
										</h3>
									)}
							</>
						)}

					{(blogsQuery.isFetching ||
						usersQuery.isFetching ||
						!blogsQuery.data ||
						!usersQuery.data) && (
						<h3 className='px-2 opacity-50 flex items-center'>
							<LoaderIcon className='h-4 mr-4 animate-spin' />
							Đang tìm kiếm kết quả cho{' '}
							{`"${
								searchQuery.length > 8
									? searchQuery.slice(0, 8) + '...'
									: searchQuery
							}"`}
						</h3>
					)}
				</div>
			</Transition>
		</div>
	)
}
