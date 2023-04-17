import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { blogsService } from '~/apiServices'
import { Blog } from '~/apiServices/blogsService'
import queryKeys from '~/config/queryKeys'
import routes from '~/config/routes'
import { useAuth } from '~/hooks'
import copyToClipboard from '~/utils/copyToClipboard'
import timeFromNow from '~/utils/timeFromNow'
import Avatar from '../avatar'
import Confirm from '../confirm'
import Dropdown, { Item } from '../dropdown'
import { MoreIcon } from '../icons'
import Loader from '../loader'

export default function Header({ data }: { data: Blog }) {
	const { auth } = useAuth()

	const user = auth?.data
	const accessToken = auth?.accessToken

	const [isDelete, setIsDelete] = useState(false)

	const router = useRouter()

	const queryClient = useQueryClient()

	const { mutate: deleteBlog, isLoading: isDeleting } = useMutation(
		() =>
			blogsService.deleteBlog(data._id as string, accessToken as string),
		{
			onSuccess() {
				router.push(routes.home)
				queryClient.invalidateQueries(queryKeys.newBlogs)
				queryClient.invalidateQueries(queryKeys.blogsGroupByCategories)
				queryClient.invalidateQueries(queryKeys.pinnedBlogs(5))
				queryClient.invalidateQueries(queryKeys.pinnedBlogs())
			},
		}
	)

	const { mutate: pinBlog, isLoading: isPinning } = useMutation(
		() => blogsService.pinBlog(data._id, accessToken as string),
		{
			onSuccess() {
				queryClient.setQueryData<Blog[]>(
					queryKeys.pinnedBlogs(5),
					oldData => oldData && [data, ...oldData]
				)

				queryClient.setQueryData<Blog[]>(
					queryKeys.pinnedBlogs(),
					oldData => oldData && [data, ...oldData]
				)

				queryClient.setQueryData(queryKeys.blog(data.slug), {
					...data,
					isPinned: true,
				})
			},
		}
	)

	const { mutate: unpinBlog, isLoading: isUnpinning } = useMutation(
		() => blogsService.unpinBlog(data._id, accessToken as string),
		{
			onSuccess() {
				queryClient.setQueryData<Blog[]>(
					queryKeys.pinnedBlogs(),
					oldData =>
						oldData && oldData.filter(blog => blog._id !== data._id)
				)

				queryClient.setQueryData<Blog[]>(
					queryKeys.pinnedBlogs(5),
					oldData =>
						oldData && oldData.filter(blog => blog._id !== data._id)
				)

				queryClient.setQueryData(queryKeys.blog(data.slug), {
					...data,
					isPinned: false,
				})
			},
		}
	)

	const MENU_ITEMS: Item[] = [
		{
			label: 'Chỉnh sửa',
			show: user?._id === data.author._id || user?.role === 'admin',
			href: routes.editBlog(data.slug),
		},
		{
			label: 'Xoá',
			show: user?._id === data.author._id || user?.role === 'admin',
			divider: true,
			onClick: () => setIsDelete(true),
		},
		{
			label: data.isPinned ? 'Huỷ ghim bài viết' : 'Ghim bài viết',
			show: user?.role === 'admin',
			divider: true,
			onClick: () => (data.isPinned ? unpinBlog() : pinBlog()),
		},
		{
			label: 'Lưu bài viết',
			divider: true,
		},
		{
			label: 'Sao chép liên kết',
			onClick: () => {
				copyToClipboard(window.location.href)
			},
		},
	]

	return (
		<>
			{isDelete && (
				<Confirm
					message='Bạn có chắc chắn muốn xoá bài viết này?'
					subMessage='Nếu bạn xoá nó, bạn không thể khôi phục lại.'
					onClose={() => setIsDelete(false)}
					onConfirm={() => deleteBlog()}
				/>
			)}

			{(isDeleting || isPinning || isUnpinning) && <Loader />}

			<div className='flex items-center justify-between mb-12'>
				<div className='flex items-center'>
					<Link
						href={routes.profile(data.author.slug)}
						className='flex'
					>
						<Avatar
							src={data.author.avatar}
							alt=''
							isAdmin={data.author.role === 'admin'}
							isVerified={
								data.author.isVerified ||
								data.author.role === 'admin'
							}
							size={11}
						/>
					</Link>

					<div className='ml-5'>
						<div className='flex items-center'>
							<Link
								href={routes.profile(data.author.slug)}
								className='flex'
							>
								<h2 className='text-lg font-semibold leading-6'>
									{data.author.fullName}
								</h2>
							</Link>
						</div>

						<span className='mt-1 inline-block'>
							<span className='inline-block mr-1'>
								{timeFromNow(data.createdAt)}
							</span>

							{!moment(data.createdAt).isSame(data.updatedAt) && (
								<span className='md:inline hidden'>
									(đã sửa {timeFromNow(data.updatedAt)})
								</span>
							)}
						</span>
					</div>
				</div>

				<Dropdown items={MENU_ITEMS}>
					<button>
						<MoreIcon className='h-6' />
					</button>
				</Dropdown>
			</div>
		</>
	)
}
