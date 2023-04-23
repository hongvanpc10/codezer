import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { Option } from '~/components/select/select'

export default function useSort() {
	const sortOptions: Option<{
		sort?: string
		order?: 1 | -1
	}>[] = useMemo(
		() => [
			{
				type: 'newest',
				label: 'Mới nhất',
				value: {},
			},
			{
				type: 'oldest',
				label: 'Cũ nhất',
				value: {
					order: 1,
				},
			},
			{
				type: 'popular',
				label: 'Phổ biến',
				value: {
					sort: 'views',
				},
			},
		],
		[]
	)

	const [sort, setSort] = useState(sortOptions[0])

	const router = useRouter()

	useEffect(() => {
		const query = router.query.sort

		const sortOption = sortOptions.find(option => option.type === query)

		if (sortOption) {
			setSort(sortOption)
		} else {
			setSort(sortOptions[0])
		}
	}, [router.query, sortOptions])

	return { sortOptions, sort }
}
