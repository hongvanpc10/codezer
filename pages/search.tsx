import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Box from '~/components/box'
import { Input } from '~/components/form'
import { Blogs, Posts, Users } from '~/components/search'

const Search = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [inputValue, setInputValue] = useState('')

	const router = useRouter()

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
					<Blogs searchQuery={searchQuery} />
					<Users searchQuery={searchQuery} />
					<Posts searchQuery={searchQuery} />
				</div>
			)}
		</div>
	)
}

export default Search
