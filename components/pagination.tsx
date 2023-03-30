import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { ArrowLeftIcon, ArrowRightIcon } from './icons'

interface Props {
	totalPages: number
	setPage: Dispatch<SetStateAction<number>>
	page: number
}

export default function Pagination({ totalPages, setPage, page }: Props) {
	const router = useRouter()

	const queryPage = Number(router.query.page || 1)

	useEffect(() => {
		setPage(queryPage)
	}, [queryPage, setPage])

	useEffect(() => {
		if (queryPage < 1) router.push({ query: { ...router.query, page: 1 } })
		else if (queryPage > totalPages)
			router.push({ query: { ...router.query, page: totalPages } })
	}, [queryPage, router, totalPages])

	return totalPages && totalPages > 1 ? (
		<div className='flex justify-center !mt-12'>
			<ReactPaginate
				pageCount={totalPages}
				forcePage={page - 1}
				containerClassName='flex items-center'
				pageLinkClassName='flex font-medium items-center justify-center w-9 h-9 hover:bg-blue-50 rounded-xl transition'
				pageClassName='px-1'
				previousClassName='px-1'
				nextClassName='px-1'
				activeLinkClassName='!bg-blue-500 text-white'
				previousLabel={<ArrowLeftIcon className='h-5' />}
				nextLabel={<ArrowRightIcon className='h-5' />}
				previousLinkClassName='flex items-center justify-center w-9 h-9 hover:bg-blue-50 rounded-xl transition'
				nextLinkClassName='flex items-center justify-center w-9 h-9 hover:bg-blue-50 rounded-xl transition'
				onPageChange={selectedItem => {
					router.push({
						query: {
							...router.query,
							page: selectedItem.selected + 1,
						},
					})
				}}
			/>
		</div>
	) : null
}
