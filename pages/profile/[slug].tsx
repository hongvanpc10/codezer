import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { usersService } from '~/apiServices'
import { User } from '~/apiServices/usersService'
import images from '~/assets/images'
import Avatar from '~/components/avatar'
import Button from '~/components/button'
import Dropdown from '~/components/dropdown'
import { AddIcon, MoreIcon, TickIcon } from '~/components/icons'
import Image from '~/components/image'
import { Activities, Blogs, Introduction } from '~/components/profile'
import ScrollToTopButton from '~/components/scrollToTopButton'
import queryKeys from '~/config/queryKeys'
import routes from '~/config/routes'
import { useAuth, useResponsive } from '~/hooks'
import copyToClipboard from '~/utils/copyToClipboard'

export const getStaticPaths: GetStaticPaths = async () => {
	const data = await usersService.getUsers({
		sort: 'views',
		limit: 20,
	})

	return {
		paths: data?.map(user => ({ params: { slug: user.slug } })) || [],
		fallback: true,
	}
}

export const getStaticProps: GetStaticProps<{ data: User }> = async context => {
	try {
		const user = await usersService.getProfile(
			context.params?.slug as string
		)

		if (!user) return { notFound: true }

		return {
			props: {
				data: user,
			},
			revalidate: 60,
		}
	} catch (error) {
		return { notFound: true }
	}
}

const Profile = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
	const { auth, isLogin } = useAuth()

	const user = auth?.data
	const accessToken = auth?.accessToken

	const router = useRouter()

	const slug = router.query.slug as string

	const queryClient = useQueryClient()

	const { data } = useQuery(
		queryKeys.user(slug),
		() => usersService.getProfile(slug),
		{ enabled: !!slug, placeholderData: props.data }
	)

	const { match } = useResponsive()

	const { mutate: follow } = useMutation(
		(id: string) => usersService.follow(id, accessToken as string),
		{
			onMutate() {
				queryClient.setQueryData<User>(
					queryKeys.user(slug),
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
			},
		}
	)

	const { mutate: unfollow } = useMutation(
		(id: string) => usersService.unfollow(id, accessToken as string),
		{
			onMutate() {
				queryClient.setQueryData<User>(
					queryKeys.user(slug),
					oldData =>
						oldData && {
							...oldData,
							followers: oldData.followers.filter(
								id => id !== user?._id
							),
						}
				)

				data &&
					queryClient.setQueryData<User>(
						queryKeys.user(user?.slug as string),
						oldData =>
							oldData && {
								...oldData,
								followings: oldData.followings.filter(
									id => id !== data._id
								),
							}
					)
			},
		}
	)

	const { mutate: verify } = useMutation(
		(id: string) => usersService.verify(id, accessToken as string),
		{
			onSuccess() {
				queryClient.setQueryData<User>(
					queryKeys.user(slug),
					oldData => oldData && { ...oldData, isVerified: true }
				)
			},
		}
	)

	return data ? (
		<div className='-mt-20 mx-auto lg:w-11/12'>
			<NextSeo title={data.fullName} />

			<ScrollToTopButton />

			<section className='relative z-10'>
				<Image
					alt=''
					src={images.cover}
					width='100%'
					ratio={[16, match('lg') ? 5 : match('md') ? 7 : 11]}
					rounded='3xl'
				/>

				<div className='absolute top-full lg:-translate-y-[60%] -translate-y-[40%] lg:flex-row flex-col items-stretch flex lg:items-end inset-x-0 lg:pl-12'>
					<Avatar
						alt=''
						src={data.avatar}
						size={
							match('xl')
								? 44
								: match('lg')
								? 40
								: match('sm')
								? 44
								: '40vw'
						}
						ringWidth={4}
						sizes={[75, 20, 15]}
						isAdmin={data.role === 'admin'}
					/>

					<div className='flex-1 lg:ml-3 flex lg:flex-row flex-col items-stretch lg:items-start lg:justify-between mt-2.5 lg:mt-0'>
						<div className='lg:block flex items-center flex-col'>
							<h1 className='text-2xl drop-shadow font-bold flex items-center'>
								{data.fullName}
								{(data.role === 'admin' || data.isVerified) && (
									<TickIcon className='h-6 text-sky-500 ml-2 -mr-8' />
								)}
							</h1>

							{match('lg') && (
								<div className='space-x-2 font-medium flex items-center mt-1 lg:mt-0'>
									<span>
										{data.followers.length} theo dõi
									</span>
									<div className='w-1.5 h-1.5 rounded-full bg-blue-500' />
									<span>
										{data.followings.length} đang theo dõi
									</span>
								</div>
							)}
						</div>

						<div className='flex items-center space-x-3 mt-5 lg:mt-0'>
							{user?._id === data._id ? (
								<Button
									full={match(['lg'])}
									large={match(['lg'])}
									href={routes.createBlog}
									icon={match(['lg']) ? AddIcon : undefined}
								>
									{match('lg')
										? 'Bài viết mới'
										: 'Thêm bài viết mới'}
								</Button>
							) : (
								<Button
									full={match(['lg'])}
									large={match(['lg'])}
									color='blue'
									onClick={() => {
										if (!isLogin)
											return router.push(routes.login)

										data.followers.includes(
											user?._id as string
										)
											? unfollow(data._id)
											: follow(data._id)
									}}
								>
									{data.followers.includes(
										user?._id as string
									)
										? 'Đang theo dõi'
										: 'Theo dõi'}
								</Button>
							)}

							<Dropdown
								items={[
									{
										label: 'Xác thực',
										divider: true,
										show:
											user?.role === 'admin' &&
											data._id !== user._id &&
											!data.isVerified,
										onClick: () => {
											verify(data._id)
										},
									},
									{
										label: 'Cài đặt',
										divider: true,
										show: user?._id === data._id,
										href: routes.settings,
									},
									{
										label: 'Sao chép liên kết',
										onClick: () =>
											copyToClipboard(
												window.location.href
											),
									},
								]}
							>
								<Button color='slate' large={match(['lg'])}>
									<MoreIcon className='h-6 -mx-6 md:-mx-1' />
								</Button>
							</Dropdown>
						</div>
					</div>
				</div>
			</section>

			<div className='row lg:mt-28 mt-48'>
				<div className='xl:col-4 col-12 space-y-6'>
					<section className='row'>
						<div className='xl:col-12 col-12 lg:col-6'>
							<Introduction data={data} />
						</div>

						<div className='xl:col-12 col-12 lg:col-6'>
							<Activities data={data} />
						</div>
					</section>
				</div>

				<div className='xl:col-8 col-12'>
					<Blogs id={data._id} />
				</div>
			</div>
		</div>
	) : null
}

export default Profile
