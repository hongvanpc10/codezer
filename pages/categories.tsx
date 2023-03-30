import { useQuery } from '@tanstack/react-query'
import { NextSeo } from 'next-seo'
import { categoriesService } from '~/apiServices'
import Button from '~/components/button'
import { CreateForm, UpdateForm } from '~/components/categories'
import { AddIcon } from '~/components/icons'
import Modal from '~/components/modal'
import queryKeys from '~/config/queryKeys'
import { NoFooterLayout } from '~/layouts'
import { NextPageWithLayout } from './_app'

const Categories: NextPageWithLayout = () => {
	const { data } = useQuery(queryKeys.categories, () =>
		categoriesService.get()
	)

	return (
		<div>
			<div className='flex items-center justify-between mb-10'>
				<NextSeo title='Quản lí danh mục' />

				<h1 className='text-2xl font-extrabold drop-shadow'>
					Danh mục
				</h1>

				<Modal
					defaultOpen={false}
					render={setIsOpen => <CreateForm setIsOpen={setIsOpen} />}
					scale={false}
				>
					{setIsOpen => (
						<Button icon={AddIcon} onClick={() => setIsOpen(true)}>
							Mới
						</Button>
					)}
				</Modal>
			</div>

			{data && (
				<ul className='flex flex-wrap'>
					{data.map((category, index) => (
						<li
							key={index}
							className='sm:w-auto w-full mb-3 sm:mr-3'
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
								{setIsOpen => (
									<div
										onClick={() => setIsOpen(true)}
										className='md:py-6 py-7 flex items-center justify-center px-10 transition hover:bg-blue-200 cursor-pointer font-medium bg-blue-100 shadow shadow-blue-900/5 rounded-3xl'
									>
										{category.name}
									</div>
								)}
							</Modal>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

Categories.Layout = NoFooterLayout
Categories.isAdminRequired = true

export default Categories
