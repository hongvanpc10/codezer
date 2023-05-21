import { useQuery } from '@tanstack/react-query'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { categoriesService } from '~/apiServices'
import Button from '~/components/button'
import { CreateForm, UpdateForm } from '~/components/categories'
import { AddIcon } from '~/components/icons'
import Modal from '~/components/modal'
import queryKeys from '~/config/queryKeys'
import routes from '~/config/routes'
import { useAuth } from '~/hooks'
import randomInteger from '~/utils/randInt'
import { NextPageWithLayout } from './_app'

const colors: { text: string; bg: string }[] = [
	{
		text: 'text-blue-500',
		bg: 'bg-blue-500',
	},
	{
		text: 'text-amber-500',
		bg: 'bg-amber-500',
	},
	{
		text: 'text-green-500',
		bg: 'bg-green-500',
	},
	{
		text: 'text-sky-500',
		bg: 'bg-sky-500',
	},
	{
		text: 'text-red-500',
		bg: 'bg-red-500',
	},
	{
		text: 'text-amber-500',
		bg: 'bg-amber-500',
	},
	{
		text: 'text-yellow-500',
		bg: 'bg-yellow-500',
	},
	{
		text: 'text-lime-500',
		bg: 'bg-lime-500',
	},
	{
		text: 'text-teal-500',
		bg: 'bg-teal-500',
	},
	{
		text: 'text-indigo-500',
		bg: 'bg-indigo-500',
	},
	{
		text: 'text-pink-500',
		bg: 'bg-pink-500',
	},
	{
		text: 'text-purple-500',
		bg: 'bg-purple-500',
	},
	{
		text: 'text-rose-500',
		bg: 'bg-rose-500',
	},
	{
		text: 'text-cyan-500',
		bg: 'bg-cyan-500',
	},
	{
		text: 'text-orange-500',
		bg: 'bg-orange-500',
	},
	{
		text: 'text-slate-500',
		bg: 'bg-slate-500',
	},
	{
		text: 'text-violet-500',
		bg: 'bg-violet-500',
	},
	{
		text: 'text-emerald-500',
		bg: 'bg-emerald-500',
	},
]

const Categories = () => {
	const { data } = useQuery(queryKeys.categories, () =>
		categoriesService.get()
	)

	const { auth } = useAuth()
	const user = auth?.data

	return (
		<div>
			<div className='flex items-center justify-between mb-10'>
				<NextSeo title='Quản lí danh mục' />

				<h1 className='text-2xl font-extrabold drop-shadow'>
					Danh mục
				</h1>

				{user?.role === 'admin' && (
					<Modal
						defaultOpen={false}
						render={setIsOpen => (
							<CreateForm setIsOpen={setIsOpen} />
						)}
						scale={false}
					>
						{setIsOpen => (
							<Button
								icon={AddIcon}
								onClick={() => setIsOpen(true)}
							>
								Mới
							</Button>
						)}
					</Modal>
				)}
			</div>

			{data && (
				<ul className='row gutter-md'>
					{data.map((category, index) => (
						<li
							key={index}
							className='xl:col-3 col-12 sm:col-6 md:col-4'
						>
							<Modal
								defaultOpen={false}
								render={setIsOpen => (
									<UpdateForm
										item={category}
										setIsOpen={setIsOpen}
									/>
								)}
								scale={false}
							>
								{setIsOpen => {
									const color =
										colors[
											randomInteger(0, colors.length - 1)
										]

									const Comp =
										user?.role === 'admin' ? 'div' : Link

									return (
										<Comp
											onClick={() =>
												user?.role === 'admin' &&
												setIsOpen(true)
											}
											className='rounded-t-lg block rounded-b-2xl bg-slate-100 transition hover:bg-slate-200/60 cursor-pointer overflow-hidden'
											href={routes.blogsByCategory(
												category.slug
											)}
										>
											<div
												className={`h-2.5 ${color.bg}`}
											></div>
											<div className='sm:px-3 px-4 pt-4 pb-6'>
												<h3 className='font-medium text-lg mb-2'>
													<span
														className={`${color.text}`}
													>
														#
													</span>
													{category.name}
												</h3>

												<p className='opacity-75 line-clamp-3 text-base h-[4.5rem]'>
													{category.description ||
														'Tổng hợp bài viết về ' +
															category.name}
												</p>
											</div>
										</Comp>
									)
								}}
							</Modal>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default Categories
