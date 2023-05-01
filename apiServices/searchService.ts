import request, { Params, ResDataWithPagination } from '~/utils/request'
import { Blog } from './blogsService'
import { User } from './usersService'
import { Post } from './postsServices'

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

export const searchPosts = async (query: string, params?: Params) => {
	const res = await request.get<ResDataWithPagination<{ posts: Post[] }>>(
		'/search/posts',
		{ params: { q: query, ...params } }
	)

	return res?.data
}
