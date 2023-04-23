import request, { Params, ResDataWithPagination } from '~/utils/request'
import { Blog } from './blogsService'
import { User } from './usersService'

export const searchBlogs = async (query: string, params?: Params) => {
	const res = await request.get<ResDataWithPagination<{ blogs: Blog[] }>>(
		'/search/blogs',
		{ params: { q: query, ...params } }
	)

	return res?.data
}

export const searchUsers = async (query: string, params?: Params) => {
	const res = await request.get<ResDataWithPagination<{ users: User[] }>>(
		'/search/users',
		{ params: { q: query, ...params } }
	)

	return res?.data
}
