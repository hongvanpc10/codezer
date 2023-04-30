import request, {
	Params,
	ResData,
	ResDataWithPagination,
} from '~/utils/request'
import { Category } from './categoriesService'
import { User } from './usersService'

export interface BlogData {
	title: string
	categories: any[]
	description: string
	content: string
	thumb: string
}

export interface Blog extends BlogData {
	slug: string
	author: User
	createdAt: string
	updatedAt: string
	categories: Category[]
	likesCount: number
	likes: string[]
	_id: string
	views: number
	isPinned: boolean
}

export const create = async (data: BlogData, accessToken: string) => {
	const res = await request.post<BlogData, ResData<Blog>>('/blogs', data, {
		headers: { Authorization: accessToken },
	})

	return res?.data
}

export const update = async (
	id: string,
	data: BlogData,
	accessToken: string
) => {
	const res = await request.patch<BlogData, ResData<Blog>>(
		'/blogs/' + id,
		data,
		{
			headers: { Authorization: accessToken },
		}
	)

	return res?.data
}

export const deleteBlog = async (id: string, accessToken: string) => {
	const res = await request.delete('/blogs/' + id, {
		headers: { Authorization: accessToken },
	})

	return res
}

export const getBlogs = async (params?: Params) => {
	const res = await request.get<ResDataWithPagination<{ blogs: Blog[] }>>(
		'/blogs',
		{
			params,
		}
	)

	return res?.data
}

export const getDetail = async (slug: string) => {
	const res = await request.get<ResData<Blog>>('/blogs/' + slug)

	return res?.data
}

export const getPinnedBlogs = async (params?: Params) => {
	const res = await request.get<ResData<Blog[]>>('/blogs/pinned', { params })

	return res?.data
}

export const getBlogsByCategory = async (slug: string, params?: Params) => {
	const res = await request.get<
		ResDataWithPagination<{ blogs: Blog[]; category: Category }>
	>('/blogs/category/' + slug, {
		params,
	})

	return res?.data
}

interface BlogsGroupByCategory extends Category {
	blogs: Blog[]
}

export const getBlogsGroupByCategories = async () => {
	const res = await request.get<ResData<BlogsGroupByCategory[]>>(
		'/blogs/categories'
	)

	return res?.data
}

export const getBlogsByUser = async (id: string, params?: Params) => {
	const res = await request.get<ResDataWithPagination<{ blogs: Blog[] }>>(
		'/blogs/user/' + id,
		{
			params,
		}
	)

	return res?.data
}

export const getFollowingsBlogs = async (
	accessToken: string,
	params?: Params
) => {
	const res = await request.get<ResDataWithPagination<{ blogs: Blog[] }>>(
		'/blogs/followings',
		{
			headers: { Authorization: accessToken },
			params,
		}
	)

	return res?.data
}

export const pinBlog = async (id: string, accessToken: string) => {
	const res = await request.get('/blogs/' + id + '/pin', {
		headers: { Authorization: accessToken },
	})

	return res
}

export const unpinBlog = async (id: string, accessToken: string) => {
	const res = await request.get('/blogs/' + id + '/unpin', {
		headers: { Authorization: accessToken },
	})

	return res
}

export const like = async (id: string, accessToken: string) => {
	const res = await request.get('/blogs/' + id + '/like', {
		headers: { Authorization: accessToken },
	})

	return res
}

export const unlike = async (id: string, accessToken: string) => {
	const res = await request.get('/blogs/' + id + '/unlike', {
		headers: { Authorization: accessToken },
	})

	return res
}

export const save = async (id: string, accessToken: string) => {
	const res = await request.get<ResData<Blog>>('/blogs/' + id + '/save', {
		headers: { Authorization: accessToken },
	})

	return res?.data
}

export const unsave = async (id: string, accessToken: string) => {
	const res = await request.get<ResData<string>>('/blogs/' + id + '/unsave', {
		headers: { Authorization: accessToken },
	})

	return res?.data
}

export const getSavedBlogs = async (accessToken: string, params?: Params) => {
	const res = await request.get<ResDataWithPagination<{ blogs: Blog[] }>>(
		'blogs/saved',
		{
			params,
			headers: { Authorization: accessToken },
		}
	)

	return res?.data
}
